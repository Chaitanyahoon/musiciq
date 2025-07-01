"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Brain,
  TrendingDown,
  AlertTriangle,
  Award,
  Share,
  Download,
  Trophy,
  Skull,
  ImageIcon,
  Copy,
  Music,
} from "lucide-react"
import { generateRealResult } from "@/lib/real-result-generator"
import { generateResultImage, shareToSocialMedia } from "@/lib/image-generator"
import { generateCertificatePDF } from "@/lib/pdf-generator"
import Link from "next/link"

const processingSteps = [
  "Compiling neural network analysis...",
  "Cross-referencing with your actual Spotify data...",
  "Calculating musical intelligence quotient...",
  "Generating personalized roast based on your taste...",
  "Finalizing official certification...",
]

export default function Results() {
  const [isProcessing, setIsProcessing] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [resultData, setResultData] = useState(null)
  const [userName, setUserName] = useState("")
  const [resultImage, setResultImage] = useState(null)
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)

  useEffect(() => {
    const name = localStorage.getItem("userName") || "Anonymous"
    const answers = JSON.parse(localStorage.getItem("quizAnswers") || "[]")
    const spotifyData = JSON.parse(localStorage.getItem("spotifyAnalysis") || "{}")

    setUserName(name)

    if (Object.keys(spotifyData).length === 0) {
      window.location.href = "/"
      return
    }

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < processingSteps.length - 1) {
          return prev + 1
        } else {
          clearInterval(stepInterval)
          setTimeout(() => {
            const result = generateRealResult(answers, spotifyData)
            setResultData(result)
            setIsProcessing(false)
            setTimeout(() => setShowResults(true), 500)
          }, 2000)
          return prev
        }
      })
    }, 1500)

    return () => clearInterval(stepInterval)
  }, [])

  const handleGenerateImage = async () => {
    if (!resultData || isGeneratingImage) return

    setIsGeneratingImage(true)
    try {
      const imageDataUrl = await generateResultImage(resultData, userName)
      setResultImage(imageDataUrl)
    } catch (error) {
      console.error("Error generating image:", error)
      alert("Error generating image. Please try again.")
    } finally {
      setIsGeneratingImage(false)
    }
  }

  const handleShare = async (platform) => {
    if (!resultData) return

    if (!resultImage) {
      await handleGenerateImage()
      return
    }

    await shareToSocialMedia(platform, resultImage, resultData, userName)
  }

  const handleDownloadCertificate = () => {
    if (resultData && userName) {
      generateCertificatePDF(resultData, userName)
    }
  }

  const getResultIcon = (score) => {
    if (score >= 90) return <Trophy className="w-16 h-16 text-yellow-400" />
    if (score >= 80) return <Award className="w-16 h-16 text-blue-400" />
    if (score >= 65) return <Brain className="w-16 h-16 text-purple-400" />
    if (score >= 50) return <TrendingDown className="w-16 h-16 text-green-400" />
    if (score >= 35) return <AlertTriangle className="w-16 h-16 text-gray-400" />
    if (score >= 20) return <TrendingDown className="w-16 h-16 text-orange-400" />
    return <Skull className="w-16 h-16 text-red-400" />
  }

  const getResultTheme = (score) => {
    if (score >= 80) return "from-yellow-900/80 to-blue-800/80 border-yellow-500"
    if (score >= 65) return "from-purple-900/80 to-blue-800/80 border-purple-500"
    if (score >= 50) return "from-green-900/80 to-blue-800/80 border-green-500"
    if (score >= 35) return "from-gray-900/80 to-gray-800/80 border-gray-500"
    if (score >= 20) return "from-orange-900/80 to-orange-800/80 border-orange-500"
    return "from-red-900/80 to-red-800/80 border-red-500"
  }

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white flex items-center justify-center">
        <Card className="max-w-2xl mx-4 bg-slate-800/30 border-slate-700/50 backdrop-blur-xl">
          <CardContent className="p-12 text-center">
            <div className="relative mb-8">
              <Brain className="w-20 h-20 text-blue-400 mx-auto animate-pulse" />
              <div className="absolute inset-0 w-20 h-20 mx-auto border-4 border-blue-400/30 rounded-full animate-ping"></div>
            </div>
            <h3 className="text-3xl font-light text-white mb-6">Finalizing Analysis</h3>
            <p className="text-gray-400 mb-8 text-lg">{processingSteps[currentStep]}</p>
            <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${((currentStep + 1) / processingSteps.length) * 100}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              {Math.round(((currentStep + 1) / processingSteps.length) * 100)}% Complete
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!resultData) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-6">
            <Brain className="w-10 h-10 text-blue-400 mr-3" />
            <h1 className="text-4xl font-light text-white">MusicIQ Assessment Results</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Official certification for <span className="text-blue-400 font-medium">{userName}</span>
          </p>
          <p className="text-sm text-gray-500 mt-2">Based on your actual Spotify listening data</p>
        </div>

        <div className={`transition-all duration-1000 ${showResults ? "opacity-100" : "opacity-0"}`}>
          {/* Main Score Card */}
          <Card
            className={`max-w-3xl mx-auto mb-12 bg-gradient-to-r ${getResultTheme(resultData.score)} border-2 shadow-2xl`}
          >
            <CardContent className="p-12 text-center">
              <div className="mb-6">{getResultIcon(resultData.score)}</div>
              <h2 className="text-5xl font-bold mb-4" style={{ color: resultData.score >= 50 ? "#60a5fa" : "#f87171" }}>
                {resultData.title}
              </h2>
              <div className="text-8xl font-black text-white mb-4">{resultData.score}/100</div>
              <p className="text-2xl mb-6" style={{ color: resultData.score >= 50 ? "#93c5fd" : "#fca5a5" }}>
                {resultData.subtitle}
              </p>
              <div
                className={`p-6 rounded-xl border-2 ${resultData.score >= 50 ? "bg-blue-950/50 border-blue-600" : "bg-red-950/50 border-red-600"}`}
              >
                <p className="text-lg font-semibold text-white mb-2">Classification: {resultData.classification}</p>
                <p className="text-gray-200">{resultData.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Real Data Display */}
          {resultData.realData && (
            <Card className="max-w-3xl mx-auto mb-8 bg-slate-800/30 border-slate-700/50 backdrop-blur-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
                  <Music className="w-6 h-6 text-cyan-400 mr-2" />
                  Your Actual Spotify Data
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-400 text-sm">Top Artist</p>
                      <p className="text-white font-semibold">{resultData.realData.topArtist}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Most Played Track</p>
                      <p className="text-white font-semibold">{resultData.realData.topTrack}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-400 text-sm">Dominant Genre</p>
                      <p className="text-white font-semibold">{resultData.realData.topGenre}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Diversity Score</p>
                      <p className="text-white font-semibold">{resultData.realData.diversityScore}%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Detailed Breakdown */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
                  <Brain className="w-6 h-6 text-blue-400 mr-2" />
                  Detailed Analysis
                </h3>
                <div className="space-y-4">
                  {Object.entries(resultData.breakdown).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-gray-300 capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                      <div className="flex items-center">
                        <div className="w-24 bg-slate-700 rounded-full h-2 mr-3">
                          <div
                            className={`h-2 rounded-full ${value >= 7 ? "bg-green-500" : value >= 4 ? "bg-yellow-500" : "bg-red-500"}`}
                            style={{ width: `${(value / 10) * 100}%` }}
                          ></div>
                        </div>
                        <span
                          className={`font-bold ${value >= 7 ? "text-green-400" : value >= 4 ? "text-yellow-400" : "text-red-400"}`}
                        >
                          {value}/10
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
                  <AlertTriangle className="w-6 h-6 text-yellow-400 mr-2" />
                  Official Verdict
                </h3>
                <div className="space-y-4">
                  <blockquote className="text-lg text-gray-300 italic border-l-4 border-blue-500 pl-4">
                    "{resultData.verdict}"
                  </blockquote>
                  <div className="bg-slate-900/50 p-4 rounded-lg">
                    <p className="text-sm text-gray-400 mb-2">AI Recommendation:</p>
                    <p className="text-white">{resultData.recommendation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Image Preview */}
          {resultImage && (
            <Card className="max-w-2xl mx-auto mb-8 bg-slate-800/30 border-slate-700/50 backdrop-blur-xl">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4 text-center">Shareable Result</h3>
                <img
                  src={resultImage || "/placeholder.svg"}
                  alt="MusicIQ Result"
                  className="w-full rounded-lg border border-slate-600"
                />
              </CardContent>
            </Card>
          )}

          {/* Enhanced Action Buttons */}
          <div className="text-center space-y-8">
            {/* Generate Image Button */}
            {!resultImage && (
              <div className="mb-6">
                <Button
                  onClick={handleGenerateImage}
                  disabled={isGeneratingImage}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 text-lg rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50"
                >
                  {isGeneratingImage ? (
                    <>
                      <Brain className="w-5 h-5 mr-2 animate-spin" />
                      Generating Image...
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-5 h-5 mr-2" />
                      Create Shareable Image
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Sharing Options */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <Button
                onClick={() => handleShare("download")}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Image
              </Button>

              <Button
                onClick={() => handleShare("copy")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy to Clipboard
              </Button>

              <Button
                onClick={() => handleShare("twitter")}
                className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <Share className="w-4 h-4 mr-2" />
                Share on Twitter
              </Button>

              <Button
                onClick={() => handleShare("instagram")}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <Share className="w-4 h-4 mr-2" />
                Instagram Story
              </Button>
            </div>

            {/* Certificate Download */}
            <div className="mt-8">
              <Button
                onClick={handleDownloadCertificate}
                className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-bold py-4 px-8 text-lg rounded-xl transition-all duration-300 hover:scale-105"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Official Certificate
              </Button>
            </div>

            {/* Navigation */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link href="/">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 text-lg rounded-xl transition-all duration-300 hover:scale-105">
                  Analyze Another Person
                </Button>
              </Link>
            </div>
          </div>

          {/* Enhanced Disclaimer */}
          <div className="text-center mt-16 max-w-3xl mx-auto">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
              <CardContent className="p-8">
                <h4 className="text-xl font-semibold text-white mb-4">The Truth Revealed</h4>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  <strong className="text-red-400">Plot Twist:</strong> This was never a real AI analysis. We just
                  wanted to see how you'd react to having your ACTUAL music taste evaluated by fake neural networks. 🤖
                </p>
                <p className="text-sm text-gray-400">
                  (But hey, we did use your real Spotify data, so maybe consider exploring some new genres anyway? Your{" "}
                  {resultData.score < 50
                    ? "playlist could definitely use some help"
                    : "taste isn't completely terrible"}{" "}
                  😉)
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
