import type { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { pool } from "../config/database"
import { sendOTP } from "../services/twilioService"
import { logger } from "../utils/logger"
import { setCache, getCache, deleteCache } from "../config/redis"

export class AuthController {
  async sendOTP(req: Request, res: Response) {
    try {
      const { phone } = req.body

      if (!phone) {
        return res.status(400).json({ error: "Phone number is required" })
      }

      // Generate 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString()

      // Store OTP in database with 5-minute expiry
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000)

      await pool.query("INSERT INTO otp_verifications (phone, otp, expires_at) VALUES ($1, $2, $3)", [
        phone,
        otp,
        expiresAt,
      ])

      // Send OTP via WhatsApp/SMS
      await sendOTP(phone, otp)

      // Cache OTP for quick verification
      await setCache(`otp:${phone}`, { otp, expiresAt: expiresAt.getTime() }, 300)

      logger.info(`OTP sent to ${phone}`)

      res.status(200).json({
        message: "OTP sent successfully",
        expiresIn: 300, // 5 minutes
      })
    } catch (error) {
      logger.error("Send OTP error:", error)
      res.status(500).json({ error: "Failed to send OTP" })
    }
  }

  async verifyOTP(req: Request, res: Response) {
    try {
      const { phone, otp } = req.body

      if (!phone || !otp) {
        return res.status(400).json({ error: "Phone and OTP are required" })
      }

      // Check cached OTP first
      const cachedOTP = await getCache(`otp:${phone}`)

      let isValidOTP = false

      if (cachedOTP && cachedOTP.otp === otp && Date.now() < cachedOTP.expiresAt) {
        isValidOTP = true
      } else {
        // Check database
        const otpResult = await pool.query(
          "SELECT * FROM otp_verifications WHERE phone = $1 AND otp = $2 AND expires_at > NOW() AND verified = false ORDER BY created_at DESC LIMIT 1",
          [phone, otp],
        )

        if (otpResult.rows.length > 0) {
          isValidOTP = true
          // Mark OTP as verified
          await pool.query("UPDATE otp_verifications SET verified = true WHERE id = $1", [otpResult.rows[0].id])
        }
      }

      if (!isValidOTP) {
        return res.status(400).json({ error: "Invalid or expired OTP" })
      }

      // Check if user exists
      const userResult = await pool.query("SELECT * FROM users WHERE phone = $1", [phone])

      let user = userResult.rows[0]

      if (!user) {
        // Create new user
        const newUserResult = await pool.query("INSERT INTO users (phone) VALUES ($1) RETURNING *", [phone])
        user = newUserResult.rows[0]
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user.id, phone: user.phone }, process.env.JWT_SECRET || "ai-shayak-secret", {
        expiresIn: "30d",
      })

      // Clean up OTP cache
      await deleteCache(`otp:${phone}`)

      logger.info(`User authenticated: ${phone}`)

      res.status(200).json({
        message: "OTP verified successfully",
        token,
        user: {
          id: user.id,
          name: user.name,
          phone: user.phone,
          businessName: user.business_name,
          businessType: user.business_type,
          state: user.state,
          language: user.language,
          subscription: user.subscription,
          onboardingComplete: user.onboarding_complete,
        },
      })
    } catch (error) {
      logger.error("Verify OTP error:", error)
      res.status(500).json({ error: "Failed to verify OTP" })
    }
  }

  async register(req: Request, res: Response) {
    try {
      const { name, businessName, businessType, state, language } = req.body
      const userId = req.user?.userId

      if (!userId) {
        return res.status(401).json({ error: "Unauthorized" })
      }

      // Update user profile
      const result = await pool.query(
        `UPDATE users SET 
         name = $1, 
         business_name = $2, 
         business_type = $3, 
         state = $4, 
         language = $5, 
         onboarding_complete = true,
         updated_at = CURRENT_TIMESTAMP
         WHERE id = $6 
         RETURNING *`,
        [name, businessName, businessType, state, language, userId],
      )

      const user = result.rows[0]

      logger.info(`User profile completed: ${user.phone}`)

      res.status(200).json({
        message: "Profile updated successfully",
        user: {
          id: user.id,
          name: user.name,
          phone: user.phone,
          businessName: user.business_name,
          businessType: user.business_type,
          state: user.state,
          language: user.language,
          subscription: user.subscription,
          onboardingComplete: user.onboarding_complete,
        },
      })
    } catch (error) {
      logger.error("Register error:", error)
      res.status(500).json({ error: "Failed to update profile" })
    }
  }

  async getProfile(req: Request, res: Response) {
    try {
      const userId = req.user?.userId

      const result = await pool.query("SELECT * FROM users WHERE id = $1", [userId])
      const user = result.rows[0]

      if (!user) {
        return res.status(404).json({ error: "User not found" })
      }

      res.status(200).json({
        id: user.id,
        name: user.name,
        phone: user.phone,
        businessName: user.business_name,
        businessType: user.business_type,
        state: user.state,
        language: user.language,
        subscription: user.subscription,
        onboardingComplete: user.onboarding_complete,
        createdAt: user.created_at,
      })
    } catch (error) {
      logger.error("Get profile error:", error)
      res.status(500).json({ error: "Failed to get profile" })
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      const userId = req.user?.userId
      const updates = req.body

      // Build dynamic update query
      const allowedFields = ["name", "business_name", "business_type", "state", "language"]
      const updateFields = []
      const values = []
      let paramCount = 1

      for (const [key, value] of Object.entries(updates)) {
        if (allowedFields.includes(key) && value !== undefined) {
          updateFields.push(`${key} = $${paramCount}`)
          values.push(value)
          paramCount++
        }
      }

      if (updateFields.length === 0) {
        return res.status(400).json({ error: "No valid fields to update" })
      }

      values.push(userId)
      const query = `
        UPDATE users SET 
        ${updateFields.join(", ")}, 
        updated_at = CURRENT_TIMESTAMP 
        WHERE id = $${paramCount} 
        RETURNING *
      `

      const result = await pool.query(query, values)
      const user = result.rows[0]

      res.status(200).json({
        message: "Profile updated successfully",
        user: {
          id: user.id,
          name: user.name,
          phone: user.phone,
          businessName: user.business_name,
          businessType: user.business_type,
          state: user.state,
          language: user.language,
          subscription: user.subscription,
          onboardingComplete: user.onboarding_complete,
        },
      })
    } catch (error) {
      logger.error("Update profile error:", error)
      res.status(500).json({ error: "Failed to update profile" })
    }
  }

  async logout(req: Request, res: Response) {
    try {
      // In a more complex setup, you might want to blacklist the token
      // For now, we'll just send a success response
      res.status(200).json({ message: "Logged out successfully" })
    } catch (error) {
      logger.error("Logout error:", error)
      res.status(500).json({ error: "Failed to logout" })
    }
  }
}
