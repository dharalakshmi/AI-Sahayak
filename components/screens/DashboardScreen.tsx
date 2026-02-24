"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  MessageCircle,
  TrendingUp,
  Calendar,
  Bell,
  Scan,
} from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { useAlerts } from "@/hooks/useAlerts"

interface DashboardScreenProps {
  onNavigate: (screen: string) => void
}

export function DashboardScreen({ onNavigate }: DashboardScreenProps) {
  const { user } = useAuth()
  const { alerts, complianceScore } = useAlerts()

  const urgentAlerts = alerts.filter((alert) => alert.priority === "urgent").length
  const pendingTasks = alerts.filter((alert) => !alert.completed).length

  const quickActions = [
    {
      icon: MessageCircle,
      title: "WhatsApp Chat",
      subtitle: "Get instant help",
      color: "bg-green-500",
      action: () => onNavigate("whatsapp"),
    },
    {
      icon: Scan,
      title: "Scan Document",
      subtitle: "AI-powered analysis",
      color: "bg-blue-500",
      action: () => onNavigate("scanner"),
    },
    {
      icon: Bell,
      title: "View Alerts",
      subtitle: `${urgentAlerts} urgent`,
      color: "bg-red-500",
      action: () => onNavigate("alerts"),
    },
    {
      icon: FileText,
      title: "Compliance Tasks",
      subtitle: `${pendingTasks} pending`,
      color: "bg-orange-500",
      action: () => onNavigate("compliance"),
    },
  ]

  const upcomingDeadlines = [
    {
      title: "GST Return Filing",
      date: "15 Jan 2025",
      daysLeft: 3,
      type: "GST",
      penalty: "₹10,000",
    },
    {
      title: "PF Contribution",
      date: "20 Jan 2025",
      daysLeft: 8,
      type: "PF",
      penalty: "₹5,000",
    },
    {
      title: "ESI Payment",
      date: "25 Jan 2025",
      daysLeft: 13,
      type: "ESI",
      penalty: "₹2,000",
    },
  ]

  const recentUpdates = [
    {
      title: "New GST Rate Changes",
      description: "Updated rates for textile industry",
      time: "2 hours ago",
      type: "regulatory",
    },
    {
      title: "PF Compliance Alert",
      description: "Monthly contribution deadline approaching",
      time: "5 hours ago",
      type: "alert",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">नमस्ते, {user?.name || "User"}</h1>
            <p className="text-sm text-gray-600">{user?.businessName}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-lg font-bold text-green-600">{complianceScore}%</span>
            </div>
            <p className="text-xs text-gray-500">Compliance Score</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Status Overview */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Compliance Status</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-lg font-bold text-green-600">12</div>
              <div className="text-xs text-gray-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-lg font-bold text-orange-600">{pendingTasks}</div>
              <div className="text-xs text-gray-600">Pending</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div className="text-lg font-bold text-red-600">{urgentAlerts}</div>
              <div className="text-xs text-gray-600">Urgent</div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <Card
                key={index}
                className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={action.action}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{action.title}</div>
                    <div className="text-xs text-gray-600">{action.subtitle}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Upcoming Deadlines</h2>
            <Button variant="ghost" size="sm" onClick={() => onNavigate("alerts")}>
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {upcomingDeadlines.map((deadline, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <Badge variant={deadline.daysLeft <= 5 ? "destructive" : "secondary"}>{deadline.type}</Badge>
                      <span className="text-sm font-medium">{deadline.title}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-gray-600">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{deadline.date}</span>
                      </span>
                      <span className="text-red-600">Penalty: {deadline.penalty}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${deadline.daysLeft <= 5 ? "text-red-600" : "text-orange-600"}`}>
                      {deadline.daysLeft}
                    </div>
                    <div className="text-xs text-gray-600">days left</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Updates */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Recent Updates</h2>
          <div className="space-y-3">
            {recentUpdates.map((update, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      update.type === "regulatory" ? "bg-blue-100" : "bg-orange-100"
                    }`}
                  >
                    {update.type === "regulatory" ? (
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                    ) : (
                      <Bell className="w-4 h-4 text-orange-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 mb-1">{update.title}</div>
                    <div className="text-sm text-gray-600 mb-2">{update.description}</div>
                    <div className="text-xs text-gray-500">{update.time}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
