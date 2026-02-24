import { Router } from "express"
import { AuthController } from "../controllers/authController"
import { authenticateToken } from "../middleware/auth"
import { authRateLimiter, otpRateLimiter } from "../middleware/rateLimiter"
import { validateRequest } from "../middleware/validation"
import Joi from "joi"

const router = Router()
const authController = new AuthController()

// Validation schemas
const sendOTPSchema = Joi.object({
  phone: Joi.string()
    .pattern(/^(\+91|91)?[6-9]\d{9}$/)
    .required(),
})

const verifyOTPSchema = Joi.object({
  phone: Joi.string()
    .pattern(/^(\+91|91)?[6-9]\d{9}$/)
    .required(),
  otp: Joi.string().length(6).pattern(/^\d+$/).required(),
})

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  businessName: Joi.string().min(2).max(200).required(),
  businessType: Joi.string().min(2).max(100).required(),
  state: Joi.string().min(2).max(100).required(),
  language: Joi.string().valid("hindi", "english", "telugu", "tamil", "kannada").required(),
})

// Routes
router.post("/send-otp", otpRateLimiter, validateRequest(sendOTPSchema), authController.sendOTP.bind(authController))

router.post(
  "/verify-otp",
  authRateLimiter,
  validateRequest(verifyOTPSchema),
  authController.verifyOTP.bind(authController),
)

router.post(
  "/register",
  authenticateToken,
  validateRequest(registerSchema),
  authController.register.bind(authController),
)

router.get("/profile", authenticateToken, authController.getProfile.bind(authController))

router.put("/profile", authenticateToken, authController.updateProfile.bind(authController))

router.post("/logout", authenticateToken, authController.logout.bind(authController))

export default router
