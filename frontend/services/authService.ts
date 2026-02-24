import api from "@/lib/api"

export interface LoginRequest {
  phone: string
  otp?: string
}

export interface RegisterRequest {
  name: string
  phone: string
  businessName: string
  businessType: string
  state: string
  language: string
}

export interface User {
  id: string
  name: string
  phone: string
  businessName: string
  businessType: string
  state: string
  language: string
  onboardingComplete: boolean
  subscription: "free" | "basic" | "premium"
  createdAt: string
}

export interface AuthResponse {
  user: User
  token: string
  message: string
}

class AuthService {
  async sendOTP(phone: string): Promise<{ message: string }> {
    const response = await api.post("/auth/send-otp", { phone })
    return response.data
  }

  async verifyOTP(phone: string, otp: string): Promise<AuthResponse> {
    const response = await api.post("/auth/verify-otp", { phone, otp })
    return response.data
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post("/auth/register", userData)
    return response.data
  }

  async getProfile(): Promise<User> {
    const response = await api.get("/auth/profile")
    return response.data
  }

  async updateProfile(userData: Partial<User>): Promise<User> {
    const response = await api.put("/auth/profile", userData)
    return response.data
  }

  async logout(): Promise<void> {
    await api.post("/auth/logout")
    localStorage.removeItem("ai-shayak-token")
    localStorage.removeItem("ai-shayak-user")
  }
}

export const authService = new AuthService()
