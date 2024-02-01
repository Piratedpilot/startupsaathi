"use client"

import { useState } from "react"
import type { User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Loader2, Sparkles, TrendingUp, Users, IndianRupee, AlertTriangle, CheckCircle, Target } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface IdeaValidatorProps {
  user: User
  onValidationComplete: () => void
}

interface ValidationResult {
  overallScore: number
  marketSize: {
    score: number
    analysis: string
    tam: string
    sam: string
    som: string
  }
  competition: {
    score: number
    analysis: string
    competitors: string[]
    competitiveAdvantage: string
  }
  feasibility: {
    score: number
    analysis: string
    technicalChallenges: string[]
    resourceRequirements: string
  }
  marketFit: {
    score: number
    analysis: string
    targetAudience: string
    culturalFit: string
  }
  financials: {
    score: number
    analysis: string
    revenueModel: string
    pricingStrategy: string
    fundingRequirement: string
  }
  risks: {
    score: number
    analysis: string
    majorRisks: string[]
    mitigationStrategies: string[]
  }
  recommendations: string[]
  nextSteps: string[]
}

export default function IdeaValidator({ user, onValidationComplete }: IdeaValidatorProps) {
  const [formData, setFormData] = useState({
    ideaTitle: "",
    ideaDescription: "",
    targetMarket: "",
    businessModel: "",
    stage: "",
    budget: "",
    timeline: "",
    experience: "",
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ValidationResult | null>(null)
  const { toast } = useToast()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const cleanJsonResponse = (text: string): string => {
    // Remove markdown code blocks
    let cleaned = text
      .replace(/```json\s*/g, "")
      .replace(/```\s*$/g, "")
      .trim()

    // Remove any remaining markdown artifacts
    cleaned = cleaned
      .replace(/^```.*\n/g, "")
      .replace(/\n```$/g, "")
      .trim()

    // Find the first { and last } to extract just the JSON
    const firstBrace = cleaned.indexOf("{")
    const lastBrace = cleaned.lastIndexOf("}")

    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      cleaned = cleaned.substring(firstBrace, lastBrace + 1)
    }

    return cleaned
  }

  const validateIdea = async () => {
    if (!formData.ideaTitle || !formData.ideaDescription) {
      toast({
        title: "Error",
        description: "Please fill in at least the idea title and description",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const prompt = `
      As an expert startup advisor specializing in the Indian market, provide a comprehensive validation analysis for this startup idea:

      Idea Title: ${formData.ideaTitle}
      Description: ${formData.ideaDescription}
      Target Market: ${formData.targetMarket}
      Business Model: ${formData.businessModel}
      Stage: ${formData.stage}
      Budget: ${formData.budget}
      Timeline: ${formData.timeline}
      Founder Experience: ${formData.experience}

      Please analyze this idea specifically for the Indian market and provide ONLY a valid JSON response with the following exact structure (no markdown, no explanations, just the JSON):

      {
        "overallScore": 75,
        "marketSize": {
          "score": 80,
          "analysis": "detailed analysis of market size in India",
          "tam": "Total Addressable Market in India",
          "sam": "Serviceable Addressable Market",
          "som": "Serviceable Obtainable Market"
        },
        "competition": {
          "score": 65,
          "analysis": "competitive landscape analysis in India",
          "competitors": ["competitor1", "competitor2", "competitor3"],
          "competitiveAdvantage": "potential competitive advantages"
        },
        "feasibility": {
          "score": 70,
          "analysis": "technical and operational feasibility in India",
          "technicalChallenges": ["challenge1", "challenge2", "challenge3"],
          "resourceRequirements": "required resources and team"
        },
        "marketFit": {
          "score": 85,
          "analysis": "product-market fit analysis for India",
          "targetAudience": "detailed target audience description",
          "culturalFit": "how well it fits Indian culture and preferences"
        },
        "financials": {
          "score": 72,
          "analysis": "financial viability analysis",
          "revenueModel": "recommended revenue model for India",
          "pricingStrategy": "pricing strategy considering Indian market",
          "fundingRequirement": "estimated funding requirements"
        },
        "risks": {
          "score": 60,
          "analysis": "risk assessment for Indian market",
          "majorRisks": ["risk1", "risk2", "risk3"],
          "mitigationStrategies": ["strategy1", "strategy2", "strategy3"]
        },
        "recommendations": ["recommendation1", "recommendation2", "recommendation3"],
        "nextSteps": ["step1", "step2", "step3"]
      }

      Consider Indian-specific factors like regulatory environment, payment preferences (UPI, cash, digital wallets), language and localization needs, tier 1/2/3 city differences, price sensitivity, cultural preferences, government initiatives, infrastructure challenges, and local competition.

      IMPORTANT: Return ONLY the JSON object, no markdown formatting, no explanations.
    `

      const response = await fetch("/api/validate-idea", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      let validationResult
      try {
        // Clean the response before parsing
        const cleanedResult = cleanJsonResponse(data.result)
        console.log("Cleaned result:", cleanedResult)
        validationResult = JSON.parse(cleanedResult)
      } catch (parseError) {
        console.error("JSON parsing error:", parseError)
        console.log("Raw result:", data.result)

        // Try to extract JSON from the response using regex
        const jsonMatch = data.result.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          try {
            validationResult = JSON.parse(jsonMatch[0])
          } catch (regexParseError) {
            console.error("Regex JSON parsing also failed:", regexParseError)
            throw new Error("Failed to parse validation result")
          }
        } else {
          throw new Error("No valid JSON found in response")
        }
      }

      setResult(validationResult)

      // Save to database
      const { error } = await supabase.from("validations").insert({
        user_id: user.id,
        idea_title: formData.ideaTitle,
        idea_description: formData.ideaDescription,
        form_data: formData,
        validation_result: validationResult,
        overall_score: validationResult.overallScore,
      })

      if (error) {
        console.error("Error saving validation:", error)
      } else {
        // Remove this line to prevent auto-switching to history
        // onValidationComplete()
      }

      toast({
        title: "Success",
        description: "Your idea has been validated successfully!",
      })
    } catch (error) {
      console.error("Validation error:", error)
      toast({
        title: "Error",
        description: "Failed to validate your idea. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return "default"
    if (score >= 60) return "secondary"
    return "destructive"
  }

  if (result) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Validation Results</h2>
          <div className="flex space-x-2">
            <Button
              onClick={() => {
                onValidationComplete()
                // This will switch to history tab and update the count
              }}
              variant="outline"
              className="border-green-300 text-green-600 hover:bg-green-50"
            >
              View in History
            </Button>
            <Button
              onClick={() => setResult(null)}
              variant="outline"
              className="border-orange-300 text-orange-600 hover:bg-orange-50"
            >
              Validate Another Idea
            </Button>
          </div>
        </div>

        {/* Overall Score */}
        <Card className="border-2 border-orange-300 bg-gradient-to-r from-orange-50 to-green-50 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Sparkles className="h-6 w-6 mr-2 text-orange-500" />
                Overall Validation Score
              </CardTitle>
              <Badge variant={getScoreBadgeVariant(result.overallScore)} className="text-lg px-3 py-1">
                {result.overallScore}/100
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Detailed Analysis */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Market Size */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
                Market Size
                <Badge variant="outline" className="ml-auto">
                  {result.marketSize.score}/100
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-600">{result.marketSize.analysis}</p>
              <div className="space-y-2">
                <div>
                  <strong>TAM:</strong> {result.marketSize.tam}
                </div>
                <div>
                  <strong>SAM:</strong> {result.marketSize.sam}
                </div>
                <div>
                  <strong>SOM:</strong> {result.marketSize.som}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Competition */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-purple-500" />
                Competition
                <Badge variant="outline" className="ml-auto">
                  {result.competition.score}/100
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-600">{result.competition.analysis}</p>
              <div>
                <strong>Main Competitors:</strong>
                <div className="flex flex-wrap gap-1 mt-1">
                  {result.competition.competitors.map((competitor, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {competitor}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <strong>Competitive Advantage:</strong>
                <p className="text-sm text-gray-600 mt-1">{result.competition.competitiveAdvantage}</p>
              </div>
            </CardContent>
          </Card>

          {/* Market Fit */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-green-500" />
                Market Fit
                <Badge variant="outline" className="ml-auto">
                  {result.marketFit.score}/100
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-600">{result.marketFit.analysis}</p>
              <div>
                <strong>Target Audience:</strong>
                <p className="text-sm text-gray-600 mt-1">{result.marketFit.targetAudience}</p>
              </div>
              <div>
                <strong>Cultural Fit:</strong>
                <p className="text-sm text-gray-600 mt-1">{result.marketFit.culturalFit}</p>
              </div>
            </CardContent>
          </Card>

          {/* Financials */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <IndianRupee className="h-5 w-5 mr-2 text-yellow-500" />
                Financials
                <Badge variant="outline" className="ml-auto">
                  {result.financials.score}/100
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-600">{result.financials.analysis}</p>
              <div>
                <strong>Revenue Model:</strong>
                <p className="text-sm text-gray-600 mt-1">{result.financials.revenueModel}</p>
              </div>
              <div>
                <strong>Pricing Strategy:</strong>
                <p className="text-sm text-gray-600 mt-1">{result.financials.pricingStrategy}</p>
              </div>
              <div>
                <strong>Funding Requirement:</strong>
                <p className="text-sm text-gray-600 mt-1">{result.financials.fundingRequirement}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feasibility & Risks */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-blue-500" />
                Feasibility
                <Badge variant="outline" className="ml-auto">
                  {result.feasibility.score}/100
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-600">{result.feasibility.analysis}</p>
              <div>
                <strong>Technical Challenges:</strong>
                <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                  {result.feasibility.technicalChallenges.map((challenge, index) => (
                    <li key={index}>{challenge}</li>
                  ))}
                </ul>
              </div>
              <div>
                <strong>Resource Requirements:</strong>
                <p className="text-sm text-gray-600 mt-1">{result.feasibility.resourceRequirements}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
                Risk Assessment
                <Badge variant="outline" className="ml-auto">
                  {result.risks.score}/100
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-600">{result.risks.analysis}</p>
              <div>
                <strong>Major Risks:</strong>
                <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                  {result.risks.majorRisks.map((risk, index) => (
                    <li key={index}>{risk}</li>
                  ))}
                </ul>
              </div>
              <div>
                <strong>Mitigation Strategies:</strong>
                <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                  {result.risks.mitigationStrategies.map((strategy, index) => (
                    <li key={index}>{strategy}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations & Next Steps */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.nextSteps.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-sm">{step}</span>
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
    <Card className="bg-white/80 backdrop-blur-sm border-orange-200 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Sparkles className="h-6 w-6 mr-2 text-orange-500" />
          Validate Your Startup Idea
        </CardTitle>
        <CardDescription>Get comprehensive AI-powered validation tailored for the Indian market</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="ideaTitle">Idea Title *</Label>
              <Input
                id="ideaTitle"
                placeholder="e.g., AI-powered food delivery for tier-2 cities"
                value={formData.ideaTitle}
                onChange={(e) => handleInputChange("ideaTitle", e.target.value)}
                className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
              />
            </div>

            <div>
              <Label htmlFor="ideaDescription">Idea Description *</Label>
              <Textarea
                id="ideaDescription"
                placeholder="Describe your startup idea in detail..."
                rows={4}
                value={formData.ideaDescription}
                onChange={(e) => handleInputChange("ideaDescription", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="targetMarket">Target Market</Label>
              <Input
                id="targetMarket"
                placeholder="e.g., Young professionals in tier-2 cities"
                value={formData.targetMarket}
                onChange={(e) => handleInputChange("targetMarket", e.target.value)}
                className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
              />
            </div>

            <div>
              <Label htmlFor="businessModel">Business Model</Label>
              <Select onValueChange={(value) => handleInputChange("businessModel", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select business model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="b2c">B2C (Business to Consumer)</SelectItem>
                  <SelectItem value="b2b">B2B (Business to Business)</SelectItem>
                  <SelectItem value="marketplace">Marketplace</SelectItem>
                  <SelectItem value="saas">SaaS (Software as a Service)</SelectItem>
                  <SelectItem value="subscription">Subscription</SelectItem>
                  <SelectItem value="freemium">Freemium</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="stage">Current Stage</Label>
              <Select onValueChange={(value) => handleInputChange("stage", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select current stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="idea">Just an Idea</SelectItem>
                  <SelectItem value="research">Market Research</SelectItem>
                  <SelectItem value="prototype">Prototype/MVP</SelectItem>
                  <SelectItem value="testing">Testing Phase</SelectItem>
                  <SelectItem value="launch">Ready to Launch</SelectItem>
                  <SelectItem value="launched">Already Launched</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="budget">Available Budget</Label>
              <Select onValueChange={(value) => handleInputChange("budget", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-1L">₹0 - ₹1 Lakh</SelectItem>
                  <SelectItem value="1-5L">₹1 - ₹5 Lakhs</SelectItem>
                  <SelectItem value="5-10L">₹5 - ₹10 Lakhs</SelectItem>
                  <SelectItem value="10-25L">₹10 - ₹25 Lakhs</SelectItem>
                  <SelectItem value="25-50L">₹25 - ₹50 Lakhs</SelectItem>
                  <SelectItem value="50L+">₹50 Lakhs+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="timeline">Expected Timeline</Label>
              <Select onValueChange={(value) => handleInputChange("timeline", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3months">3 Months</SelectItem>
                  <SelectItem value="6months">6 Months</SelectItem>
                  <SelectItem value="1year">1 Year</SelectItem>
                  <SelectItem value="2years">2 Years</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="experience">Your Experience</Label>
              <Select onValueChange={(value) => handleInputChange("experience", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="first-time">First-time Entrepreneur</SelectItem>
                  <SelectItem value="some">Some Business Experience</SelectItem>
                  <SelectItem value="experienced">Experienced Entrepreneur</SelectItem>
                  <SelectItem value="serial">Serial Entrepreneur</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Button
          onClick={validateIdea}
          disabled={loading}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Validating Your Idea...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Validate My Idea
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
