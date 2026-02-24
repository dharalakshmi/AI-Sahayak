"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Send, Paperclip, Camera, AlertTriangle } from "lucide-react"

interface WhatsAppChatScreenProps {
  onNavigate: (screen: string) => void
}

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  messageType?: "text" | "alert" | "document" | "action"
  actionButtons?: Array<{
    text: string
    action: string
  }>
}

export function WhatsAppChatScreen({ onNavigate }: WhatsAppChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: "नमस्ते! मैं AI Shayak हूं। आपका compliance assistant। आज मैं आपकी कैसे मदद कर सकता हूं?",
      timestamp: new Date(Date.now() - 300000),
      messageType: "text",
    },
    {
      id: "2",
      type: "bot",
      content:
        "🚨 URGENT ALERT: GST Return filing due in 3 days (15 Jan 2025)\n\nPenalty if missed: ₹10,000\nLate fee: ₹200/day\n\nक्या आपको help चाहिए filing के लिए?",
      timestamp: new Date(Date.now() - 120000),
      messageType: "alert",
      actionButtons: [
        { text: "Get Help", action: "help" },
        { text: "Mark Done", action: "complete" },
        { text: "Remind Later", action: "snooze" },
      ],
    },
  ])

  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
      messageType: "text",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage)
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateBotResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase()

    if (input.includes("gst") || input.includes("जीएसटी")) {
      return {
        id: Date.now().toString(),
        type: "bot",
        content:
          "GST के बारे में:\n\n📅 Next due date: 15 Jan 2025\n💰 Penalty: ₹10,000\n📋 Status: Pending\n\nक्या आप चाहते हैं कि मैं आपको step-by-step guide दूं?",
        timestamp: new Date(),
        messageType: "text",
        actionButtons: [
          { text: "Yes, Guide Me", action: "guide" },
          { text: "Check Status", action: "status" },
        ],
      }
    } else if (input.includes("pf") || input.includes("provident")) {
      return {
        id: Date.now().toString(),
        type: "bot",
        content:
          "PF Compliance Status:\n\n✅ Last payment: Dec 2024\n📅 Next due: 20 Jan 2025\n💰 Amount: ₹45,000\n\nSab kuch on track hai! Reminder 3 days पहले आएगा।",
        timestamp: new Date(),
        messageType: "text",
      }
    } else if (input.includes("scan") || input.includes("document")) {
      return {
        id: Date.now().toString(),
        type: "bot",
        content:
          "Document scanning के लिए:\n\n1. Photo खींचें या PDF upload करें\n2. मैं AI से analyze करूंगा\n3. Issues और recommendations मिलेंगे\n\nकौन सा document scan करना है?",
        timestamp: new Date(),
        messageType: "document",
        actionButtons: [
          { text: "Upload Document", action: "upload" },
          { text: "Take Photo", action: "camera" },
        ],
      }
    } else {
      return {
        id: Date.now().toString(),
        type: "bot",
        content:
          "मैं आपकी मदद कर सकता हूं:\n\n• GST, PF, ESI compliance\n• Document scanning\n• Deadline reminders\n• Penalty calculations\n\nकोई specific question है?",
        timestamp: new Date(),
        messageType: "text",
      }
    }
  }

  const handleActionButton = (action: string) => {
    switch (action) {
      case "help":
        setInputMessage("GST filing में help चाहिए")
        break
      case "complete":
        const completeMessage: Message = {
          id: Date.now().toString(),
          type: "bot",
          content: "✅ Great! GST task को completed mark कर दिया। Next reminder आपको 10 days पहले मिलेगा।",
          timestamp: new Date(),
          messageType: "text",
        }
        setMessages((prev) => [...prev, completeMessage])
        break
      case "snooze":
        const snoozeMessage: Message = {
          id: Date.now().toString(),
          type: "bot",
          content: "⏰ Reminder को 1 day के लिए snooze कर दिया। कल फिर से alert आएगा।",
          timestamp: new Date(),
          messageType: "text",
        }
        setMessages((prev) => [...prev, snoozeMessage])
        break
      case "upload":
        onNavigate("scanner")
        break
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 flex items-center space-x-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate("dashboard")}
          className="text-white hover:bg-green-700 p-2"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="font-semibold">AI Shayak</h1>
          <p className="text-xs text-green-100">Your Compliance Assistant</p>
        </div>
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
          <span className="text-sm font-bold">AS</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs lg:max-w-md ${
                message.type === "user"
                  ? "bg-green-500 text-white rounded-l-lg rounded-tr-lg"
                  : "bg-white text-gray-900 rounded-r-lg rounded-tl-lg shadow-sm"
              } p-3`}
            >
              {message.messageType === "alert" && message.type === "bot" && (
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <Badge variant="destructive" className="text-xs">
                    URGENT
                  </Badge>
                </div>
              )}

              <div className="whitespace-pre-line text-sm">{message.content}</div>

              {message.actionButtons && (
                <div className="mt-3 space-y-2">
                  {message.actionButtons.map((button, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="w-full text-xs bg-transparent"
                      onClick={() => handleActionButton(button.action)}
                    >
                      {button.text}
                    </Button>
                  ))}
                </div>
              )}

              <div className={`text-xs mt-2 ${message.type === "user" ? "text-green-100" : "text-gray-500"}`}>
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white rounded-r-lg rounded-tl-lg shadow-sm p-3 max-w-xs">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t p-4">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="p-2">
            <Paperclip className="w-5 h-5 text-gray-500" />
          </Button>
          <Button variant="ghost" size="sm" className="p-2">
            <Camera className="w-5 h-5 text-gray-500" />
          </Button>
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button onClick={sendMessage} className="bg-green-600 hover:bg-green-700 p-2" disabled={!inputMessage.trim()}>
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
