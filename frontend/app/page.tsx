"use client"

import { useState, useEffect } from "react"
import { WelcomeScreen } from "@/components/screens/WelcomeScreen"
import { OnboardingScreen } from "@/components/screens/OnboardingScreen"
import { DashboardScreen } from "@/components/screens/DashboardScreen"
import { AlertsScreen } from "@/components/screens/AlertsScreen"
import { DocumentScannerScreen } from "@/components/screens/DocumentScannerScreen"
import { ComplianceScreen } from "@/components/screens/ComplianceScreen"
import { SettingsScreen } from "@/components/screens/SettingsScreen"
import { WhatsAppChatScreen } from "@/components/screens/WhatsAppChatScreen"
import { Navigation } from "@/components/ui/Navigation"
import { useAuth } from "@/hooks/useAuth"
import { useLanguage } from "@/hooks/useLanguage"

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState("welcome")
  const { user, isAuthenticated } = useAuth()
  const { language } = useLanguage()

  useEffect(() => {
    if (isAuthenticated && user?.onboardingComplete) {
      setCurrentScreen("dashboard")
    } else if (isAuthenticated && !user?.onboardingComplete) {
      setCurrentScreen("onboarding")
    }
  }, [isAuthenticated, user])

  const renderScreen = () => {
    switch (currentScreen) {
      case "welcome":
        return <WelcomeScreen onNext={() => setCurrentScreen("onboarding")} />
      case "onboarding":
        return <OnboardingScreen onComplete={() => setCurrentScreen("dashboard")} />
      case "dashboard":
        return <DashboardScreen onNavigate={setCurrentScreen} />
      case "alerts":
        return <AlertsScreen onNavigate={setCurrentScreen} />
      case "scanner":
        return <DocumentScannerScreen onNavigate={setCurrentScreen} />
      case "compliance":
        return <ComplianceScreen onNavigate={setCurrentScreen} />
      case "settings":
        return <SettingsScreen onNavigate={setCurrentScreen} />
      case "whatsapp":
        return <WhatsAppChatScreen onNavigate={setCurrentScreen} />
      default:
        return <DashboardScreen onNavigate={setCurrentScreen} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {renderScreen()}
      {isAuthenticated && user?.onboardingComplete && (
        <Navigation currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      )}
    </div>
  )
}
