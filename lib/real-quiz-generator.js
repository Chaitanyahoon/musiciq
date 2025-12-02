// Generate questions with a progressive narrative: Nice -> Judgmental -> Roast
// Generate questions with a progressive narrative: Nice -> Judgmental -> Roast
export const generateRealQuestions = (musicData) => {
  const topArtist = musicData.topArtists[0]
  const topGenre = musicData.topGenres[0]
  const randomTrack = musicData.topTracks[Math.floor(Math.random() * musicData.topTracks.length)]?.name || "that one song"

  // Helper to shuffle array
  const shuffle = (array) => array.sort(() => Math.random() - 0.5)

  // PHASE 1: Validation (Select 3)
  // Build up their ego
  const validationPool = [
    {
      phase: "validation",
      question: `We see you're a fan of ${topArtist.name}. Their complex discography suggests a listener with refined taste. What draws you to their music?`,
      options: [
        { value: "lyrics", text: "The lyrical depth and storytelling" },
        { value: "production", text: "The innovative production quality" },
        { value: "emotion", text: "The raw emotional resonance" },
      ],
    },
    {
      phase: "validation",
      question: `Your top genre is ${topGenre}. This genre is often associated with high creativity and intelligence. Do you feel this reflects your personality?`,
      options: [
        { value: "creative", text: "Yes, I consider myself very creative" },
        { value: "intellectual", text: "I appreciate the intellectual complexity" },
        { value: "both", text: "Both creative and intellectual" },
      ],
    },
    {
      phase: "validation",
      question: `Your diversity score is ${Math.round(musicData.diversityScore * 100)}%, which is quite impressive. How do you discover such a wide range of music?`,
      options: [
        { value: "curated", text: "I carefully curate my own playlists" },
        { value: "research", text: "I actively research new artists" },
        { value: "natural", text: "It just comes naturally to me" },
      ],
    },
    {
      phase: "validation",
      question: `Data shows you listen to music primarily during ${new Date().getHours() < 12 ? "morning" : "evening"} hours. Does music help you focus or relax?`,
      options: [
        { value: "focus", text: "It's essential for my deep work" },
        { value: "relax", text: "It helps me unwind and decompress" },
        { value: "energy", text: "It gives me energy to keep going" },
      ],
    },
    {
      phase: "validation",
      question: `You have a strong affinity for ${musicData.topTracks[0]?.name}. It's a bold choice. What does this track mean to you?`,
      options: [
        { value: "anthem", text: "It's basically my life anthem" },
        { value: "memory", text: "It reminds me of a specific time" },
        { value: "sound", text: "I just love the sonic texture" },
      ],
    },
  ]

  // PHASE 2: Doubt (Select 3)
  // Start planting seeds of judgment
  const doubtPool = [
    {
      phase: "doubt",
      question: `Wait, we also found "${randomTrack}" in your heavy rotation. Is this... ironic?`,
      options: [
        { value: "ironic", text: "Yeah, totally ironic..." },
        { value: "guilty", text: "It's a guilty pleasure" },
        { value: "serious", text: "No, I unironically love it" },
      ],
    },
    {
      phase: "doubt",
      question: `You've listened to ${topArtist.name} for ${Math.floor(Math.random() * 50 + 20)} hours this month. Are you okay?`,
      options: [
        { value: "fine", text: "I'm fine, why do you ask?" },
        { value: "coping", text: "Music is my coping mechanism" },
        { value: "obsessed", text: "I might have a problem" },
      ],
    },
    {
      phase: "doubt",
      question: `Comparing your taste to the global average... you're in the top 1% for "Sad Boi" energy. Is everything alright at home?`,
      options: [
        { value: "vibes", text: "I just like the vibes" },
        { value: "sad", text: "I'm going through some things" },
        { value: "art", text: "Sad music is better art" },
      ],
    },
    {
      phase: "doubt",
      question: `Our algorithm is confused. You went from ${topGenre} to... whatever this is. Are you having an identity crisis?`,
      options: [
        { value: "eclectic", text: "I'm just eclectic, okay?" },
        { value: "chaos", text: "My life is chaos, so is my music" },
        { value: "mood", text: "It depends on my mood swings" },
      ],
    },
    {
      phase: "doubt",
      question: `We found a playlist titled "Chill Vibes" but it's mostly aggressive hyperpop. Do you know what "chill" means?`,
      options: [
        { value: "subjective", text: "Chill is subjective" },
        { value: "chaos", text: "Chaos calms me down" },
        { value: "oops", text: "I might have mislabeled it" },
      ],
    },
  ]

  // PHASE 3: Roast (Select 3)
  // Full on attack
  const roastPool = [
    {
      phase: "roast",
      question: `Let's be real. Your "diversity" is just listening to the same 5 songs on different playlists. Why do you lie to yourself?`,
      options: [
        { value: "comfort", text: "I fear change" },
        { value: "lazy", text: "I'm too lazy to find new music" },
        { value: "denial", text: "I am NOT listening to this negativity" },
      ],
    },
    {
      phase: "roast",
      question: `Our AI just analyzed your "Party" playlist and it sent a distress signal. Do people actually let you pass the aux cord?`,
      options: [
        { value: "never", text: "They banned me years ago" },
        { value: "pity", text: "Only out of pity" },
        { value: "bold", text: "I force them to listen to my genius" },
      ],
    },
    {
      phase: "roast",
      question: `Final question. Be honest. Do you actually think you have good taste, or are you just following what TikTok tells you to like?`,
      options: [
        { value: "tiktok", text: "TikTok controls my brain" },
        { value: "delusional", text: "I am delusional about my taste" },
        { value: "pretentious", text: "I'm just pretentious" },
      ],
    },
    {
      phase: "roast",
      question: `Your music taste has the depth of a kiddie pool. Do you actively avoid complex emotions?`,
      options: [
        { value: "simple", text: "I like simple things" },
        { value: "happy", text: "I just want to be happy" },
        { value: "ouch", text: "That was uncalled for" },
      ],
    },
    {
      phase: "roast",
      question: `If your music taste was a spice, it would be flour. Why are you so afraid of flavor?`,
      options: [
        { value: "classic", text: "I appreciate the classics" },
        { value: "minimalist", text: "I'm a minimalist" },
        { value: "spicy", text: "Hey! I like spicy food!" },
      ],
    },
  ]

  // Select random questions from each pool
  const selectedQuestions = [
    ...shuffle(validationPool).slice(0, 3),
    ...shuffle(doubtPool).slice(0, 3),
    ...shuffle(roastPool).slice(0, 3),
  ]

  // Assign IDs sequentially
  return selectedQuestions.map((q, index) => ({ ...q, id: index + 1 }))
}
