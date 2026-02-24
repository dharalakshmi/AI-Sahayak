import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/hooks/useAuth"
import { AlertsProvider } from "@/hooks/useAlerts"
import { LanguageProvider } from "@/hooks/useLanguage"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Shayak - WhatsApp Compliance Assistant",
  description: "AI-powered compliance assistant for Indian SMEs. Get GST, PF, ESI alerts on WhatsApp.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <AuthProvider>
            <AlertsProvider>{children}</AlertsProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
