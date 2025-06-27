"use client"

import type React from "react"
import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Lightbulb } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AuthProps {
  onBack: () => void
}

export default function Auth({ onBack }: AuthProps) {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")

  const toastUtil = useToast()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        toastUtil.toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        })
      } else {
        toastUtil.toast({
          title: "Success",
          description: "Successfully signed in!",
        })
      }
    } catch (error) {
      toastUtil.toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: "https://startupsaathi.netlify.app/verified",
        },
      })

      if (error) {
        toastUtil.toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        })
      } else {
        toastUtil.toast({
          title: "Success",
          description: "Check your email for the confirmation link!",
        })
      }
    } catch (error) {
      toastUtil.toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-100/20 via-white/40 to-green-100/20"></div>
      <div className="w-full max-w-md relative z-10">
        <div className="flex items-center justify-center mb-8">
          <Button variant="ghost" onClick={onBack} className="absolute left-4 top-4 text-orange-600 hover:bg-orange-50">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-orange-500 to-green-600 p-2 rounded-lg">
              <Lightbulb className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
              StartupSaathi
            </span>
          </div>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm border-orange-200 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-gray-800">Welcome</CardTitle>
            <CardDescription className="text-gray-600">
              Sign in to your account or create a new one to start validating your startup ideas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-orange-100 to-green-100">
                <TabsTrigger
                  value="signin"
                  className="data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-sm"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow-sm"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg"
                    disabled={loading}
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      type="text"
                      placeholder="Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="border-green-200 focus:border-green-400 focus:ring-green-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border-green-200 focus:border-green-400 focus:ring-green-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border-green-200 focus:border-green-400 focus:ring-green-400"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg"
                    disabled={loading}
                  >
                    {loading ? "Creating account..." : "Sign Up"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
