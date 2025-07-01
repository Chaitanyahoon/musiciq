// Real Spotify API integration
class SpotifyAPI {
  constructor() {
    this.baseURL = "https://api.spotify.com/v1"
  }

  async getAccessToken() {
    const token = localStorage.getItem("spotify_access_token")
    const expiresAt = localStorage.getItem("spotify_expires_at")

    if (!token || Date.now() >= Number.parseInt(expiresAt)) {
      // Token expired, try to refresh
      const refreshToken = localStorage.getItem("spotify_refresh_token")
      if (refreshToken) {
        return await this.refreshAccessToken(refreshToken)
      }
      throw new Error("No valid access token")
    }

    return token
  }

  async refreshAccessToken(refreshToken) {
    try {
      const response = await fetch("/api/spotify/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refreshToken }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error)

      localStorage.setItem("spotify_access_token", data.access_token)
      localStorage.setItem("spotify_expires_at", Date.now() + data.expires_in * 1000)

      return data.access_token
    } catch (error) {
      // Refresh failed, redirect to login
      window.location.href = "/"
      throw error
    }
  }

  async makeRequest(endpoint) {
    const token = await this.getAccessToken()
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      if (response.status === 401) {
        // Token invalid, redirect to login
        localStorage.clear()
        window.location.href = "/"
        return
      }
      throw new Error(`Spotify API error: ${response.status}`)
    }

    return await response.json()
  }

  // Get user profile
  async getUserProfile() {
    return await this.makeRequest("/me")
  }

  // Get user's top artists
  async getTopArtists(timeRange = "medium_term", limit = 20) {
    return await this.makeRequest(`/me/top/artists?time_range=${timeRange}&limit=${limit}`)
  }

  // Get user's top tracks
  async getTopTracks(timeRange = "medium_term", limit = 20) {
    return await this.makeRequest(`/me/top/tracks?time_range=${timeRange}&limit=${limit}`)
  }

  // Get recently played tracks
  async getRecentlyPlayed(limit = 50) {
    return await this.makeRequest(`/me/player/recently-played?limit=${limit}`)
  }

  // Get user's playlists
  async getUserPlaylists(limit = 20) {
    return await this.makeRequest(`/me/playlists?limit=${limit}`)
  }

  // Get audio features for tracks
  async getAudioFeatures(trackIds) {
    const ids = Array.isArray(trackIds) ? trackIds.join(",") : trackIds
    return await this.makeRequest(`/audio-features?ids=${ids}`)
  }

  // Get user's saved tracks
  async getSavedTracks(limit = 50) {
    return await this.makeRequest(`/me/tracks?limit=${limit}`)
  }
}

export const spotifyAPI = new SpotifyAPI()

// Analyze user's music data
export const analyzeSpotifyData = async () => {
  try {
    const [profile, topArtists, topTracks, recentTracks, playlists] = await Promise.all([
      spotifyAPI.getUserProfile(),
      spotifyAPI.getTopArtists("medium_term", 20),
      spotifyAPI.getTopTracks("medium_term", 20),
      spotifyAPI.getRecentlyPlayed(50),
      spotifyAPI.getUserPlaylists(20),
    ])

    // Get audio features for top tracks
    const trackIds = topTracks.items.map((track) => track.id)
    const audioFeatures = await spotifyAPI.getAudioFeatures(trackIds)

    // Analyze the data
    const analysis = {
      profile,
      topArtists: topArtists.items,
      topTracks: topTracks.items,
      recentTracks: recentTracks.items,
      playlists: playlists.items,
      audioFeatures: audioFeatures.audio_features,
    }

    return processAnalysis(analysis)
  } catch (error) {
    console.error("Error analyzing Spotify data:", error)
    throw error
  }
}

// Process and analyze the raw Spotify data
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
  const uniqueArtists = new Set(topTracks.map((track) => track.artists[0].id)).size
  const diversityScore = uniqueArtists / topTracks.length

  // Calculate repeat listening patterns
  const trackCounts = {}
  recentTracks.forEach((item) => {
    const trackId = item.track.id
    trackCounts[trackId] = (trackCounts[trackId] || 0) + 1
  })

  const repeatTracks = Object.entries(trackCounts)
    .filter(([, count]) => count > 2)
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
      const track = recentTracks.find((item) => item.track.id === trackId)?.track
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

  const recentCount = recentTracks.filter((item) => new Date(item.played_at) > oneDayAgo).length

  // Assume average track length of 3.5 minutes
  const estimatedMinutes = recentCount * 3.5
  const hours = Math.round((estimatedMinutes / 60) * 10) / 10

  return `${hours} hours`
}
