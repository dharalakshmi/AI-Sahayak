"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, User, Bell, Globe, Shield, HelpCircle, LogOut, Edit, Save } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { useLanguage } from "@/hooks/useLanguage"

interface SettingsScreenProps {
  onNavigate: (screen: string) => void
}

export function SettingsScreen({ onNavigate }: SettingsScreenProps) {
  const { user, updateUser, logout } = useAuth()
  const { language, setLanguage } = useLanguage()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    businessName: user?.businessName || "",
    phone: user?.phone || "",
  })
  const [notifications, setNotifications] = useState({
    whatsapp: true,
    email: false,
    sms: true,
    push: true,
  })

  const handleSave = async () => {
    await updateUser(formData)
    setIsEditing(false)
  }

  const languages = [
    { value: "hindi", label: "हिंदी (Hindi)" },
    { value: "telugu", label: "తెలుగు (Telugu)" },
    { value: "english", label: "English" },
    { value: "tamil", label: "தமிழ் (Tamil)" },
    { value: "kannada", label: "ಕನ್ನಡ (Kannada)" },
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
              <h1 className="text-lg font-semibold">Settings</h1>
              <p className="text-sm text-gray-600">Manage your account & preferences</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Section */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-lg font-semibold">Profile Information</h2>
            </div>
            <Button variant="outline" size="sm" onClick={() => (isEditing ? handleSave() : setIsEditing(true))}>
              {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
              {isEditing ? "Save" : "Edit"}
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="phone">WhatsApp Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={!isEditing}
              />
            </div>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="p-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Bell className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-lg font-semibold">Notification Preferences</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">WhatsApp Alerts</div>
                <div className="text-sm text-gray-600">Receive compliance alerts on WhatsApp</div>
              </div>
              <Switch
                checked={notifications.whatsapp}
                onCheckedChange={(checked) => setNotifications({ ...notifications, whatsapp: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">SMS Notifications</div>
                <div className="text-sm text-gray-600">Backup SMS for urgent alerts</div>
              </div>
              <Switch
                checked={notifications.sms}
                onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Push Notifications</div>
                <div className="text-sm text-gray-600">In-app notifications</div>
              </div>
              <Switch
                checked={notifications.push}
                onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
              />
            </div>
          </div>
        </Card>

        {/* Language & Region */}
        <Card className="p-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Globe className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-lg font-semibold">Language & Region</h2>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="language">Preferred Language</Label>
              <Select value={language} onValueChange={setLanguage}>
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

            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <Select defaultValue="ist">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Security */}
        <Card className="p-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-lg font-semibold">Security & Privacy</h2>
          </div>

          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              Two-Factor Authentication
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              Privacy Settings
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              Data Export
            </Button>
          </div>
        </Card>

        {/* Support */}
        <Card className="p-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-orange-600" />
            </div>
            <h2 className="text-lg font-semibold">Support & Help</h2>
          </div>

          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              Help Center
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              Contact Support
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              Feature Requests
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              Rate App
            </Button>
          </div>
        </Card>

        {/* App Info */}
        <Card className="p-4">
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>App Version</span>
              <span>1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span>Last Updated</span>
              <span>Jan 12, 2025</span>
            </div>
            <div className="flex justify-between">
              <span>Data Security</span>
              <span className="text-green-600">ISO 27001 Aligned</span>
            </div>
          </div>
        </Card>

        {/* Logout */}
        <Button variant="destructive" className="w-full" onClick={logout}>
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  )
}
