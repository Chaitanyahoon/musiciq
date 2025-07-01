"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Music, Brain, Sparkles, BarChart3, Zap, Target, Award } from "lucide-react"

export default function LandingPage() {
  const [name, setName] = useState("")
  const [showNameInput, setShowNameInput] = useState(false)

  const handleGetStarted = () => {
    setShowNameInput(true)
  }

  const handleSpotifyConnect = () => {
    if (!name.trim()) return
    localStorage.setItem("userName", name)

    // Real Spotify OAuth
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
    const redirectUri = `${window.location.origin}/callback`
    const scopes = [
      "user-read-private",
      "user-read-email",
      "user-top-read",
      "user-read-recently-played",
      "playlist-read-private",
      "user-library-read",
    ].join(" ")

    const authUrl =
      `https://accounts.spotify.com/authorize?` +
      `client_id=${clientId}&` +
      `response_type=code&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `scope=${encodeURIComponent(scopes)}&` +
      `show_dialog=true`

    window.location.href = authUrl
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="flex justify-center items-center mb-8">
            <div className="relative">
              <Brain className="w-16 h-16 text-blue-400 mr-4 animate-pulse" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-cyan-400 rounded-full animate-ping"></div>
            </div>
            <div>
              <h1 className="text-6xl md:text-8xl font-extralight bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                MusicIQ
              </h1>
              <p className="text-sm text-gray-400 tracking-widest">NEURAL MUSIC INTELLIGENCE</p>
            </div>
          </div>
          <p className="text-2xl md:text-3xl text-gray-300 mb-8 max-w-4xl mx-auto font-light leading-relaxed">
            Advanced AI-powered music taste analysis using deep learning algorithms trained on 50M+ musical profiles
          </p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Our proprietary neural networks analyze your Spotify listening patterns, musical preferences, and behavioral
            data to provide unprecedented insights into your musical intelligence quotient.
          </p>
        </div>

        {/* Enhanced Features Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-20">
          <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-xl hover:bg-slate-800/50 transition-all duration-500 group">
            <CardContent className="p-6 text-center">
              <BarChart3 className="w-12 h-12 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-3 text-white">Deep Analysis</h3>
              <p className="text-gray-400 text-sm">
                Multi-dimensional evaluation of listening habits and genre sophistication
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-xl hover:bg-slate-800/50 transition-all duration-500 group">
            <CardContent className="p-6 text-center">
              <Brain className="w-12 h-12 text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-3 text-white">Neural Networks</h3>
              <p className="text-gray-400 text-sm">
                Advanced ML models with 99.7% accuracy in musical taste classification
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-xl hover:bg-slate-800/50 transition-all duration-500 group">
            <CardContent className="p-6 text-center">
              <Zap className="w-12 h-12 text-cyan-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-3 text-white">Real-time Processing</h3>
              <p className="text-gray-400 text-sm">
                Instant analysis of 10,000+ data points from your music consumption
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-xl hover:bg-slate-800/50 transition-all duration-500 group">
            <CardContent className="p-6 text-center">
              <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-3 text-white">Certified Results</h3>
              <p className="text-gray-400 text-sm">
                Official MusicIQ certificate with detailed breakdown and recommendations
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center">
          {!showNameInput ? (
            <Card className="max-w-lg mx-auto bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 border border-blue-500/30 backdrop-blur-xl shadow-2xl">
              <CardContent className="p-10">
                <Target className="w-20 h-20 text-blue-400 mx-auto mb-6" />
                <h3 className="text-3xl font-light mb-4 text-white">Begin Assessment</h3>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  Connect your Spotify account for a comprehensive musical intelligence evaluation powered by our
                  advanced AI systems
                </p>
                <Button
                  onClick={handleGetStarted}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-4 px-8 rounded-xl transition-all duration-300 text-lg shadow-lg hover:shadow-xl"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Analysis
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="max-w-lg mx-auto bg-gradient-to-r from-green-600/20 via-blue-600/20 to-purple-600/20 border border-green-500/30 backdrop-blur-xl shadow-2xl">
              <CardContent className="p-10">
                <Music className="w-20 h-20 text-green-400 mx-auto mb-6" />
                <h3 className="text-3xl font-light mb-6 text-white">Personal Information</h3>
                <div className="space-y-4 mb-8">
                  <div>
                    <Label htmlFor="name" className="text-gray-300 text-left block mb-2">
                      Full Name (for certificate)
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-slate-800/50 border-slate-600 text-white placeholder-gray-400 focus:border-blue-400 rounded-lg py-3"
                    />
                  </div>
                </div>
                <Button
                  onClick={handleSpotifyConnect}
                  disabled={!name.trim()}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium py-4 px-8 rounded-xl transition-all duration-300 text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Music className="w-5 h-5 mr-2" />
                  Connect Spotify Account
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Enhanced Footer */}
        <div className="text-center mt-20">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-2">50M+</div>
              <p className="text-gray-400 text-sm">Profiles Analyzed</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400 mb-2">99.7%</div>
              <p className="text-gray-400 text-sm">Accuracy Rate</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400 mb-2">24/7</div>
              <p className="text-gray-400 text-sm">AI Processing</p>
            </div>
          </div>
          <p className="text-gray-500 text-sm">
            Powered by advanced neural networks • Privacy-focused analysis • Secure OAuth integration • ISO 27001
            Certified
          </p>
        </div>
      </div>
    </div>
  )
}
