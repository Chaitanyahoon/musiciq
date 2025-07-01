"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const verdictData = {
  score: 12,
  title: "Musical Criminal",
  subtitle: "Genre Goblin | Plays 5 sad songs daily",
  roasts: [
    "Spotify sent your data to the FBI 🚨",
    "Your playlist is a crime against humanity 💀",
    "Even shuffle mode gave up on you 🔀",
    "Your taste is so bad, it's actually impressive 🏆",
  ],
  certificate: {
    name: "Anonymous Music Victim",
    crimeLevel: "Maximum Security",
    sentence: "Life without parole (or good music)",
  },
}

export default function Verdict() {
  const [showConfetti, setShowConfetti] = useState(false)
  const [currentRoast, setCurrentRoast] = useState(0)

  useEffect(() => {
    setShowConfetti(true)

    const roastInterval = setInterval(() => {
      setCurrentRoast((prev) => (prev + 1) % verdictData.roasts.length)
    }, 3000)

    return () => clearInterval(roastInterval)
  }, [])

  const handleShare = (platform: string) => {
    const shareText = `I got judged by Vibe Audit and scored ${verdictData.score}% 💀 My music taste is officially criminal! #VibeAudit #MusicalCriminal`

    if (platform === "twitter") {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, "_blank")
    } else if (platform === "instagram") {
      // Instagram doesn't support direct sharing, so we'll copy to clipboard
      navigator.clipboard.writeText(shareText)
      alert("Copied to clipboard! Share on Instagram Stories 📱")
    }
  }

  const downloadCertificate = () => {
    // In a real app, this would generate and download an image
    alert("Certificate downloaded! (In a real app, this would generate a shareable image) 📸")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-900 to-black text-white relative overflow-hidden">
      {/* Animated background elements */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 text-4xl animate-bounce">💀</div>
          <div className="absolute top-20 right-20 text-3xl animate-pulse">🤡</div>
          <div className="absolute bottom-20 left-20 text-5xl animate-spin">🚨</div>
          <div className="absolute bottom-10 right-10 text-4xl animate-bounce">🏆</div>
          <div className="absolute top-1/2 left-1/4 text-2xl animate-ping">💔</div>
          <div className="absolute top-1/3 right-1/3 text-3xl animate-pulse">🎭</div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-7xl font-black mb-4 bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent animate-pulse">
            FINAL VERDICT
          </h1>
          <p className="text-xl text-gray-300">The moment of truth has arrived... 💀</p>
        </div>

        {/* Main Certificate Card */}
        <Card className="max-w-4xl mx-auto mb-8 bg-gradient-to-br from-red-900/80 to-black/80 border-4 border-red-500 shadow-2xl shadow-red-500/20">
          <CardContent className="p-8 md:p-12">
            {/* Certificate Header */}
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🏆</div>
              <h2 className="text-3xl md:text-5xl font-black text-red-400 mb-2">VIBE CERTIFICATE</h2>
              <p className="text-lg text-gray-300">Official Document of Musical Crimes</p>
            </div>

            {/* Score Display */}
            <div className="text-center mb-8 p-6 bg-black/50 rounded-lg border-2 border-red-400">
              <div className="text-8xl md:text-9xl font-black text-red-500 mb-2">{verdictData.score}%</div>
              <Badge className="text-xl px-4 py-2 bg-red-600 text-white mb-2">{verdictData.title}</Badge>
              <p className="text-lg text-gray-300">{verdictData.subtitle}</p>
            </div>

            {/* Certificate Details */}
            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 p-6 rounded-lg border-2 border-purple-500 mb-8">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-purple-400 mb-4">OFFICIAL CHARGES</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-gray-300">Defendant:</p>
                  <p className="text-xl font-bold text-white">{verdictData.certificate.name}</p>
                </div>
                <div>
                  <p className="text-gray-300">Crime Level:</p>
                  <p className="text-xl font-bold text-red-400">{verdictData.certificate.crimeLevel}</p>
                </div>
              </div>

              <div className="text-center mt-4">
                <p className="text-gray-300">Sentence:</p>
                <p className="text-lg font-bold text-yellow-400">{verdictData.certificate.sentence}</p>
              </div>
            </div>

            {/* Rotating Roasts */}
            <div className="text-center mb-8 p-6 bg-yellow-900/30 rounded-lg border-2 border-yellow-500">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">OFFICIAL STATEMENT</h3>
              <p className="text-2xl font-bold text-white animate-pulse">{verdictData.roasts[currentRoast]}</p>
            </div>

            {/* Signature */}
            <div className="text-center text-gray-400 text-sm">
              <p>Signed by: The Vibe Audit Committee</p>
              <p>Date: {new Date().toLocaleDateString()}</p>
              <p className="mt-2 italic">"Your music taste is now a matter of public record"</p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="text-center space-y-6">
          {/* Share Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => handleShare("twitter")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full border-2 border-blue-400 transition-all duration-300 hover:scale-105"
            >
              🐦 Share on X/Twitter
            </Button>

            <Button
              onClick={() => handleShare("instagram")}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-full border-2 border-purple-400 transition-all duration-300 hover:scale-105"
            >
              📸 Share on Instagram
            </Button>

            <Button
              onClick={downloadCertificate}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full border-2 border-green-400 transition-all duration-300 hover:scale-105"
            >
              💾 Download Certificate
            </Button>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/">
              <Button className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold py-4 px-8 text-xl rounded-full border-2 border-red-400 transition-all duration-300 hover:scale-105">
                🔄 Get Judged Again
              </Button>
            </Link>

            <Link href="/dashboard">
              <Button
                variant="outline"
                className="border-gray-500 text-gray-300 hover:bg-gray-800 py-4 px-8 bg-transparent"
              >
                📊 Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-12 p-6 bg-black/50 rounded-lg border border-gray-700">
          <p className="text-lg text-gray-300 mb-2">🎉 Congratulations! You've officially been roasted by AI 🎉</p>
          <p className="text-sm text-gray-400">
            Remember: This is all in good fun. Your music taste is probably fine... probably. 😅
          </p>
        </div>
      </div>
    </div>
  )
}
