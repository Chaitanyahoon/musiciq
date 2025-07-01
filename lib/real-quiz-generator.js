// Generate questions based on real Spotify data
export const generateRealQuestions = (spotifyData) => {
  const questions = []

  // Question about top artist
  if (spotifyData.topArtists.length > 0) {
    const topArtist = spotifyData.topArtists[0]
    questions.push({
      id: 1,
      question: `Our analysis shows you've streamed ${topArtist.name} more than any other artist. They have ${topArtist.followers.total.toLocaleString()} followers globally. Do you consider yourself a mainstream listener?`,
      options: [
        { value: "mainstream", text: "Yes, I enjoy popular music" },
        { value: "unique", text: "No, I have unique taste" },
        { value: "unaware", text: "I wasn't aware they were so popular" },
      ],
    })
  }

  // Question about genre diversity
  if (spotifyData.topGenres.length > 0) {
    const topGenre = spotifyData.topGenres[0]
    questions.push({
      id: 2,
      question: `Your listening data shows "${topGenre}" as your dominant genre. Our diversity algorithm rates your genre exploration at ${Math.round(spotifyData.diversityScore * 100)}%. How do you justify this lack of musical curiosity?`,
      options: [
        { value: "satisfied", text: "I know what I like and stick to it" },
        { value: "exploring", text: "I'm actually quite diverse in my taste" },
        { value: "algorithm", text: "Your algorithm is clearly wrong" },
      ],
    })
  }

  // Question about popularity
  questions.push({
    id: 3,
    question: `The average popularity score of your top tracks is ${Math.round(spotifyData.avgPopularity)}/100. This places you in the ${spotifyData.avgPopularity > 70 ? "mainstream" : spotifyData.avgPopularity > 40 ? "somewhat alternative" : "underground"} category. How does this make you feel?`,
    options: [
      { value: "proud", text: "I'm proud of my music choices" },
      { value: "surprised", text: "I'm surprised by this result" },
      { value: "defensive", text: "Popular doesn't mean bad" },
    ],
  })

  // Question about repeat listening
  if (spotifyData.repeatTracks.length > 0) {
    const mostRepeated = spotifyData.repeatTracks[0]
    questions.push({
      id: 4,
      question: `You've played "${mostRepeated.track.name}" by ${mostRepeated.track.artists[0].name} ${mostRepeated.count} times recently. This repetitive behavior suggests what psychological pattern?`,
      options: [
        { value: "comfort", text: "I find comfort in familiar music" },
        { value: "obsessive", text: "I might have obsessive tendencies" },
        { value: "appreciation", text: "I deeply appreciate good music" },
      ],
    })
  }

  // Question about audio features
  const { avgFeatures } = spotifyData
  questions.push({
    id: 5,
    question: `Audio analysis reveals your music has ${avgFeatures.energy > 0.7 ? "high energy" : avgFeatures.energy > 0.4 ? "moderate energy" : "low energy"} (${Math.round(avgFeatures.energy * 100)}%) and ${avgFeatures.valence > 0.6 ? "positive" : avgFeatures.valence > 0.4 ? "neutral" : "negative"} emotional valence (${Math.round(avgFeatures.valence * 100)}%). What does this say about your personality?`,
    options: [
      { value: "accurate", text: "This accurately reflects my personality" },
      { value: "situational", text: "My music choice depends on my mood" },
      { value: "irrelevant", text: "Music doesn't reflect personality" },
    ],
  })

  // Question about discovery
  questions.push({
    id: 6,
    question: `Your artist diversity score is ${Math.round(spotifyData.diversityScore * 100)}%. The average music lover scores 65%. How often do you actively seek out new artists?`,
    options: [
      { value: "constantly", text: "I'm always discovering new music" },
      { value: "occasionally", text: "Sometimes, when I have time" },
      { value: "rarely", text: "I prefer sticking to what I know" },
    ],
  })

  // Shuffle and return 5-6 questions
  return questions.sort(() => 0.5 - Math.random()).slice(0, 5 + Math.floor(Math.random() * 2))
}
