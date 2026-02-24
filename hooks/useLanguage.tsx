"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface LanguageContextType {
  language: string
  setLanguage: (lang: string) => void
  t: (key: string) => string
}

const translations = {
  hindi: {
    welcome: "स्वागत है",
    dashboard: "डैशबोर्ड",
    alerts: "अलर्ट",
    compliance: "अनुपालन",
    settings: "सेटिंग्स",
  },
  english: {
    welcome: "Welcome",
    dashboard: "Dashboard",
    alerts: "Alerts",
    compliance: "Compliance",
    settings: "Settings",
  },
  telugu: {
    welcome: "స్వాగతం",
    dashboard: "డాష్‌బోర్డ్",
    alerts: "హెచ్చరికలు",
    compliance: "అనుపాలన",
    settings: "సెట్టింగులు",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState("hindi")

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.hindi] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
