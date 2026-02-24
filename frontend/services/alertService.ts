import api from "@/lib/api"

export interface Alert {
  id: string
  title: string
  description: string
  type: "gst" | "pf" | "esi" | "labor" | "license"
  priority: "urgent" | "high" | "medium" | "low"
  dueDate: string
  penalty: string
  completed: boolean
  userId: string
  createdAt: string
  updatedAt: string
}

export interface CreateAlertRequest {
  title: string
  description: string
  type: Alert["type"]
  priority: Alert["priority"]
  dueDate: string
  penalty: string
}

class AlertService {
  async getAlerts(): Promise<Alert[]> {
    const response = await api.get("/alerts")
    return response.data
  }

  async createAlert(alertData: CreateAlertRequest): Promise<Alert> {
    const response = await api.post("/alerts", alertData)
    return response.data
  }

  async updateAlert(alertId: string, updates: Partial<Alert>): Promise<Alert> {
    const response = await api.put(`/alerts/${alertId}`, updates)
    return response.data
  }

  async markCompleted(alertId: string): Promise<Alert> {
    const response = await api.patch(`/alerts/${alertId}/complete`)
    return response.data
  }

  async snoozeAlert(alertId: string, hours: number): Promise<Alert> {
    const response = await api.patch(`/alerts/${alertId}/snooze`, { hours })
    return response.data
  }

  async deleteAlert(alertId: string): Promise<void> {
    await api.delete(`/alerts/${alertId}`)
  }

  async getComplianceScore(): Promise<{ score: number; breakdown: Record<string, number> }> {
    const response = await api.get("/alerts/compliance-score")
    return response.data
  }
}

export const alertService = new AlertService()
