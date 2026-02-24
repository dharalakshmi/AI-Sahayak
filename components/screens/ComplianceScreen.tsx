"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, CheckCircle, Clock, AlertTriangle, Download, Calendar, TrendingUp } from "lucide-react"
import { useAlerts } from "@/hooks/useAlerts"

interface ComplianceScreenProps {
  onNavigate: (screen: string) => void
}

export function ComplianceScreen({ onNavigate }: ComplianceScreenProps) {
  const { alerts, complianceScore, markCompleted } = useAlerts()

  const pendingTasks = alerts.filter((alert) => !alert.completed)
  const completedTasks = alerts.filter((alert) => alert.completed)
  const urgentTasks = alerts.filter((alert) => alert.priority === "urgent" && !alert.completed)

  const complianceCategories = [
    {
      name: "GST Compliance",
      score: 85,
      tasks: alerts.filter((a) => a.type === "gst"),
      color: "bg-blue-500",
    },
    {
      name: "PF Compliance",
      score: 92,
      tasks: alerts.filter((a) => a.type === "pf"),
      color: "bg-green-500",
    },
    {
      name: "ESI Compliance",
      score: 78,
      tasks: alerts.filter((a) => a.type === "esi"),
      color: "bg-orange-500",
    },
    {
      name: "Labor Law",
      score: 95,
      tasks: alerts.filter((a) => a.type === "labor"),
      color: "bg-purple-500",
    },
  ]

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
              <h1 className="text-lg font-semibold">Compliance Dashboard</h1>
              <p className="text-sm text-gray-600">Track your compliance status</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Report
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Overall Score */}
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-green-50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{complianceScore}%</h2>
              <p className="text-sm text-gray-600">Overall Compliance Score</p>
            </div>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <Progress value={complianceScore} className="mb-2" />
          <p className="text-xs text-gray-500">
            {complianceScore >= 90
              ? "Excellent compliance!"
              : complianceScore >= 70
                ? "Good compliance, room for improvement"
                : "Needs attention - multiple pending tasks"}
          </p>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-xl font-bold text-green-600">{completedTasks.length}</div>
            <div className="text-xs text-gray-600">Completed</div>
          </Card>

          <Card className="p-4 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-xl font-bold text-orange-600">{pendingTasks.length}</div>
            <div className="text-xs text-gray-600">Pending</div>
          </Card>

          <Card className="p-4 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="text-xl font-bold text-red-600">{urgentTasks.length}</div>
            <div className="text-xs text-gray-600">Urgent</div>
          </Card>
        </div>

        {/* Category Breakdown */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Compliance Categories</h3>
          <div className="space-y-4">
            {complianceCategories.map((category, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${category.color}`} />
                    <span className="font-medium text-gray-900">{category.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">{category.score}%</div>
                    <div className="text-xs text-gray-500">
                      {category.tasks.filter((t) => t.completed).length}/{category.tasks.length} tasks
                    </div>
                  </div>
                </div>
                <Progress value={category.score} className="mb-2" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{category.tasks.filter((t) => !t.completed).length} pending</span>
                  <span>{category.tasks.filter((t) => t.completed).length} completed</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Pending Tasks */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Pending Tasks</h3>
            <Button variant="ghost" size="sm" onClick={() => onNavigate("alerts")}>
              View All
            </Button>
          </div>

          <div className="space-y-3">
            {pendingTasks.slice(0, 5).map((task) => (
              <Card key={task.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-900">{task.title}</span>
                      <Badge variant={task.priority === "urgent" ? "destructive" : "secondary"} className="text-xs">
                        {task.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-gray-600">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{task.dueDate.toLocaleDateString("en-IN")}</span>
                      </span>
                      <span className="text-red-600">Penalty: {task.penalty}</span>
                    </div>
                  </div>
                  <Button size="sm" onClick={() => markCompleted(task.id)} className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Done
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {pendingTasks.length === 0 && (
            <Card className="p-8 text-center">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">All Caught Up!</h3>
              <p className="text-gray-600">No pending compliance tasks at the moment.</p>
            </Card>
          )}
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {completedTasks.slice(0, 3).map((task) => (
              <Card key={task.id} className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{task.title}</div>
                    <div className="text-sm text-gray-600">Completed successfully</div>
                  </div>
                  <div className="text-xs text-gray-500">{task.createdAt.toLocaleDateString("en-IN")}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
