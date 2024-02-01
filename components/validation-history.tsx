"use client"

import { useState, useEffect } from "react"
import type { User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, TrendingUp, Eye, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ValidationHistoryProps {
  user: User
}

interface Validation {
  id: string
  idea_title: string
  idea_description: string
  overall_score: number
  created_at: string
  validation_result: any
}

export default function ValidationHistory({ user }: ValidationHistoryProps) {
  const [validations, setValidations] = useState<Validation[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedValidation, setSelectedValidation] = useState<Validation | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchValidations()
  }, [])

  const fetchValidations = async () => {
    try {
      const { data, error } = await supabase
        .from("validations")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (error) throw error
      setValidations(data || [])
    } catch (error) {
      console.error("Error fetching validations:", error)
      toast({
        title: "Error",
        description: "Failed to load validation history",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const deleteValidation = async (id: string) => {
    try {
      const { error } = await supabase.from("validations").delete().eq("id", id)

      if (error) throw error

      setValidations((prev) => prev.filter((v) => v.id !== id))
      toast({
        title: "Success",
        description: "Validation deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting validation:", error)
      toast({
        title: "Error",
        description: "Failed to delete validation",
        variant: "destructive",
      })
    }
  }

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return "default"
    if (score >= 60) return "secondary"
    return "destructive"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  if (selectedValidation) {
    const result = selectedValidation.validation_result
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">{selectedValidation.idea_title}</h2>
            <p className="text-gray-600">Validated on {formatDate(selectedValidation.created_at)}</p>
          </div>
          <Button onClick={() => setSelectedValidation(null)} variant="outline">
            Back to History
          </Button>
        </div>

        {/* Overall Score */}
        <Card className="border-orange-200 hover:shadow-xl transition-all duration-300 hover:border-orange-300 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <TrendingUp className="h-6 w-6 mr-2 text-orange-500" />
                Overall Validation Score
              </CardTitle>
              <Badge
                variant={getScoreBadgeVariant(result.overallScore)}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white text-lg px-3 py-1"
              >
                {result.overallScore}/100
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{selectedValidation.idea_description}</p>
          </CardContent>
        </Card>

        {/* Score Breakdown */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="border-orange-200 hover:shadow-xl transition-all duration-300 hover:border-orange-300 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Market Size</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">{result.marketSize.score}/100</div>
            </CardContent>
          </Card>
          <Card className="border-orange-200 hover:shadow-xl transition-all duration-300 hover:border-orange-300 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Market Fit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{result.marketFit.score}/100</div>
            </CardContent>
          </Card>
          <Card className="border-orange-200 hover:shadow-xl transition-all duration-300 hover:border-orange-300 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Feasibility</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-500">{result.feasibility.score}/100</div>
            </CardContent>
          </Card>
        </div>

        {/* Key Insights */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-orange-200 hover:shadow-xl transition-all duration-300 hover:border-orange-300 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Key Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.recommendations.slice(0, 5).map((rec: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-sm">{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-orange-200 hover:shadow-xl transition-all duration-300 hover:border-orange-300 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Major Risks</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.risks.majorRisks.slice(0, 5).map((risk: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">
                      !
                    </div>
                    <span className="text-sm">{risk}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Validation History</h2>
        <Badge variant="outline">
          {validations.length} validation{validations.length !== 1 ? "s" : ""}
        </Badge>
      </div>

      {validations.length === 0 ? (
        <Card className="border-orange-200 hover:shadow-xl transition-all duration-300 hover:border-orange-300 bg-white/80 backdrop-blur-sm">
          <CardContent className="py-12 text-center">
            <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No validations yet</h3>
            <p className="text-gray-500">Start by validating your first startup idea!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {validations.map((validation) => (
            <Card
              key={validation.id}
              className="border-orange-200 hover:shadow-xl transition-all duration-300 hover:border-orange-300 bg-white/80 backdrop-blur-sm"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{validation.idea_title}</CardTitle>
                    <CardDescription className="mt-1">
                      {validation.idea_description.length > 150
                        ? `${validation.idea_description.substring(0, 150)}...`
                        : validation.idea_description}
                    </CardDescription>
                  </div>
                  <Badge
                    variant={getScoreBadgeVariant(validation.overall_score)}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white"
                  >
                    {validation.overall_score}/100
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(validation.created_at)}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
                      onClick={() => setSelectedValidation(validation)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteValidation(validation.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
