"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { IndianRupee, TrendingUp, Users, MapPin, Lightbulb, CheckCircle } from "lucide-react"
import Auth from "./auth"

export default function LandingPage() {
  const [showAuth, setShowAuth] = useState(false)

  if (showAuth) {
    return <Auth onBack={() => setShowAuth(false)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-orange-500 to-green-600 p-2 rounded-lg">
              <Lightbulb className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
              StartupSaathi
            </span>
          </div>
          <Button
            onClick={() => setShowAuth(true)}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg"
          >
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-100/20 via-white/40 to-green-100/20"></div>
        <div className="container mx-auto text-center relative z-10">
          <Badge variant="outline" className="mb-4 border-orange-300 text-orange-700 bg-orange-50/80 backdrop-blur-sm">
            🇮🇳 भारत के लिए बनाया गया • Made for India
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Validate Your Startup Idea for the{" "}
            <span className="bg-gradient-to-r from-orange-500 via-white to-green-500 bg-clip-text text-transparent">
              Indian Market
            </span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Get AI-powered insights tailored to India's unique market dynamics, consumer behavior, and regulatory
            landscape. Make informed decisions before you build.
          </p>
          <Button
            size="lg"
            onClick={() => setShowAuth(true)}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg px-8 py-3 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
          >
            Validate Your Idea Now
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-50/50 to-green-50/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Choose <span className="text-orange-600">StartupSaathi</span>?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-orange-200 hover:shadow-xl transition-all duration-300 hover:border-orange-300 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-3 rounded-lg w-fit mb-3">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-orange-700">India-Focused Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Validation considers Indian market size, demographics, and regional preferences
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-xl transition-all duration-300 hover:border-green-300 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-lg w-fit mb-3">
                  <IndianRupee className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-green-700">Pricing Strategy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Get pricing recommendations based on Indian purchasing power and competition
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 hover:shadow-xl transition-all duration-300 hover:border-blue-300 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-lg w-fit mb-3">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-blue-700">Target Audience</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Identify your ideal customers across India's diverse demographic landscape
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-200 hover:shadow-xl transition-all duration-300 hover:border-purple-300 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-lg w-fit mb-3">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-purple-700">Market Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Stay updated with latest Indian market trends and growth opportunities</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What We Analyze */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Comprehensive <span className="text-green-600">India-Specific</span> Analysis
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50">
                <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-green-800">Market Size & Opportunity</h3>
                  <p className="text-gray-600">TAM, SAM, SOM analysis for Indian market</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 rounded-lg bg-gradient-to-r from-orange-50 to-orange-100/50">
                <CheckCircle className="h-6 w-6 text-orange-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-orange-800">Regulatory Compliance</h3>
                  <p className="text-gray-600">Indian laws, licenses, and compliance requirements</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/50">
                <CheckCircle className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-800">Competition Analysis</h3>
                  <p className="text-gray-600">Local and international competitors in India</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50">
                <CheckCircle className="h-6 w-6 text-purple-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-purple-800">Cultural Fit</h3>
                  <p className="text-gray-600">How well your idea aligns with Indian culture</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 rounded-lg bg-gradient-to-r from-indigo-50 to-indigo-100/50">
                <CheckCircle className="h-6 w-6 text-indigo-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-indigo-800">Funding Landscape</h3>
                  <p className="text-gray-600">VC interest and funding opportunities in India</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 rounded-lg bg-gradient-to-r from-teal-50 to-teal-100/50">
                <CheckCircle className="h-6 w-6 text-teal-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-teal-800">Go-to-Market Strategy</h3>
                  <p className="text-gray-600">Best channels and strategies for Indian market</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 rounded-lg bg-gradient-to-r from-red-50 to-red-100/50">
                <CheckCircle className="h-6 w-6 text-red-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-red-800">Risk Assessment</h3>
                  <p className="text-gray-600">India-specific risks and mitigation strategies</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 rounded-lg bg-gradient-to-r from-yellow-50 to-yellow-100/50">
                <CheckCircle className="h-6 w-6 text-yellow-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-yellow-800">Scalability Potential</h3>
                  <p className="text-gray-600">Growth potential across Indian states and cities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-500 via-orange-600 to-green-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-green-600/20"></div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">Ready to Validate Your Startup Idea?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of Indian entrepreneurs who trust StartupSaathi</p>
          <Button
            size="lg"
            onClick={() => setShowAuth(true)}
            className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-8 py-3 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 font-semibold"
          >
            Start Your Validation
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="bg-gradient-to-r from-orange-500 to-green-600 p-2 rounded-lg">
              <Lightbulb className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-green-400 bg-clip-text text-transparent">
              StartupSaathi
            </span>
          </div>
          <p className="text-gray-300">Empowering Indian entrepreneurs with AI-powered startup validation</p>
          <p className="text-sm text-gray-400 mt-2"> Made with ❤️ for India 🇮🇳</p>
          <p className="text-xs text-gray mt-2"> An Initiative By Akul Yadav</p>
        </div>
      </footer>
    </div>
  )
}
