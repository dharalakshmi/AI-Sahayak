"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface Alert {
  id: string
  title: string
  description: string
  type: "gst" | "pf" | "esi" | "labor" | "license"
  priority: "urgent" | "high" | "medium" | "low"
  dueDate: Date
  penalty: string
  completed: boolean
  createdAt: Date
}

interface AlertsContextType {
  alerts: Alert[]
  complianceScore: number
  addAlert: (alert: Omit<Alert, "id" | "createdAt">) => void
  markCompleted: (alertId: string) => void
  snoozeAlert: (alertId: string, hours: number) => void
}

const AlertsContext = createContext<AlertsContextType | undefined>(undefined)

export function AlertsProvider({ children }: { children: ReactNode }) {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      title: "GST Return Filing",
      description: "Monthly GST return filing due",
      type: "gst",
      priority: "urgent",
      dueDate: new Date("2025-01-15"),
      penalty: "₹10,000",
      completed: false,
      createdAt: new Date(),
    },
    {
      id: "2",
      title: "PF Contribution",
      description: "Employee PF contribution payment",
      type: "pf",
      priority: "high",
      dueDate: new Date("2025-01-20"),
      penalty: "₹5,000",
      completed: false,
      createdAt: new Date(),
    },
    {
      id: "3",
      title: "ESI Payment",
      description: "ESI monthly payment due",
      type: "esi",
      priority: "medium",
      dueDate: new Date("2025-01-25"),
      penalty: "₹2,000",
      completed: false,
      createdAt: new Date(),
    },
    {
      id: "4",
      title: "Labor License Renewal",
      description: "Annual labor license renewal",
      type: "license",
      priority: "low",
      dueDate: new Date("2025-02-15"),
      penalty: "₹15,000",
      completed: false,
      createdAt: new Date(),
    },
  ])

  const complianceScore = Math.round((alerts.filter((alert) => alert.completed).length / alerts.length) * 100)

  const addAlert = (alertData: Omit<Alert, "id" | "createdAt">) => {
    const newAlert: Alert = {
      ...alertData,
      id: Date.now().toString(),
      createdAt: new Date(),
    }
    setAlerts((prev) => [...prev, newAlert])
  }

  const markCompleted = (alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, completed: true } : alert)))
  }

  const snoozeAlert = (alertId: string, hours: number) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId
          ? { ...alert, dueDate: new Date(alert.dueDate.getTime() + hours * 60 * 60 * 1000) }
          : alert,
      ),
    )
  }

  return (
    <AlertsContext.Provider
      value={{
        alerts,
        complianceScore,
        addAlert,
        markCompleted,
        snoozeAlert,
      }}
    >
      {children}
    </AlertsContext.Provider>
  )
}

export function useAlerts() {
  const context = useContext(AlertsContext)
  if (context === undefined) {
    throw new Error("useAlerts must be used within an AlertsProvider")
  }
  return context
}
