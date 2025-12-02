"use client"

import { useState, useEffect } from "react"
import { Brain, Music, Loader2, Activity, Database, Server } from "lucide-react"
import { spotifyService } from "@/lib/services/spotify.js"
import { youtubeMusicService } from "@/lib/services/youtube.js"
import { appleMusicService } from "@/lib/services/apple.js"

const analysisSteps = [
  "Connecting to Music API...",
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
  const [musicData, setMusicData] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    const runAnalysis = async () => {
      try {
        const serviceName = localStorage.getItem("connectedService") || "spotify"
        let service

        if (serviceName === "youtube") {
          service = youtubeMusicService
        } else if (serviceName === "apple") {
          service = appleMusicService
        } else {
          service = spotifyService
        }

        // Start the analysis process
        const analysisPromise = (async () => {
          const [profile, topArtists, topTracks, recentTracks, playlists] = await Promise.all([
            service.getProfile(),
            service.getTopArtists(),
            service.getTopTracks(),
            service.getRecentTracks(),
            service.getPlaylists(),
          ])

          // Get audio features for top tracks
          const trackIds = topTracks.map((track) => track.id)
          const audioFeatures = await service.getAudioFeatures(trackIds)

          // Analyze the data
          const analysis = {
            profile,
            topArtists,
            topTracks,
            recentTracks,
            playlists,
            audioFeatures: audioFeatures.audio_features,
          }

          return processAnalysis(analysis)
        })()

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
        setMusicData(data)

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
        setError(err.message || "Failed to analyze music data")
        console.error("Analysis error:", err)
      }
    }

    runAnalysis()
  }, [])

  useEffect(() => {
    if (showThinking && musicData) {
      const thinkingTexts = [
        `Analyzing ${musicData.topArtists[0]?.name || "your top artist"} listening patterns...`,
        `Processing "${musicData.topTracks[0]?.name || "your favorite track"}" audio features...`,
        `Evaluating ${musicData.topGenres[0] || "your main genre"} sophistication level...`,
        `Calculating diversity score: ${Math.round(musicData.diversityScore * 100)}%...`,
        `Analyzing ${musicData.totalTracks} tracks for patterns...`,
        `Processing ${musicData.listeningTime} of daily consumption...`,
        `Evaluating repeat listening behaviors...`,
        `Cross-referencing with 50M+ user profiles...`,
      ]

      const thinkingInterval = setInterval(() => {
        const randomText = thinkingTexts[Math.floor(Math.random() * thinkingTexts.length)]
        setThinkingText(randomText)
      }, 2000)

      return () => clearInterval(thinkingInterval)
    }
  }, [showThinking, musicData])

  if (error) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <div className="glass-panel max-w-lg mx-4 border-red-500/30">
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-4 text-glow-pink">Analysis Failed</h2>
            <p className="text-gray-300 mb-6">{error}</p>
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors font-medium shadow-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] animate-pulse-glow"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] animate-pulse-glow delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="glass-panel max-w-3xl mx-auto rounded-3xl overflow-hidden">
          <div className="p-6 md:p-12">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex justify-center items-center mb-6">
                <Brain className="w-8 h-8 md:w-12 md:h-12 text-primary mr-3 md:mr-4 animate-pulse drop-shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
                <h1 className="text-2xl md:text-4xl font-bold text-white tracking-tight text-glow">MusicIQ Analysis</h1>
              </div>
              <p className="text-gray-400 text-lg font-light tracking-wide">AI is processing your music data...</p>
            </div>

            {/* Main Analysis Display */}
            <div className="text-center mb-12">
              <div className="relative mb-12 h-48 flex items-center justify-center">
                {/* Custom Cyber Loader */}
                <div className="relative w-32 h-32 md:w-40 md:h-40">
                  <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                  <div className="absolute inset-4 border-4 border-accent/20 rounded-full"></div>
                  <div className="absolute inset-4 border-4 border-t-transparent border-r-accent border-b-transparent border-l-transparent rounded-full animate-spin reverse duration-1000"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="w-12 h-12 text-white animate-pulse" />
                  </div>
                </div>

                {/* Orbiting Particles */}
                <div className="absolute w-64 h-64 border border-white/5 rounded-full animate-[spin_10s_linear_infinite]">
                  <div className="absolute top-0 left-1/2 w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_#8b5cf6]"></div>
                </div>
                <div className="absolute w-48 h-48 border border-white/5 rounded-full animate-[spin_7s_linear_infinite_reverse]">
                  <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-accent rounded-full shadow-[0_0_10px_#06b6d4]"></div>
                </div>
              </div>

              <h2 className="text-lg md:text-2xl font-medium text-white mb-6 h-8 text-glow-cyan">{analysisSteps[currentStep]}</h2>

              <div className="mb-8 max-w-xl mx-auto">
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2 text-xs font-mono text-gray-500">
                  <span>INITIALIZING</span>
                  <span>{Math.round(progress)}% COMPLETE</span>
                  <span>PROCESSING</span>
                </div>
              </div>
            </div>

            {/* Real-time Analysis Display */}
            {showThinking && (
              <div className="bg-black/40 rounded-xl p-6 border border-white/10 mb-10 backdrop-blur-md">
                <div className="flex items-center mb-3">
                  <Activity className="w-5 h-5 text-accent mr-3" />
                  <span className="text-sm font-bold text-accent tracking-widest uppercase">Neural Network Activity</span>
                </div>
                <div className="min-h-[40px] flex items-center">
                  <p className="text-gray-300 text-base md:text-lg animate-pulse font-mono" key={thinkingText}>
                    <span className="text-primary mr-2">{">"}</span>
                    {thinkingText}
                  </p>
                </div>
              </div>
            )}

            {/* Status Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-white/10 pt-8">
              <div className="flex flex-col items-center p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="w-2 h-2 bg-green-500 rounded-full mb-3 shadow-[0_0_10px_#22c55e]"></div>
                <div className="flex items-center text-gray-400 text-xs font-bold uppercase tracking-wider">
                  <Server className="w-3 h-3 mr-2" />
                  Service Connected
                </div>
              </div>
              <div className="flex flex-col items-center p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="w-2 h-2 bg-blue-500 rounded-full mb-3 shadow-[0_0_10px_#3b82f6]"></div>
                <div className="flex items-center text-gray-400 text-xs font-bold uppercase tracking-wider">
                  <Database className="w-3 h-3 mr-2" />
                  Data Retrieved
                </div>
              </div>
              <div className="flex flex-col items-center p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="w-2 h-2 bg-purple-500 rounded-full mb-3 shadow-[0_0_10px_#a855f7]"></div>
                <div className="flex items-center text-gray-400 text-xs font-bold uppercase tracking-wider">
                  <Brain className="w-3 h-3 mr-2" />
                  AI Processing
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Process and analyze the raw music data (reused logic)
const processAnalysis = (data) => {
  const { topArtists, topTracks, recentTracks, audioFeatures } = data

  // Calculate genre distribution
  const genres = {}
  topArtists.forEach((artist) => {
    artist.genres.forEach((genre) => {
      genres[genre] = (genres[genre] || 0) + 1
    })
  })

  const topGenres = Object.entries(genres)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([genre]) => genre)

  // Calculate popularity scores
  const avgPopularity = topTracks.reduce((sum, track) => sum + track.popularity, 0) / topTracks.length

  // Calculate audio feature averages
  const avgFeatures = audioFeatures.reduce(
    (acc, features) => {
      if (features) {
        acc.danceability += features.danceability
        acc.energy += features.energy
        acc.valence += features.valence
        acc.acousticness += features.acousticness
        acc.instrumentalness += features.instrumentalness
        acc.count++
      }
      return acc
    },
    { danceability: 0, energy: 0, valence: 0, acousticness: 0, instrumentalness: 0, count: 0 },
  )

  Object.keys(avgFeatures).forEach((key) => {
    if (key !== "count") {
      avgFeatures[key] = avgFeatures[key] / avgFeatures.count
    }
  })

  // Calculate diversity score
  const uniqueArtists = new Set(topTracks.map((track) => track.artist || track.artists?.[0]?.name)).size
  const diversityScore = uniqueArtists / topTracks.length

  // Calculate repeat listening patterns (simplified for mock)
  const trackCounts = {}
  recentTracks.forEach((item) => {
    const trackId = item.id
    trackCounts[trackId] = (trackCounts[trackId] || 0) + 1
  })

  const repeatTracks = Object.entries(trackCounts)
    .filter(([, count]) => count > 0) // Adjusted for mock data which might not have duplicates
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  return {
    topArtists: topArtists.slice(0, 5),
    topTracks: topTracks.slice(0, 5),
    topGenres,
    avgPopularity,
    avgFeatures,
    diversityScore,
    repeatTracks: repeatTracks.map(([trackId, count]) => {
      const track = recentTracks.find((item) => item.id === trackId)
      return { track, count }
    }),
    totalTracks: topTracks.length,
    totalArtists: topArtists.length,
    listeningTime: calculateListeningTime(recentTracks),
  }
}

const calculateListeningTime = (recentTracks) => {
  // Estimate daily listening time based on recent tracks
  const now = new Date()
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)

  const recentCount = recentTracks.filter((item) => new Date(item.playedAt) > oneDayAgo).length

  // Assume average track length of 3.5 minutes
  const estimatedMinutes = Math.max(recentCount * 3.5, 120) // Ensure at least some time for mock data
  const hours = Math.round((estimatedMinutes / 60) * 10) / 10

  return `${hours} hours`
}
