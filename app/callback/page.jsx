"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, CheckCircle, AlertCircle } from "lucide-react"

export default function SpotifyCallback() {
  const [status, setStatus] = useState("processing")
  const [error, setError] = useState("")

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search)
      const code = urlParams.get("code")
      const error = urlParams.get("error")

      if (error) {
        setStatus("error")
        setError("Spotify authorization was denied. Please try again.")
        return
      }

      if (!code) {
        setStatus("error")
        setError("No authorization code received from Spotify.")
        return
      }

      try {
        // Exchange code for access token
        const response = await fetch("/api/spotify/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Failed to get access token")
        }

        // Store tokens
        localStorage.setItem("spotify_access_token", data.access_token)
        localStorage.setItem("spotify_refresh_token", data.refresh_token)
        localStorage.setItem("spotify_expires_at", Date.now() + data.expires_in * 1000)

        setStatus("success")

        // Redirect to analysis page
        setTimeout(() => {
          window.location.href = "/analysis"
        }, 2000)
      } catch (err) {
        setStatus("error")
        setError(err.message || "Failed to authenticate with Spotify")
      }
    }

    handleCallback()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white flex items-center justify-center">
      <Card className="max-w-lg mx-4 bg-slate-800/30 border-slate-700/50 backdrop-blur-xl">
        <CardContent className="p-12 text-center">
          {status === "processing" && (
            <>
              <Brain className="w-16 h-16 text-blue-400 mx-auto mb-6 animate-pulse" />
              <h2 className="text-2xl font-light text-white mb-4">Connecting to Spotify</h2>
              <p className="text-gray-400">Authenticating your account and preparing analysis...</p>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
              <h2 className="text-2xl font-light text-white mb-4">Successfully Connected!</h2>
              <p className="text-gray-400">Redirecting to analysis...</p>
            </>
          )}

          {status === "error" && (
            <>
              <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-6" />
              <h2 className="text-2xl font-light text-white mb-4">Connection Failed</h2>
              <p className="text-gray-400 mb-6">{error}</p>
              <button
                onClick={() => (window.location.href = "/")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
