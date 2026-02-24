import twilio from "twilio"
import { logger } from "../utils/logger"

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const whatsappNumber = process.env.TWILIO_WHATSAPP_NUMBER || "whatsapp:+14155238886"

const client = twilio(accountSid, authToken)

export const sendOTP = async (phone: string, otp: string): Promise<void> => {
  try {
    const message = `🔐 AI Shayak OTP: ${otp}\n\nYour verification code for AI Shayak compliance assistant. Valid for 5 minutes.\n\n- AI Shayak Team`

    // Format phone number for WhatsApp
    const formattedPhone = phone.startsWith("+") ? `whatsapp:${phone}` : `whatsapp:+91${phone}`

    await client.messages.create({
      from: whatsappNumber,
      to: formattedPhone,
      body: message,
    })

    logger.info(`OTP sent via WhatsApp to ${phone}`)
  } catch (error) {
    logger.error("Twilio send OTP error:", error)

    // Fallback to SMS if WhatsApp fails
    try {
      const smsNumber = process.env.TWILIO_SMS_NUMBER
      if (smsNumber) {
        await client.messages.create({
          from: smsNumber,
          to: phone.startsWith("+") ? phone : `+91${phone}`,
          body: `AI Shayak OTP: ${otp}. Valid for 5 minutes.`,
        })
        logger.info(`OTP sent via SMS to ${phone} (WhatsApp fallback)`)
      }
    } catch (smsError) {
      logger.error("SMS fallback failed:", smsError)
      throw new Error("Failed to send OTP via WhatsApp and SMS")
    }
  }
}

export const sendWhatsAppAlert = async (phone: string, alert: any): Promise<void> => {
  try {
    const message = `🚨 *COMPLIANCE ALERT*\n\n*${alert.title}*\n${alert.description}\n\n📅 Due: ${new Date(alert.dueDate).toLocaleDateString("en-IN")}\n💰 Penalty: ${alert.penalty}\n\nReply with:\n• "HELP" for assistance\n• "DONE" to mark complete\n• "SNOOZE" to remind later\n\n- AI Shayak`

    const formattedPhone = phone.startsWith("+") ? `whatsapp:${phone}` : `whatsapp:+91${phone}`

    await client.messages.create({
      from: whatsappNumber,
      to: formattedPhone,
      body: message,
    })

    logger.info(`WhatsApp alert sent to ${phone}`)
  } catch (error) {
    logger.error("WhatsApp alert send error:", error)
    throw error
  }
}

export const sendWhatsAppMessage = async (phone: string, message: string): Promise<void> => {
  try {
    const formattedPhone = phone.startsWith("+") ? `whatsapp:${phone}` : `whatsapp:+91${phone}`

    await client.messages.create({
      from: whatsappNumber,
      to: formattedPhone,
      body: message,
    })

    logger.info(`WhatsApp message sent to ${phone}`)
  } catch (error) {
    logger.error("WhatsApp message send error:", error)
    throw error
  }
}
