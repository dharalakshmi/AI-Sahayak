"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Upload, Camera, FileText, AlertTriangle, CheckCircle, Eye, Download, Scan, Zap } from "lucide-react"

interface DocumentScannerScreenProps {
  onNavigate: (screen: string) => void
}

export function DocumentScannerScreen({ onNavigate }: DocumentScannerScreenProps) {
  const [scanStep, setScanStep] = useState<"upload" | "scanning" | "results">("upload")
  const [scanProgress, setScanProgress] = useState(0)

  const handleFileUpload = () => {
    setScanStep("scanning")
    setScanProgress(0)

    // Simulate scanning progress
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setScanStep("results")
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const scanResults = {
    documentType: "GST Invoice",
    confidence: 94,
    issues: [
      {
        type: "error",
        title: "Missing GSTIN",
        description: "Supplier GSTIN is not clearly visible",
        severity: "high",
      },
      {
        type: "warning",
        title: "Date Format",
        description: "Invoice date format should be DD/MM/YYYY",
        severity: "medium",
      },
      {
        type: "info",
        title: "HSN Code",
        description: "HSN code is correctly formatted",
        severity: "low",
      },
    ],
    extractedData: {
      invoiceNumber: "INV-2024-001",
      date: "12/01/2025",
      amount: "₹25,000",
      gst: "₹4,500",
      supplier: "ABC Enterprises",
    },
    recommendations: [
      "Request supplier to provide clear GSTIN",
      "Use standard date format for future invoices",
      "Verify HSN code with product category",
    ],
  }

  if (scanStep === "upload") {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header */}
        <div className="bg-white shadow-sm p-4 flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={() => onNavigate("dashboard")} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold">Document Scanner</h1>
            <p className="text-sm text-gray-600">AI-powered document analysis</p>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Feature Highlights */}
          <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">AI-Powered Analysis</h2>
                <p className="text-sm text-gray-600">LegalBERT + IndicTrans NLP</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>OCR Text Extraction</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Clause Detection</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Date Validation</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Format Checking</span>
              </div>
            </div>
          </Card>

          {/* Upload Options */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Upload Document</h2>

            <Card
              className="p-6 border-2 border-dashed border-gray-300 hover:border-blue-500 cursor-pointer transition-colors"
              onClick={handleFileUpload}
            >
              <div className="text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Upload File</h3>
                <p className="text-sm text-gray-600 mb-4">PDF, JPG, PNG up to 10MB</p>
                <Button className="bg-blue-600 hover:bg-blue-700">Choose File</Button>
              </div>
            </Card>

            <div className="text-center text-gray-500">or</div>

            <Card
              className="p-6 border-2 border-dashed border-gray-300 hover:border-green-500 cursor-pointer transition-colors"
              onClick={handleFileUpload}
            >
              <div className="text-center">
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Take Photo</h3>
                <p className="text-sm text-gray-600 mb-4">Capture document with camera</p>
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent">
                  Open Camera
                </Button>
              </div>
            </Card>
          </div>

          {/* Supported Documents */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Supported Documents</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                "GST Invoices",
                "PF Documents",
                "ESI Forms",
                "Labor Contracts",
                "License Documents",
                "Compliance Certificates",
              ].map((doc, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                  <FileText className="w-4 h-4" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (scanStep === "scanning") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 max-w-sm mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Scan className="w-8 h-8 text-blue-600 animate-pulse" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Analyzing Document</h2>
            <p className="text-sm text-gray-600 mb-6">AI is processing your document...</p>

            <Progress value={scanProgress} className="mb-4" />
            <p className="text-sm text-gray-500">{scanProgress}% Complete</p>

            <div className="mt-6 space-y-2 text-xs text-gray-500">
              <div className={scanProgress >= 20 ? "text-green-600" : ""}>✓ OCR Text Extraction</div>
              <div className={scanProgress >= 40 ? "text-green-600" : ""}>✓ Document Classification</div>
              <div className={scanProgress >= 60 ? "text-green-600" : ""}>✓ Clause Detection</div>
              <div className={scanProgress >= 80 ? "text-green-600" : ""}>✓ Compliance Validation</div>
              <div className={scanProgress >= 100 ? "text-green-600" : ""}>✓ Report Generation</div>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={() => setScanStep("upload")} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold">Scan Results</h1>
            <p className="text-sm text-gray-600">{scanResults.documentType}</p>
          </div>
        </div>
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          {scanResults.confidence}% Confidence
        </Badge>
      </div>

      <div className="p-4 space-y-6">
        {/* Summary */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Analysis Summary</h2>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {scanResults.issues.filter((i) => i.severity === "high").length}
              </div>
              <div className="text-xs text-gray-600">Critical Issues</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {scanResults.issues.filter((i) => i.severity === "medium").length}
              </div>
              <div className="text-xs text-gray-600">Warnings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {scanResults.issues.filter((i) => i.severity === "low").length}
              </div>
              <div className="text-xs text-gray-600">Info</div>
            </div>
          </div>
        </Card>

        {/* Issues Found */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Issues Found</h3>
          <div className="space-y-3">
            {scanResults.issues.map((issue, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      issue.severity === "high"
                        ? "bg-red-100"
                        : issue.severity === "medium"
                          ? "bg-orange-100"
                          : "bg-blue-100"
                    }`}
                  >
                    {issue.type === "error" ? (
                      <AlertTriangle
                        className={`w-4 h-4 ${issue.severity === "high" ? "text-red-600" : "text-orange-600"}`}
                      />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-900">{issue.title}</span>
                      <Badge
                        variant={
                          issue.severity === "high"
                            ? "destructive"
                            : issue.severity === "medium"
                              ? "secondary"
                              : "outline"
                        }
                        className="text-xs"
                      >
                        {issue.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{issue.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Extracted Data */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Extracted Information</h3>
          <Card className="p-4">
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(scanResults.extractedData).map(([key, value]) => (
                <div key={key}>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </div>
                  <div className="font-medium text-gray-900">{value}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recommendations */}
        <div>
          <h3 className="text-lg font-semibold mb-3">AI Recommendations</h3>
          <Card className="p-4">
            <div className="space-y-3">
              {scanResults.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-600">{index + 1}</span>
                  </div>
                  <p className="text-sm text-gray-700">{rec}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" onClick={() => setScanStep("upload")} className="flex items-center space-x-2">
            <Upload className="w-4 h-4" />
            <span>Scan Another</span>
          </Button>
          <Button
            onClick={() => onNavigate("compliance")}
            className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2"
          >
            <Eye className="w-4 h-4" />
            <span>View Tasks</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
