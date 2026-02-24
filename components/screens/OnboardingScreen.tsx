"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Building, MapPin, Languages } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"

interface OnboardingScreenProps {
  onComplete: () => void
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    businessName: "",
    businessType: "",
    state: "",
    language: "hindi",
  })
  const { updateUser } = useAuth()

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      handleComplete()
    }
  }

  const handleComplete = async () => {
    await updateUser({ ...formData, onboardingComplete: true })
    onComplete()
  }

  const businessTypes = [
    "Manufacturing",
    "Trading",
    "Services",
    "Restaurant/Food",
    "Retail",
    "Construction",
    "Transport",
    "Healthcare",
    "Other",
  ]

  const indianStates = [
    "Andhra Pradesh",
    "Telangana",
    "Karnataka",
    "Tamil Nadu",
    "Kerala",
    "Maharashtra",
    "Gujarat",
    "Rajasthan",
    "Madhya Pradesh",
    "Uttar Pradesh",
    "Delhi",
    "Punjab",
    "Haryana",
    "West Bengal",
    "Odisha",
    "Bihar",
  ]

  const languages = [
    { value: "hindi", label: "हिंदी (Hindi)" },
    { value: "telugu", label: "తెలుగు (Telugu)" },
    { value: "english", label: "English" },
    { value: "tamil", label: "தமிழ் (Tamil)" },
    { value: "kannada", label: "ಕನ್ನಡ (Kannada)" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Setup Your Account</h1>
          <Progress value={(step / 3) * 100} className="w-full" />
          <p className="text-sm text-gray-600 mt-2">Step {step} of 3</p>
        </div>

        <Card className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Building className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-lg font-semibold">Personal Information</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">WhatsApp Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-lg font-semibold">Business Details</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="Enter your business name"
                  />
                </div>
                <div>
                  <Label htmlFor="businessType">Business Type</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, businessType: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map((type) => (
                        <SelectItem key={type} value={type.toLowerCase()}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, state: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent>
                      {indianStates.map((state) => (
                        <SelectItem key={state} value={state.toLowerCase()}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Languages className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-lg font-semibold">Language Preference</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="language">Preferred Language</Label>
                  <Select
                    value={formData.language}
                    onValueChange={(value) => setFormData({ ...formData, language: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">What you'll get:</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• WhatsApp alerts in your language</li>
                    <li>• GST, PF, ESI deadline reminders</li>
                    <li>• Document scanning & AI summaries</li>
                    <li>• Free basic plan forever</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>

            <Button onClick={handleNext} className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700">
              <span>{step === 3 ? "Complete Setup" : "Next"}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
