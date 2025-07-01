"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RoastEngine } from "@/lib/roast-engine"
import Link from "next/link"

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [roastData, setRoastData] = useState<any>(null)
  const [vibeScore, setVibeScore] = useState(90)

  useEffect(() => {
    // Simulate fetching Spotify data and generating roasts
    const fetchAndRoast = async () => {
      // In real app: fetch actual Spotify data
      // const spotifyData = await fetchSpotifyUserData()

      // Mock data for demo
      const mockSpotifyData = {
        topArtists: [
          { name: "Ed Sheeran", plays: 1247 },
          { name: "Taylor Swift", plays: 892 },
          { name: "The Weeknd", plays: 743 },
        ],
        topTracks: [
          { name: "Shape of You", artist: "Ed Sheeran" },
          { name: "Anti-Hero", artist: "Taylor Swift" },
        ],
        topGenre: "Pop",
        listeningHabits: {
          skipRate: 0.8,
          repeatSongs: ["Shape of You"],
          diversityScore: 0.2,
        },
      }

      // Generate roasts based on actual data
      const roastEngine = new RoastEngine()
      const roasts = roastEngine.generateRoast(mockSpotifyData)

      setRoastData(roasts)
      setVibeScore(roasts.vibeScore)
      setIsLoading(false)
    }

    setTimeout(fetchAndRoast, 2000) // Simulate API delay
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-red-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl animate-spin mb-4">🎵</div>
          <h2 className="text-3xl font-bold mb-4">Analyzing Your Trash Taste...</h2>
          <p className="text-xl text-gray-300">Connecting to Spotify and preparing roasts... 💀</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            VIBE AUDIT RESULTS
          </h1>
          <p className="text-xl text-gray-300">The verdict is in... 💀</p>
        </div>

        {/* Vibe Score */}
        <Card className="mb-8 bg-gradient-to-r from-red-900/50 to-pink-900/50 border-2 border-red-500">
          <CardHeader>
            <CardTitle className="text-center text-2xl text-red-400">🔥 VIBE SCORE 🔥</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <span className="text-6xl font-black text-white">{vibeScore}%</span>
              <p className="text-lg text-gray-300 mt-2">
                {vibeScore > 70
                  ? "Not terrible... yet 😏"
                  : vibeScore > 40
                    ? "Yikes. This is rough. 😬"
                    : "Musical Criminal Detected 🚨"}
              </p>
            </div>
            <Progress value={vibeScore} className="h-4" />
          </CardContent>
        </Card>

        {/* Roast Results - Only shown after data fetch */}
        {roastData && (
          <>
            <Card className="mb-8 bg-purple-900/30 border-2 border-purple-500">
              <CardHeader>
                <CardTitle className="text-purple-400">Genre Analysis 🎭</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-bold text-white">{roastData.genreRoast}</p>
              </CardContent>
            </Card>

            <Card className="mb-8 bg-yellow-900/30 border-2 border-yellow-500">
              <CardHeader>
                <CardTitle className="text-yellow-400">Artist Breakdown 🤡</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {roastData.artistRoasts.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-gray-700"
                    >
                      <div className="flex items-center space-x-4">
                        <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                          #{index + 1}
                        </Badge>
                        <h4 className="font-bold text-white">{item.artist}</h4>
                      </div>
                      <div className="text-right max-w-md">
                        <p className="text-sm text-gray-300">{item.roast}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8 bg-red-900/30 border-2 border-red-500">
              <CardHeader>
                <CardTitle className="text-red-400">Final Judgment 💀</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-white text-center">{roastData.overallRoast}</p>
              </CardContent>
            </Card>
          </>
        )}

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <Link href="/quiz">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 text-xl rounded-full border-2 border-purple-400 transition-all duration-300 hover:scale-105">
              Take the Judgement Quiz 🧠
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
