import api from "@/lib/api"

export interface DocumentAnalysis {
  id: string
  documentType: string
  confidence: number
  issues: Array<{
    type: "error" | "warning" | "info"
    title: string
    description: string
    severity: "high" | "medium" | "low"
  }>
  extractedData: Record<string, any>
  recommendations: string[]
  userId: string
  createdAt: string
}

export interface UploadDocumentRequest {
  file: File
  documentType?: string
}

class DocumentService {
  async uploadDocument(file: File, documentType?: string): Promise<DocumentAnalysis> {
    const formData = new FormData()
    formData.append("document", file)
    if (documentType) {
      formData.append("documentType", documentType)
    }

    const response = await api.post("/documents/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  }

  async getAnalysis(analysisId: string): Promise<DocumentAnalysis> {
    const response = await api.get(`/documents/analysis/${analysisId}`)
    return response.data
  }

  async getAnalysisHistory(): Promise<DocumentAnalysis[]> {
    const response = await api.get("/documents/history")
    return response.data
  }

  async reprocessDocument(analysisId: string): Promise<DocumentAnalysis> {
    const response = await api.post(`/documents/reprocess/${analysisId}`)
    return response.data
  }

  async exportAnalysis(analysisId: string, format: "pdf" | "json"): Promise<Blob> {
    const response = await api.get(`/documents/export/${analysisId}`, {
      params: { format },
      responseType: "blob",
    })
    return response.data
  }
}

export const documentService = new DocumentService()
