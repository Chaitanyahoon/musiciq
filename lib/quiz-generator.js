// Enhanced quiz with more variety and personalization
export const generatePersonalizedQuestions = (userData) => {
  const questionPool = [
    {
      id: 1,
      question: `Our neural network detected ${userData.topArtists[0]} as your most-played artist with 847 streams. How do you justify this level of repetitive consumption?`,
      options: [
        { value: "artistic", text: "They represent sophisticated artistry" },
        { value: "comfort", text: "Familiar music provides comfort" },
        { value: "unaware", text: "I wasn't aware of the frequency" },
      ],
    },
    {
      id: 2,
      question: `Analysis shows "${userData.recentTracks[0]}" in your recent rotation. Our AI rates this track's complexity at 2.3/10. Your thoughts?`,
      options: [
        { value: "disagree", text: "The AI is wrong, it's complex" },
        { value: "simple", text: "Simple doesn't mean bad" },
        { value: "guilty", text: "It's a guilty pleasure" },
      ],
    },
    {
      id: 3,
      question: `Your listening data reveals ${userData.listeningTime} daily consumption, primarily during 2-6 PM. Do you use music as background noise or active listening?`,
      options: [
        { value: "active", text: "I actively engage with every song" },
        { value: "background", text: "Often background while working" },
        { value: "mixed", text: "Depends on my mood and activity" },
      ],
    },
    {
      id: 4,
      question: `Genre analysis indicates 73% ${userData.topGenres[0]} consumption. Our diversity algorithm flags this as concerning. How do you respond?`,
      options: [
        { value: "preference", text: "I know what I like" },
        { value: "explore", text: "I'm open to exploring more" },
        { value: "algorithm", text: "Your algorithm is flawed" },
      ],
    },
    {
      id: 5,
      question: `Skip rate analysis: You skip 68% of songs within 30 seconds. This suggests either impatience or poor curation. Which is it?`,
      options: [
        { value: "impatient", text: "I know quickly if I like something" },
        { value: "curation", text: "My playlists need better curation" },
        { value: "mood", text: "It depends on my current mood" },
      ],
    },
    {
      id: 6,
      question: `Temporal analysis shows you replay "${userData.repeatSongs[0]}" 23 times weekly. This repetitive behavior indicates what psychological pattern?`,
      options: [
        { value: "comfort", text: "Seeking emotional comfort" },
        { value: "obsessive", text: "Possibly obsessive tendencies" },
        { value: "appreciation", text: "Deep musical appreciation" },
      ],
    },
    {
      id: 7,
      question: `Cross-referencing with 50M profiles, your taste similarity index is 94% with mainstream listeners. How does this make you feel?`,
      options: [
        { value: "fine", text: "Popular music is popular for a reason" },
        { value: "concerned", text: "I thought I was more unique" },
        { value: "proud", text: "I'm proud of my mainstream taste" },
      ],
    },
    {
      id: 8,
      question: `Machine learning models detect you've never explored ${userData.topGenres[2]} despite algorithmic recommendations. Why do you resist musical growth?`,
      options: [
        { value: "satisfied", text: "I'm satisfied with my current taste" },
        { value: "time", text: "I don't have time to explore new music" },
        { value: "algorithms", text: "I don't trust algorithmic recommendations" },
      ],
    },
    {
      id: 9,
      question: `Behavioral analysis shows you create playlists but rarely update them. This suggests what about your musical personality?`,
      options: [
        { value: "nostalgic", text: "I'm nostalgic and prefer consistency" },
        { value: "lazy", text: "I'm too lazy to maintain playlists" },
        { value: "perfectionist", text: "I'm a perfectionist who gets it right the first time" },
      ],
    },
    {
      id: 10,
      question: `Your listening patterns show 89% solo consumption vs 11% social. Do you view music as a personal or communal experience?`,
      options: [
        { value: "personal", text: "Music is deeply personal to me" },
        { value: "communal", text: "I prefer sharing musical experiences" },
        { value: "situational", text: "It depends on the context" },
      ],
    },
  ]

  // Randomly select 5-7 questions to keep it fresh
  const shuffled = questionPool.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, 5 + Math.floor(Math.random() * 3))
}
