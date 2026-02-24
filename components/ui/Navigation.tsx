"use client"

import { Home, Bell, Scan, FileText, MessageCircle, Settings } from "lucide-react"

interface NavigationProps {
  currentScreen: string
  onNavigate: (screen: string) => void
}

export function Navigation({ currentScreen, onNavigate }: NavigationProps) {
  const navItems = [
    { id: "dashboard", icon: Home, label: "Home" },
    { id: "alerts", icon: Bell, label: "Alerts" },
    { id: "whatsapp", icon: MessageCircle, label: "Chat" },
    { id: "scanner", icon: Scan, label: "Scan" },
    { id: "compliance", icon: FileText, label: "Tasks" },
    { id: "settings", icon: Settings, label: "Settings" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
              currentScreen === item.id ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
