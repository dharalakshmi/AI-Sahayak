import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import dotenv from "dotenv"
import { errorHandler } from "./middleware/errorHandler"
import { rateLimiter } from "./middleware/rateLimiter"
import { logger } from "./utils/logger"

// Import routes
import authRoutes from "./routes/authRoutes"
import alertRoutes from "./routes/alertRoutes"
import whatsappRoutes from "./routes/whatsappRoutes"
import documentRoutes from "./routes/documentRoutes"
import userRoutes from "./routes/userRoutes"

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000

// Middleware
app.use(helmet())
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
)
app.use(morgan("combined", { stream: { write: (message) => logger.info(message.trim()) } }))
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))
app.use(rateLimiter)

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
  })
})

// API routes
app.use("/api/auth", authRoutes)
app.use("/api/alerts", alertRoutes)
app.use("/api/whatsapp", whatsappRoutes)
app.use("/api/documents", documentRoutes)
app.use("/api/users", userRoutes)

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    message: `The requested route ${req.originalUrl} does not exist`,
  })
})

// Global error handler
app.use(errorHandler)

// Start server
app.listen(PORT, () => {
  logger.info(`🚀 AI Shayak Backend Server running on port ${PORT}`)
  logger.info(`📱 Environment: ${process.env.NODE_ENV || "development"}`)
  logger.info(`🔗 Frontend URL: ${process.env.FRONTEND_URL || "http://localhost:3000"}`)
})

// Graceful shutdown
process.on("SIGTERM", () => {
  logger.info("SIGTERM received, shutting down gracefully")
  process.exit(0)
})

process.on("SIGINT", () => {
  logger.info("SIGINT received, shutting down gracefully")
  process.exit(0)
})

export default app
