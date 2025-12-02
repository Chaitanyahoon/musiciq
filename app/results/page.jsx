"use client"

import { useState, useEffect } from "react"
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
  Activity
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
    if (score >= 90) return <Trophy className="w-20 h-20 text-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.8)]" />
    if (score >= 80) return <Award className="w-20 h-20 text-blue-400 drop-shadow-[0_0_20px_rgba(96,165,250,0.8)]" />
    if (score >= 65) return <Brain className="w-20 h-20 text-purple-400 drop-shadow-[0_0_20px_rgba(192,132,252,0.8)]" />
    if (score >= 50) return <Activity className="w-20 h-20 text-green-400 drop-shadow-[0_0_20px_rgba(74,222,128,0.8)]" />
    if (score >= 35) return <AlertTriangle className="w-20 h-20 text-gray-400 drop-shadow-[0_0_20px_rgba(156,163,175,0.8)]" />
    if (score >= 20) return <TrendingDown className="w-20 h-20 text-orange-400 drop-shadow-[0_0_20px_rgba(251,146,60,0.8)]" />
    return <Skull className="w-20 h-20 text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]" />
  }

  const getScoreColor = (score) => {
    if (score >= 80) return "text-yellow-400 text-glow-yellow"
    if (score >= 65) return "text-purple-400 text-glow"
    if (score >= 50) return "text-green-400 text-glow-green"
    if (score >= 35) return "text-gray-400"
    if (score >= 20) return "text-orange-400 text-glow-pink"
    return "text-red-500 text-glow-pink"
  }

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] animate-pulse-glow"></div>
        </div>

        <div className="glass-panel max-w-2xl mx-4 border-primary/30 animate-in zoom-in duration-500">
          <div className="p-12 text-center">
            <div className="relative mb-8">
              <Brain className="w-20 h-20 text-primary mx-auto animate-pulse drop-shadow-[0_0_20px_rgba(139,92,246,0.6)]" />
              <div className="absolute inset-0 w-20 h-20 mx-auto border-4 border-primary/30 rounded-full animate-ping"></div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-6 text-glow">Finalizing Analysis</h3>
            <p className="text-gray-300 mb-8 text-lg font-light tracking-wide">{processingSteps[currentStep]}</p>
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-primary via-secondary to-accent h-2 rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                style={{ width: `${((currentStep + 1) / processingSteps.length) * 100}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4 font-mono tracking-widest">
              {Math.round(((currentStep + 1) / processingSteps.length) * 100)}% COMPLETE
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (!resultData) return null

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16 animate-in slide-in-from-top-10 duration-700">
          <div className="flex justify-center items-center mb-6">
            <Brain className="w-8 h-8 md:w-12 md:h-12 text-primary mr-3 md:mr-4 drop-shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight text-glow">MusicIQ Assessment Results</h1>
          </div>
          <p className="text-gray-300 text-lg md:text-xl font-light">
            Official certification for <span className="text-primary font-bold text-glow">{userName}</span>
          </p>
          <p className="text-[10px] text-gray-500 mt-3 font-bold uppercase tracking-[0.2em]">Based on your actual Spotify listening data</p>
        </div>

        <div className={`transition-all duration-1000 ${showResults ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {/* Main Score Card */}
          <div className="glass-panel max-w-4xl mx-auto mb-16 rounded-3xl overflow-hidden border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="p-8 md:p-16 text-center relative z-10">
              <div className="mb-8 transform hover:scale-110 transition-transform duration-500 inline-block">
                {getResultIcon(resultData.score)}
              </div>

              <h2 className={`text-4xl md:text-6xl font-black mb-4 md:mb-6 tracking-tight ${getScoreColor(resultData.score)}`}>
                {resultData.title}
              </h2>

              <div className="text-7xl md:text-9xl font-black text-white mb-4 md:mb-6 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] tracking-tighter">
                {resultData.score}<span className="text-2xl md:text-4xl text-white/30 font-thin ml-2">/100</span>
              </div>

              <p className="text-xl md:text-3xl mb-10 font-bold text-gray-300 drop-shadow-md">
                {resultData.subtitle}
              </p>

              <div className="glass-card p-8 rounded-2xl max-w-2xl mx-auto border-white/10">
                <p className="text-sm font-bold text-accent mb-3 uppercase tracking-[0.2em] text-glow-cyan">Classification: {resultData.classification}</p>
                <p className="text-gray-200 text-lg leading-relaxed font-light">{resultData.description}</p>
              </div>
            </div>
          </div>

          {/* Real Data Display */}
          {resultData.realData && (
            <div className="glass-panel max-w-4xl mx-auto mb-12 rounded-2xl border-white/10">
              <div className="p-8 md:p-10">
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center border-b border-white/10 pb-4">
                  <Music className="w-6 h-6 text-accent mr-3 drop-shadow-[0_0_10px_#06b6d4]" />
                  Your Actual Spotify Data
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  <div className="space-y-8">
                    <div>
                      <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Top Artist</p>
                      <p className="text-white font-bold text-2xl tracking-tight">{resultData.realData.topArtist}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Most Played Track</p>
                      <p className="text-white font-bold text-2xl tracking-tight">{resultData.realData.topTrack}</p>
                    </div>
                  </div>
                  <div className="space-y-8">
                    <div>
                      <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Dominant Genre</p>
                      <p className="text-white font-bold text-2xl tracking-tight capitalize">{resultData.realData.topGenre}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Diversity Score</p>
                      <div className="flex items-center">
                        <div className="flex-1 h-2 bg-white/10 rounded-full mr-4 overflow-hidden">
                          <div className="h-full bg-accent shadow-[0_0_10px_#06b6d4]" style={{ width: `${resultData.realData.diversityScore}%` }}></div>
                        </div>
                        <p className="text-accent font-bold text-xl text-glow-cyan">{resultData.realData.diversityScore}%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Detailed Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto mb-16">
            <div className="glass-panel rounded-2xl border-white/10 h-full">
              <div className="p-8 md:p-10">
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center border-b border-white/10 pb-4">
                  <Brain className="w-6 h-6 text-primary mr-3 drop-shadow-[0_0_10px_#8b5cf6]" />
                  Detailed Analysis
                </h3>
                <div className="space-y-6">
                  {Object.entries(resultData.breakdown).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center group">
                      <span className="text-gray-400 capitalize font-medium text-sm tracking-wide group-hover:text-white transition-colors">{key.replace(/([A-Z])/g, " $1")}</span>
                      <div className="flex items-center">
                        <div className="w-32 bg-white/5 rounded-full h-1.5 mr-4 overflow-hidden">
                          <div
                            className={`h-full rounded-full shadow-[0_0_10px_currentColor] transition-all duration-1000 ${value >= 7 ? "bg-green-500 text-green-500" : value >= 4 ? "bg-yellow-500 text-yellow-500" : "bg-red-500 text-red-500"}`}
                            style={{ width: `${(value / 10) * 100}%` }}
                          ></div>
                        </div>
                        <span
                          className={`font-bold text-lg w-8 text-right ${value >= 7 ? "text-green-400" : value >= 4 ? "text-yellow-400" : "text-red-400"}`}
                        >
                          {value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-2xl border-white/10 h-full">
              <div className="p-8 md:p-10">
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center border-b border-white/10 pb-4">
                  <AlertTriangle className="w-6 h-6 text-yellow-400 mr-3 drop-shadow-[0_0_10px_#facc15]" />
                  Official Verdict
                </h3>
                <div className="space-y-8 h-full flex flex-col justify-between">
                  <blockquote className="text-xl text-gray-200 italic border-l-2 border-primary pl-6 py-2 leading-relaxed font-light">
                    "{resultData.verdict}"
                  </blockquote>
                  <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                    <p className="text-[10px] text-gray-400 mb-3 font-bold uppercase tracking-[0.2em]">AI Recommendation:</p>
                    <p className="text-white font-medium text-lg">{resultData.recommendation}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Preview */}
          {resultImage && (
            <div className="glass-panel max-w-3xl mx-auto mb-12 rounded-2xl border-white/10">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6 text-center text-glow">Shareable Result</h3>
                <img
                  src={resultImage || "/placeholder.svg"}
                  alt="MusicIQ Result"
                  className="w-full rounded-xl border border-white/10 shadow-2xl"
                />
              </div>
            </div>
          )}

          {/* Enhanced Action Buttons */}
          <div className="flex flex-col items-center justify-center space-y-8 mb-16 w-full">
            {/* Generate Image Button */}
            {!resultImage && (
              <div className="w-full flex justify-center">
                <Button
                  onClick={handleGenerateImage}
                  disabled={isGeneratingImage}
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white font-bold py-8 px-12 text-xl rounded-full transition-all duration-300 hover:scale-105 disabled:opacity-50 shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_50px_rgba(139,92,246,0.5)] uppercase tracking-widest"
                >
                  {isGeneratingImage ? (
                    <>
                      <Brain className="w-6 h-6 mr-3 animate-spin" />
                      Generating Image...
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-6 h-6 mr-3" />
                      Create Shareable Image
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Sharing Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl px-4">
              <Button
                onClick={() => handleShare("download")}
                className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-6 rounded-xl transition-all duration-300 hover:scale-105 border border-white/10 backdrop-blur-md flex items-center justify-center"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Image
              </Button>

              <Button
                onClick={() => handleShare("copy")}
                className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-6 rounded-xl transition-all duration-300 hover:scale-105 border border-white/10 backdrop-blur-md flex items-center justify-center"
              >
                <Copy className="w-5 h-5 mr-2" />
                Copy to Clipboard
              </Button>

              <Button
                onClick={() => handleShare("twitter")}
                className="w-full bg-[#1DA1F2]/20 hover:bg-[#1DA1F2]/40 text-[#1DA1F2] font-bold py-6 rounded-xl transition-all duration-300 hover:scale-105 border border-[#1DA1F2]/30 backdrop-blur-md flex items-center justify-center"
              >
                <Share className="w-5 h-5 mr-2" />
                Share on Twitter
              </Button>

              <Button
                onClick={() => handleShare("instagram")}
                className="w-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 hover:from-purple-600/40 hover:to-pink-600/40 text-pink-400 font-bold py-6 rounded-xl transition-all duration-300 hover:scale-105 border border-pink-500/30 backdrop-blur-md flex items-center justify-center"
              >
                <Share className="w-5 h-5 mr-2" />
                Instagram Story
              </Button>
            </div>

            {/* Certificate Download */}
            <div className="mt-12 w-full flex justify-center">
              <Button
                onClick={handleDownloadCertificate}
                className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-bold py-8 px-12 text-xl rounded-full transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(234,88,12,0.3)] uppercase tracking-widest flex items-center"
              >
                <Award className="w-6 h-6 mr-3" />
                Download Official Certificate
              </Button>
            </div>

            {/* Navigation */}
            <div className="mt-12 w-full flex justify-center">
              <Link href="/">
                <Button className="bg-white text-black hover:bg-gray-200 font-bold py-6 px-10 text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)] uppercase tracking-widest">
                  Analyze Another Person
                </Button>
              </Link>
            </div>
          </div>

          {/* Enhanced Disclaimer */}
          <div className="text-center mt-20 max-w-4xl mx-auto pb-12">
            <div className="glass-panel p-10 rounded-2xl border-white/5">
              <h4 className="text-2xl font-bold text-white mb-4 text-glow">The Truth Revealed</h4>
              <p className="text-gray-300 mb-6 leading-relaxed text-lg font-light">
                <strong className="text-red-500 text-glow-pink">Plot Twist:</strong> This was never a real AI analysis. We just
                wanted to see how you'd react to having your ACTUAL music taste evaluated by fake neural networks. 🤖
              </p>
              <p className="text-sm text-gray-500 font-medium tracking-wide">
                (But hey, we did use your real Spotify data, so maybe consider exploring some new genres anyway? Your{" "}
                {resultData.score < 50
                  ? "playlist could definitely use some help"
                  : "taste isn't completely terrible"}{" "}
                😉)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
