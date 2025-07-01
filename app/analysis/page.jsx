"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Brain, Music, Loader2 } from "lucide-react"
import { analyzeSpotifyData } from "@/lib/spotify-api"

const analysisSteps = [
  "Connecting to Spotify API...",
  "Retrieving your listening history...",
  "Analyzing top artists and tracks...",
  "Processing genre preferences...",
  "Evaluating audio features...",
  "Calculating diversity metrics...",
  "Running neural network analysis...",
  "Generating personalized insights...",
]

export default function Analysis() {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [thinkingText, setThinkingText] = useState("")
  const [showThinking, setShowThinking] = useState(false)
  const [spotifyData, setSpotifyData] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    const runAnalysis = async () => {
      try {
        // Start the analysis process
        const analysisPromise = analyzeSpotifyData()

        // Progress through analysis steps
        const stepInterval = setInterval(() => {
          setCurrentStep((prev) => {
            if (prev < analysisSteps.length - 1) {
              return prev + 1
            } else {
              clearInterval(stepInterval)
              return prev
            }
          })
        }, 1500)

        // Update progress bar
        const progressInterval = setInterval(() => {
          setProgress((prev) => {
            if (prev < 90) {
              return prev + Math.random() * 3
            }
            return prev
          })
        }, 200)

        // Show thinking texts after analysis starts
        setTimeout(() => setShowThinking(true), 3000)

        // Wait for actual analysis to complete
        const data = await analysisPromise
        setSpotifyData(data)

        // Complete progress
        setProgress(100)
        clearInterval(stepInterval)
        clearInterval(progressInterval)

        // Store data and redirect
        localStorage.setItem("spotifyAnalysis", JSON.stringify(data))
        setTimeout(() => {
          window.location.href = "/quiz"
        }, 2000)
      } catch (err) {
        setError(err.message || "Failed to analyze Spotify data")
        console.error("Analysis error:", err)
      }
    }

    runAnalysis()
  }, [])

  useEffect(() => {
    if (showThinking && spotifyData) {
      const thinkingTexts = [
        `Analyzing ${spotifyData.topArtists[0]?.name || "your top artist"} listening patterns...`,
        `Processing "${spotifyData.topTracks[0]?.name || "your favorite track"}" audio features...`,
        `Evaluating ${spotifyData.topGenres[0] || "your main genre"} sophistication level...`,
        `Calculating diversity score: ${Math.round(spotifyData.diversityScore * 100)}%...`,
        `Analyzing ${spotifyData.totalTracks} tracks for patterns...`,
        `Processing ${spotifyData.listeningTime} of daily consumption...`,
        `Evaluating repeat listening behaviors...`,
        `Cross-referencing with 50M+ user profiles...`,
      ]

      const thinkingInterval = setInterval(() => {
        const randomText = thinkingTexts[Math.floor(Math.random() * thinkingTexts.length)]
        setThinkingText(randomText)
      }, 2000)

      return () => clearInterval(thinkingInterval)
    }
  }, [showThinking, spotifyData])

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-950 to-black text-white flex items-center justify-center">
        <Card className="max-w-lg mx-4 bg-red-900/30 border-red-700/50 backdrop-blur-xl">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-red-400 mb-4">Analysis Failed</h2>
            <p className="text-gray-300 mb-6">{error}</p>
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white flex items-center justify-center">
      <div className="container mx-auto px-4">
        <Card className="max-w-3xl mx-auto bg-slate-800/30 border-slate-700/50 backdrop-blur-xl">
          <CardContent className="p-12">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center items-center mb-4">
                <Brain className="w-10 h-10 text-blue-400 mr-3 animate-pulse" />
                <h1 className="text-4xl font-light text-white">MusicIQ Analysis</h1>
              </div>
              <p className="text-gray-400 text-lg">AI is processing your real Spotify data...</p>
            </div>

            {/* Main Analysis Display */}
            <div className="text-center mb-8">
              <div className="relative mb-8">
                <div className="w-32 h-32 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-6">
                  <Loader2 className="w-16 h-16 text-white animate-spin" />
                </div>
                <div className="absolute inset-0 w-32 h-32 mx-auto border-4 border-blue-400/30 rounded-full animate-ping"></div>
              </div>

              <h2 className="text-2xl font-medium text-white mb-4">{analysisSteps[currentStep]}</h2>

              <div className="mb-8">
                <Progress value={Math.min(progress, 100)} className="h-3 mb-3" />
                <p className="text-sm text-gray-400">{Math.round(progress)}% Complete</p>
              </div>
            </div>

            {/* Real-time Analysis Display */}
            {showThinking && (
              <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-600 mb-8">
                <div className="flex items-center mb-4">
                  <Music className="w-6 h-6 text-cyan-400 mr-3" />
                  <span className="text-lg font-medium text-cyan-400">Neural Network Processing</span>
                </div>
                <div className="min-h-[80px] flex items-center">
                  <p className="text-gray-300 text-lg animate-pulse" key={thinkingText}>
                    {thinkingText}
                  </p>
                </div>
              </div>
            )}

            {/* Status Indicators */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-4 h-4 bg-green-400 rounded-full mx-auto mb-2 animate-pulse"></div>
                <p className="text-xs text-gray-400">Spotify Connected</p>
              </div>
              <div className="text-center">
                <div className="w-4 h-4 bg-blue-400 rounded-full mx-auto mb-2 animate-pulse"></div>
                <p className="text-xs text-gray-400">Data Retrieved</p>
              </div>
              <div className="text-center">
                <div className="w-4 h-4 bg-purple-400 rounded-full mx-auto mb-2 animate-pulse"></div>
                <p className="text-xs text-gray-400">AI Processing</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
