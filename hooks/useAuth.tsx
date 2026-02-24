"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  phone: string
  businessName: string
  businessType: string
  state: string
  language: string
  onboardingComplete: boolean
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (userData: Partial<User>) => Promise<void>
  logout: () => void
  updateUser: (userData: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem("ai-shayak-user")
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      setUser(userData)
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (userData: Partial<User>) => {
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name || "",
      phone: userData.phone || "",
      businessName: userData.businessName || "",
      businessType: userData.businessType || "",
      state: userData.state || "",
      language: userData.language || "hindi",
      onboardingComplete: false,
    }

    setUser(newUser)
    setIsAuthenticated(true)
    localStorage.setItem("ai-shayak-user", JSON.stringify(newUser))
  }

  const updateUser = async (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem("ai-shayak-user", JSON.stringify(updatedUser))
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("ai-shayak-user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
