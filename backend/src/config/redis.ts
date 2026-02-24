import { createClient } from "redis"
import { logger } from "../utils/logger"

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
  retry_strategy: (options) => {
    if (options.error && options.error.code === "ECONNREFUSED") {
      logger.error("Redis server connection refused")
      return new Error("Redis server connection refused")
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      logger.error("Redis retry time exhausted")
      return new Error("Retry time exhausted")
    }
    if (options.attempt > 10) {
      logger.error("Redis max retry attempts reached")
      return undefined
    }
    return Math.min(options.attempt * 100, 3000)
  },
})

redisClient.on("connect", () => {
  logger.info("🔴 Connected to Redis server")
})

redisClient.on("error", (err) => {
  logger.error("❌ Redis connection error:", err)
})

redisClient.on("ready", () => {
  logger.info("✅ Redis client ready")
})

redisClient.on("end", () => {
  logger.info("🔴 Redis connection ended")
})

// Connect to Redis
redisClient.connect().catch((err) => {
  logger.error("❌ Failed to connect to Redis:", err)
})

export { redisClient }

// Redis utility functions
export const setCache = async (key: string, value: any, expireInSeconds?: number) => {
  try {
    const serializedValue = JSON.stringify(value)
    if (expireInSeconds) {
      await redisClient.setEx(key, expireInSeconds, serializedValue)
    } else {
      await redisClient.set(key, serializedValue)
    }
  } catch (error) {
    logger.error("Redis set error:", error)
  }
}

export const getCache = async (key: string) => {
  try {
    const value = await redisClient.get(key)
    return value ? JSON.parse(value) : null
  } catch (error) {
    logger.error("Redis get error:", error)
    return null
  }
}

export const deleteCache = async (key: string) => {
  try {
    await redisClient.del(key)
  } catch (error) {
    logger.error("Redis delete error:", error)
  }
}
