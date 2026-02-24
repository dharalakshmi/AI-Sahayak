import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { pool } from "../config/database"
import { logger } from "../utils/logger"

interface JWTPayload {
  userId: string
  phone: string
  iat: number
  exp: number
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string
        phone: string
      }
    }
  }
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
      return res.status(401).json({ error: "Access token required" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "ai-shayak-secret") as JWTPayload

    // Verify user still exists
    const userResult = await pool.query("SELECT id, phone FROM users WHERE id = $1", [decoded.userId])

    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: "User not found" })
    }

    req.user = {
      userId: decoded.userId,
      phone: decoded.phone,
    }

    next()
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Invalid token" })
    }
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: "Token expired" })
    }

    logger.error("Authentication error:", error)
    res.status(500).json({ error: "Authentication failed" })
  }
}

export const optionalAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(" ")[1]

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "ai-shayak-secret") as JWTPayload
      req.user = {
        userId: decoded.userId,
        phone: decoded.phone,
      }
    }

    next()
  } catch (error) {
    // Continue without authentication for optional auth
    next()
  }
}
