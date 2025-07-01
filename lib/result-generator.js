// Multiple result tiers with different outcomes
export const generateResult = (answers, userData) => {
  // Complex scoring algorithm based on answers
  let baseScore = 50

  answers.forEach((answer, index) => {
    switch (answer) {
      case "artistic":
      case "active":
      case "explore":
      case "perfectionist":
        baseScore += Math.random() * 15 + 5
        break
      case "comfort":
      case "mixed":
      case "preference":
      case "situational":
        baseScore += Math.random() * 10 - 5
        break
      case "guilty":
      case "background":
      case "impatient":
      case "lazy":
        baseScore -= Math.random() * 15 + 5
        break
      default:
        baseScore += Math.random() * 10 - 5
    }
  })

  // Add some randomness and cap the score
  baseScore += Math.random() * 20 - 10
  const finalScore = Math.max(1, Math.min(100, Math.round(baseScore)))

  // Different result tiers with more variety
  if (finalScore >= 90) {
    return {
      score: finalScore,
      title: "Musical Genius",
      subtitle: "Transcendent Curator | Legendary Taste",
      classification: "LEGENDARY TIER",
      description:
        "You possess an almost supernatural understanding of music. Your taste transcends mortal comprehension.",
      breakdown: { diversity: 10, sophistication: 10, discovery: 9, consistency: 10 },
      verdict:
        "Congratulations! You've achieved musical enlightenment. Spotify should pay YOU for using their platform.",
      recommendation: "Please consider teaching masterclasses in musical appreciation.",
      shareText: `I scored ${finalScore}% on MusicIQ! I'm a Musical Genius! 🎵👑 Bow down to my superior taste #MusicIQ #MusicalGenius`,
    }
  } else if (finalScore >= 80) {
    return {
      score: finalScore,
      title: "Musical Virtuoso",
      subtitle: "Sophisticated Curator | Exceptional Taste",
      classification: "ELITE TIER",
      description:
        "Your musical intelligence surpasses 95% of the population. You demonstrate exceptional curation skills.",
      breakdown: { diversity: 9, sophistication: 9, discovery: 8, consistency: 9 },
      verdict: "Impressive! Your musical taste is genuinely sophisticated. You're doing something very right.",
      recommendation: "Continue exploring and sharing your discoveries with the musically unfortunate.",
      shareText: `I scored ${finalScore}% on MusicIQ! I'm a Musical Virtuoso 🎵✨ #MusicIQ #MusicalVirtuoso`,
    }
  } else if (finalScore >= 65) {
    return {
      score: finalScore,
      title: "Music Connoisseur",
      subtitle: "Refined Listener | Above Average",
      classification: "DISTINGUISHED TIER",
      description: "You have developed a refined palate for music with clear signs of sophistication.",
      breakdown: { diversity: 7, sophistication: 7, discovery: 6, consistency: 7 },
      verdict: "Well done! You're clearly putting thought into your musical choices. Keep it up!",
      recommendation: "Push yourself to explore more experimental and underground artists.",
      shareText: `I scored ${finalScore}% on MusicIQ! I'm a Music Connoisseur 🎵🍷 #MusicIQ #MusicConnoisseur`,
    }
  } else if (finalScore >= 50) {
    return {
      score: finalScore,
      title: "Music Enthusiast",
      subtitle: "Decent Instincts | Room for Growth",
      classification: "SOLID TIER",
      description: "You have decent musical taste with clear potential for improvement.",
      breakdown: { diversity: 6, sophistication: 5, discovery: 6, consistency: 6 },
      verdict: "Not bad! You're doing better than average, but there's definitely room for growth.",
      recommendation: "Try branching out from your comfort zone more often.",
      shareText: `I scored ${finalScore}% on MusicIQ! I'm a Music Enthusiast 🎵 #MusicIQ #DecentTaste`,
    }
  } else if (finalScore >= 35) {
    return {
      score: finalScore,
      title: "Average Listener",
      subtitle: "Mainstream Consumer | Predictable",
      classification: "MEDIOCRE TIER",
      description: "Your taste is disappointingly average. You follow trends rather than set them.",
      breakdown: { diversity: 4, sophistication: 3, discovery: 4, consistency: 5 },
      verdict: "You're perfectly, predictably average. Your playlist could belong to literally anyone.",
      recommendation: "Please, for the love of music, try something that wasn't on TikTok.",
      shareText: `I scored ${finalScore}% on MusicIQ... I'm apparently just Average 😅 #MusicIQ #BasicTaste`,
    }
  } else if (finalScore >= 20) {
    return {
      score: finalScore,
      title: "Musical Peasant",
      subtitle: "Basic Consumer | Questionable Choices",
      classification: "CONCERNING TIER",
      description: "Your musical taste is genuinely concerning. You seem to actively avoid good music.",
      breakdown: { diversity: 2, sophistication: 1, discovery: 2, consistency: 3 },
      verdict: "Your playlist is what happens when algorithms give up. Even Spotify's shuffle feature is embarrassed.",
      recommendation: "Consider a complete musical intervention. Maybe start with literally anything else.",
      shareText: `I scored ${finalScore}% on MusicIQ and I'm a Musical Peasant 💀 This is embarrassing #MusicIQ #MusicalDisaster`,
    }
  } else {
    return {
      score: finalScore,
      title: "Audio Terrorist",
      subtitle: "Threat to Musical Civilization",
      classification: "CRITICAL ALERT",
      description: "Your music taste is so catastrophically bad, it poses a genuine threat to society.",
      breakdown: { diversity: 0, sophistication: 0, discovery: 1, consistency: 1 },
      verdict:
        "Your playlist is a war crime against human consciousness. The Geneva Convention should include a clause about your Spotify account.",
      recommendation:
        "Please stop listening to music immediately. For everyone's sake. Consider taking up silent meditation.",
      shareText: `I scored ${finalScore}% on MusicIQ and I'm an Audio Terrorist 💀🚨 I'm a danger to society #MusicIQ #MusicalCriminal`,
    }
  }
}
