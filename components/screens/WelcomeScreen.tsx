"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Shield, MessageCircle, Bell, FileText, Users, TrendingUp } from "lucide-react"

interface WelcomeScreenProps {
  onNext: () => void
}

export function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-md mx-auto pt-8">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Shayak</h1>
          <p className="text-lg text-gray-600 mb-4">आपका व्यापारिक अनुपालन सहायक</p>
          <p className="text-sm text-gray-500">WhatsApp-First Compliance Assistant for Indian SMEs</p>
        </div>

        {/* Value Proposition */}
        <Card className="p-6 mb-6 border-0 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Stop ₹10,000 Fines Before They Happen</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <MessageCircle className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-700">WhatsApp में alerts पाएं</span>
            </div>
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-700">GST, PF, ESI deadlines track करें</span>
            </div>
            <div className="flex items-center space-x-3">
              <FileText className="w-5 h-5 text-orange-600" />
              <span className="text-sm text-gray-700">Documents scan करें AI से</span>
            </div>
          </div>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card className="p-4 text-center border-0 shadow-md">
            <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">63M</div>
            <div className="text-xs text-gray-600">Indian SMEs</div>
          </Card>
          <Card className="p-4 text-center border-0 shadow-md">
            <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">80%</div>
            <div className="text-xs text-gray-600">Need Digital Support</div>
          </Card>
        </div>

        {/* CTA */}
        <div className="space-y-3">
          <Button
            onClick={onNext}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
          >
            Get Started - शुरू करें
          </Button>
          <p className="text-center text-xs text-gray-500">Free for basic alerts • ₹299/month for advanced features</p>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500 mb-2">Trusted by 50+ SMEs across India</p>
          <div className="flex justify-center space-x-4 text-xs text-gray-400">
            <span>🔒 ISO 27001 Aligned</span>
            <span>🇮🇳 Indian Cloud</span>
            <span>📱 WhatsApp Ready</span>
          </div>
        </div>
      </div>
    </div>
  )
}
