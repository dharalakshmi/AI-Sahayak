"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, AlertTriangle, CheckCircle, Calendar, IndianRupee, Filter } from "lucide-react"
import { useAlerts } from "@/hooks/useAlerts"

interface AlertsScreenProps {
  onNavigate: (screen: string) => void
}

export function AlertsScreen({ onNavigate }: AlertsScreenProps) {
  const { alerts, markCompleted, snoozeAlert } = useAlerts()
  const [filter, setFilter] = useState<"all" | "urgent" | "pending" | "completed">("all")

  const filteredAlerts = alerts.filter((alert) => {
    switch (filter) {
      case "urgent":
        return alert.priority === "urgent" && !alert.completed
      case "pending":
        return !alert.completed
      case "completed":
        return alert.completed
      default:
        return true
    }
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "gst":
        return "📊"
      case "pf":
        return "👥"
      case "esi":
        return "🏥"
      case "labor":
        return "⚖️"
      case "license":
        return "📄"
      default:
        return "📋"
    }
  }

  const getDaysLeft = (dueDate: Date) => {
    const today = new Date()
    const diffTime = dueDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={() => onNavigate("dashboard")} className="p-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold">Compliance Alerts</h1>
              <p className="text-sm text-gray-600">{filteredAlerts.length} alerts</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-2 mt-4">
          {[
            { key: "all", label: "All", count: alerts.length },
            {
              key: "urgent",
              label: "Urgent",
              count: alerts.filter((a) => a.priority === "urgent" && !a.completed).length,
            },
            { key: "pending", label: "Pending", count: alerts.filter((a) => !a.completed).length },
            { key: "completed", label: "Done", count: alerts.filter((a) => a.completed).length },
          ].map((tab) => (
            <Button
              key={tab.key}
              variant={filter === tab.key ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(tab.key as any)}
              className="text-xs"
            >
              {tab.label} ({tab.count})
            </Button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {filteredAlerts.map((alert) => {
          const daysLeft = getDaysLeft(alert.dueDate)

          return (
            <Card key={alert.id} className={`p-4 ${alert.completed ? "opacity-60" : ""}`}>
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{getTypeIcon(alert.type)}</div>

                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                    <div className={`w-2 h-2 rounded-full ${getPriorityColor(alert.priority)}`} />
                    <Badge variant="outline" className="text-xs">
                      {alert.type.toUpperCase()}
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">{alert.description}</p>

                  <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{alert.dueDate.toLocaleDateString("en-IN")}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <IndianRupee className="w-3 h-3" />
                      <span>Penalty: {alert.penalty}</span>
                    </div>
                    <div
                      className={`flex items-center space-x-1 ${
                        daysLeft <= 3 ? "text-red-600" : daysLeft <= 7 ? "text-orange-600" : "text-blue-600"
                      }`}
                    >
                      <Clock className="w-3 h-3" />
                      <span>{daysLeft > 0 ? `${daysLeft} days left` : `${Math.abs(daysLeft)} days overdue`}</span>
                    </div>
                  </div>

                  {!alert.completed && (
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => markCompleted(alert.id)}
                        className="bg-green-600 hover:bg-green-700 text-xs"
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Mark Done
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => snoozeAlert(alert.id, 24)} className="text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        Snooze 1d
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs bg-transparent">
                        Get Help
                      </Button>
                    </div>
                  )}

                  {alert.completed && (
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Completed</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )
        })}

        {filteredAlerts.length === 0 && (
          <div className="text-center py-12">
            <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No alerts found</h3>
            <p className="text-gray-600">All compliance tasks are up to date!</p>
          </div>
        )}
      </div>
    </div>
  )
}
