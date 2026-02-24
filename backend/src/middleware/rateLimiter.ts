import type { Request, Response, NextFunction } from "express"
import { redisClient } from "../config/redis"
import { logger } from "../utils/logger"

interface RateLimitOptions {
  windowMs: number
  maxRequests: number
  message?: string
}

const defaultOptions: RateLimitOptions = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
}

export const createRateLimiter = (options: Partial<RateLimitOptions> = {}) => {
  const opts = { ...defaultOptions, ...options }

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const key = `rate_limit:${req.ip}`
      const current = await redisClient.get(key)

      if (current === null) {
        await redisClient.setEx(key, Math.ceil(opts.windowMs / 1000), "1")
        return next()
      }

      const currentCount = Number.parseInt(current, 10)

      if (currentCount >= opts.maxRequests) {
        logger.warn(`Rate limit exceeded for IP: ${req.ip}`)
        return res.status(429).json({
          error: "Too Many Requests",
          message: opts.message,
          retryAfter: Math.ceil(opts.windowMs / 1000),
        })
      }

      await redisClient.incr(key)
      next()
    } catch (error) {
      logger.error("Rate limiter error:", error)
      // Continue without rate limiting if Redis is down
      next()
    }
  }
}

// Default rate limiter
export const rateLimiter = createRateLimiter()

// Stricter rate limiter for auth endpoints
export const authRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5, // limit each IP to 5 auth requests per 15 minutes
  message: "Too many authentication attempts, please try again later.",
})

// OTP rate limiter
export const otpRateLimiter = createRateLimiter({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 1, // limit each IP to 1 OTP request per minute
  message: "Please wait before requesting another OTP.",
})
