import api from "@/lib/api"

export interface WhatsAppMessage {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: string
  messageType?: "text" | "alert" | "document" | "action"
  actionButtons?: Array<{
    text: string
    action: string
  }>
}

export interface SendMessageRequest {
  content: string
  type?: "text" | "document"
}

class WhatsAppService {
  async sendMessage(messageData: SendMessageRequest): Promise<WhatsAppMessage> {
    const response = await api.post("/whatsapp/send", messageData)
    return response.data
  }

  async getChatHistory(): Promise<WhatsAppMessage[]> {
    const response = await api.get("/whatsapp/history")
    return response.data
  }

  async processAction(action: string, context?: any): Promise<WhatsAppMessage> {
    const response = await api.post("/whatsapp/action", { action, context })
    return response.data
  }

  async uploadDocument(file: File): Promise<{ fileUrl: string; analysisId: string }> {
    const formData = new FormData()
    formData.append("document", file)

    const response = await api.post("/whatsapp/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  }
}

export const whatsappService = new WhatsAppService()
