// Hidden roasting logic - users won't see this until after data fetch
interface SpotifyData {
  topArtists: Array<{ name: string; plays: number }>
  topTracks: Array<{ name: string; artist: string }>
  topGenre: string
  listeningHabits: {
    skipRate: number
    repeatSongs: string[]
    diversityScore: number
  }
}

interface RoastResult {
  artistRoasts: Array<{ artist: string; roast: string }>
  genreRoast: string
  overallRoast: string
  vibeScore: number
}

export class RoastEngine {
  private artistRoasts = {
    // Artist-specific roasts (hidden from user until triggered)
    "Ed Sheeran": [
      "Your Spotify Wrapped is a beige wall.",
      "Mathematical equations aren't personality traits.",
      "Even your calculator has better taste.",
    ],
    "Taylor Swift": [
      "You're 30 but emotionally stuck at 16.",
      "Your diary isn't a music genre.",
      "Even your ex moved on from this playlist.",
    ],
    Drake: [
      "Started from the bottom, still there musically.",
      "Your feelings have feelings about this choice.",
      "Even Toronto is embarrassed.",
    ],
    // ... more hidden roasts
  }

  private genreRoasts = {
    Pop: [
      "You're the human equivalent of a TikTok dance.",
      "Mainstream isn't a personality.",
      "Your taste is as basic as your coffee order.",
    ],
    Hyperpop: [
      "Do you enjoy sonic violence?",
      "Your ears filed a restraining order.",
      "This isn't music, it's a cry for help.",
    ],
    // ... more hidden genre roasts
  }

  generateRoast(spotifyData: SpotifyData): RoastResult {
    // Complex roasting algorithm that analyzes user data
    // and generates personalized burns

    const artistRoasts = spotifyData.topArtists.map((artist) => ({
      artist: artist.name,
      roast: this.getRandomRoast(this.artistRoasts[artist.name] || ["Generic bad taste detected."]),
    }))

    const genreRoast = this.getRandomRoast(
      this.genreRoasts[spotifyData.topGenre] || ["Your genre choice is questionable."],
    )

    // Calculate vibe score based on various factors
    const vibeScore = this.calculateVibeScore(spotifyData)

    return {
      artistRoasts,
      genreRoast,
      overallRoast: this.generateOverallRoast(spotifyData, vibeScore),
      vibeScore,
    }
  }

  private getRandomRoast(roasts: string[]): string {
    return roasts[Math.floor(Math.random() * roasts.length)]
  }

  private calculateVibeScore(data: SpotifyData): number {
    // Secret scoring algorithm
    let score = 100

    // Deduct points for various "crimes"
    if (data.topGenre === "Pop") score -= 30
    if (data.listeningHabits.diversityScore < 0.3) score -= 25
    if (data.listeningHabits.skipRate > 0.7) score -= 20

    return Math.max(score, 1) // Never go below 1%
  }

  private generateOverallRoast(data: SpotifyData, score: number): string {
    if (score < 20) return "Spotify sent your data to the FBI."
    if (score < 40) return "Your playlist is a crime against humanity."
    if (score < 60) return "Even shuffle mode gave up on you."
    return "Your taste is so bad, it's actually impressive."
  }
}
