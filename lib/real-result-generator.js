// Generate results based on real Spotify analysis
export const generateRealResult = (answers, spotifyData) => {
  let score = 50 // Base score

  // Analyze based on real data
  const { avgPopularity, diversityScore, topGenres, avgFeatures, repeatTracks } = spotifyData

  // Popularity penalty/bonus
  if (avgPopularity > 80) {
    score -= 25 // Very mainstream = penalty
  } else if (avgPopularity > 60) {
    score -= 10 // Somewhat mainstream = small penalty
  } else if (avgPopularity < 30) {
    score += 15 // Underground = bonus
  }

  // Diversity bonus/penalty
  if (diversityScore > 0.8) {
    score += 20 // Very diverse = big bonus
  } else if (diversityScore > 0.6) {
    score += 10 // Somewhat diverse = bonus
  } else if (diversityScore < 0.3) {
    score -= 20 // Not diverse = penalty
  }

  // Genre analysis
  const basicGenres = ["pop", "hip hop", "rap", "country", "rock"]
  const sophisticatedGenres = ["jazz", "classical", "experimental", "ambient", "post-rock", "math rock"]

  const hasBasicGenres = topGenres.some((genre) => basicGenres.some((basic) => genre.toLowerCase().includes(basic)))
  const hasSophisticatedGenres = topGenres.some((genre) =>
    sophisticatedGenres.some((soph) => genre.toLowerCase().includes(soph)),
  )

  if (hasSophisticatedGenres) {
    score += 15
  }
  if (hasBasicGenres && !hasSophisticatedGenres) {
    score -= 15
  }

  // Audio features analysis
  if (avgFeatures.acousticness > 0.7) score += 10 // Acoustic music bonus
  if (avgFeatures.instrumentalness > 0.5) score += 15 // Instrumental music bonus
  if (avgFeatures.danceability > 0.8 && avgFeatures.energy > 0.8) score -= 10 // Too danceable = penalty

  // Repeat listening penalty
  if (repeatTracks.length > 3) {
    score -= 15 // Too much repetition
  }

  // Answer analysis
  answers.forEach((answer) => {
    switch (answer) {
      case "unique":
      case "exploring":
      case "appreciation":
      case "constantly":
        score += 8
        break
      case "mainstream":
      case "satisfied":
      case "rarely":
        score -= 8
        break
      default:
        score += Math.random() * 6 - 3
    }
  })

  // Add some randomness but keep it realistic
  score += Math.random() * 20 - 10
  const finalScore = Math.max(1, Math.min(100, Math.round(score)))

  // Generate personalized roasts based on their actual data
  const topArtist = spotifyData.topArtists[0]?.name || "Unknown Artist"
  const topTrack = spotifyData.topTracks[0]?.name || "Unknown Track"
  const topGenre = topGenres[0] || "Unknown Genre"

  // Create result based on score and real data
  if (finalScore >= 85) {
    return {
      score: finalScore,
      title: "Musical Genius",
      subtitle: "Transcendent Curator | Legendary Taste",
      classification: "LEGENDARY TIER",
      description: `Your musical intelligence is genuinely impressive. With a diversity score of ${Math.round(diversityScore * 100)}% and an average popularity of ${Math.round(avgPopularity)}, you've achieved the perfect balance of sophistication and accessibility.`,
      breakdown: {
        diversity: Math.min(10, Math.round(diversityScore * 12)),
        sophistication: Math.min(10, Math.round((100 - avgPopularity) / 10 + 3)),
        discovery: Math.min(10, Math.round(diversityScore * 10 + 2)),
        consistency: Math.min(10, 8 + Math.round(Math.random() * 2)),
      },
      verdict: `Analyzing your actual Spotify data reveals exceptional taste. Your top artist ${topArtist} combined with your genre diversity in ${topGenre} shows genuine musical sophistication. Bravo!`,
      recommendation: "Keep doing exactly what you're doing. Maybe start a music blog?",
      realData: {
        topArtist,
        topTrack,
        topGenre,
        avgPopularity: Math.round(avgPopularity),
        diversityScore: Math.round(diversityScore * 100),
      },
    }
  } else if (finalScore >= 70) {
    return {
      score: finalScore,
      title: "Music Connoisseur",
      subtitle: "Refined Listener | Above Average",
      classification: "DISTINGUISHED TIER",
      description: `Your Spotify data reveals above-average taste. ${topArtist} as your top artist isn't terrible, and your ${Math.round(diversityScore * 100)}% diversity score shows some effort.`,
      breakdown: {
        diversity: Math.min(10, Math.round(diversityScore * 10)),
        sophistication: Math.min(10, Math.round((100 - avgPopularity) / 12 + 2)),
        discovery: Math.min(10, Math.round(diversityScore * 8 + 1)),
        consistency: Math.min(10, 6 + Math.round(Math.random() * 3)),
      },
      verdict: `Your actual listening data shows promise. ${topTrack} isn't the worst song ever, and your exploration of ${topGenre} shows some musical curiosity.`,
      recommendation: "You're on the right track. Try exploring some underground artists in your favorite genres.",
      realData: {
        topArtist,
        topTrack,
        topGenre,
        avgPopularity: Math.round(avgPopularity),
        diversityScore: Math.round(diversityScore * 100),
      },
    }
  } else if (finalScore >= 50) {
    return {
      score: finalScore,
      title: "Average Listener",
      subtitle: "Predictably Mediocre | Basic",
      classification: "MEDIOCRE TIER",
      description: `Your Spotify wrapped is exactly what we expected. ${topArtist} with an average popularity of ${Math.round(avgPopularity)}? Your diversity score of ${Math.round(diversityScore * 100)}% is disappointingly average.`,
      breakdown: {
        diversity: Math.min(10, Math.round(diversityScore * 8)),
        sophistication: Math.min(10, Math.round((100 - avgPopularity) / 15 + 1)),
        discovery: Math.min(10, Math.round(diversityScore * 6 + 1)),
        consistency: Math.min(10, 4 + Math.round(Math.random() * 3)),
      },
      verdict: `Looking at your real data: ${topTrack} on repeat? ${topGenre} as your main genre? You're the musical equivalent of vanilla ice cream.`,
      recommendation: "Please, for the love of music, try something that wasn't on a Spotify-generated playlist.",
      realData: {
        topArtist,
        topTrack,
        topGenre,
        avgPopularity: Math.round(avgPopularity),
        diversityScore: Math.round(diversityScore * 100),
      },
    }
  } else if (finalScore >= 25) {
    return {
      score: finalScore,
      title: "Musical Peasant",
      subtitle: "Aggressively Basic | Concerning",
      classification: "CONCERNING TIER",
      description: `Your Spotify data is genuinely concerning. ${topArtist} with a ${Math.round(avgPopularity)} popularity score? Your ${Math.round(diversityScore * 100)}% diversity means you basically listen to the same 5 artists.`,
      breakdown: {
        diversity: Math.min(10, Math.round(diversityScore * 6)),
        sophistication: Math.min(10, Math.round((100 - avgPopularity) / 20)),
        discovery: Math.min(10, Math.round(diversityScore * 4)),
        consistency: Math.min(10, 2 + Math.round(Math.random() * 3)),
      },
      verdict: `Your actual listening history is a crime scene. ${topTrack} on repeat while exclusively listening to ${topGenre}? Even Spotify's algorithm has given up on you.`,
      recommendation: "Consider a complete musical intervention. Start by deleting your current playlists.",
      realData: {
        topArtist,
        topTrack,
        topGenre,
        avgPopularity: Math.round(avgPopularity),
        diversityScore: Math.round(diversityScore * 100),
      },
    }
  } else {
    return {
      score: finalScore,
      title: "Audio Terrorist",
      subtitle: "Threat to Musical Civilization",
      classification: "CRITICAL ALERT",
      description: `Your Spotify data has been forwarded to the authorities. ${topArtist} as your most-played artist? A diversity score of ${Math.round(diversityScore * 100)}%? This is a musical emergency.`,
      breakdown: {
        diversity: Math.min(10, Math.round(diversityScore * 4)),
        sophistication: 0,
        discovery: Math.min(10, Math.round(diversityScore * 2)),
        consistency: Math.min(10, 1 + Math.round(Math.random() * 2)),
      },
      verdict: `We analyzed your real Spotify data and... wow. ${topTrack} played ${repeatTracks[0]?.count || "countless"} times? Your exclusive ${topGenre} consumption is a war crime against human consciousness.`,
      recommendation:
        "Please stop listening to music immediately. For everyone's sake. Consider taking up silent meditation.",
      realData: {
        topArtist,
        topTrack,
        topGenre,
        avgPopularity: Math.round(avgPopularity),
        diversityScore: Math.round(diversityScore * 100),
      },
    }
  }
}
