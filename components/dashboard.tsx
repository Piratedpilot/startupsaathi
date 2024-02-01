"use client"

import { useState, useEffect } from "react"
import type { User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Plus, History, LogOut, UserIcon } from "lucide-react"
import IdeaValidator from "./idea-validator"
import ValidationHistory from "./validation-history"

interface DashboardProps {
  user: User
}

export default function Dashboard({ user }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<"validate" | "history">("validate")
  const [validationCount, setValidationCount] = useState(0)

  useEffect(() => {
    fetchValidationCount()
  }, [])

  const fetchValidationCount = async () => {
    const { count } = await supabase
      .from("validations")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)

    setValidationCount(count || 0)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-orange-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-orange-500 to-green-600 p-2 rounded-lg">
              <Lightbulb className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
              StartupSaathi
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-orange-50 to-green-50 px-3 py-2 rounded-lg">
              <UserIcon className="h-5 w-5 text-orange-600" />
              <span className="text-sm text-gray-700 font-medium">{user.user_metadata?.full_name || user.email}</span>
            </div>
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="border-orange-300 text-orange-600 hover:bg-orange-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-orange-100">Total Validations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{validationCount}</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-100">Account Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="outline" className="bg-white/20 text-white border-white/30">
                Active
              </Badge>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-100">Market Focus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-semibold">🇮🇳 India</div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="flex space-x-4 mb-6">
          <Button
            variant={activeTab === "validate" ? "default" : "outline"}
            onClick={() => setActiveTab("validate")}
            className={
              activeTab === "validate"
                ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg"
                : "border-orange-300 text-orange-600 hover:bg-orange-50"
            }
          >
            <Plus className="h-4 w-4 mr-2" />
            Validate New Idea
          </Button>
          <Button
            variant={activeTab === "history" ? "default" : "outline"}
            onClick={() => setActiveTab("history")}
            className={
              activeTab === "history"
                ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg"
                : "border-green-300 text-green-600 hover:bg-green-50"
            }
          >
            <History className="h-4 w-4 mr-2" />
            Validation History
          </Button>
        </div>

        {/* Content */}
        {activeTab === "validate" && (
          <IdeaValidator
            user={user}
            onValidationComplete={() => {
              fetchValidationCount()
              setActiveTab("history")
            }}
          />
        )}
        {activeTab === "history" && <ValidationHistory user={user} />}
      </div>
    </div>
  )
}
