import { spotifyAPI } from "@/lib/spotify-api"

export const spotifyService = {
    getProfile: async () => {
        // Mock profile for spoof flow
        return {
            display_name: localStorage.getItem("userName") || "Spotify User",
            images: [{ url: "https://i.scdn.co/image/ab6761610000e5eb55d39ab9c21d506aa52f7021" }], // Generic avatar
            product: "premium",
        }
    },

    getTopArtists: async () => {
        // Mock top artists (Mainstream/Pop focus)
        return [
            {
                name: "Taylor Swift",
                genres: ["pop", "singer-songwriter"],
                images: [{ url: "https://i.scdn.co/image/ab6761610000e5eb5a00969a4698c3132a15fbb0" }],
                popularity: 100
            },
            {
                name: "The Weeknd",
                genres: ["pop", "r&b"],
                images: [{ url: "https://i.scdn.co/image/ab6761610000e5eb214f3cf1cbe7139c1e26ffbb" }],
                popularity: 98
            },
            {
                name: "Drake",
                genres: ["hip hop", "rap"],
                images: [{ url: "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9" }],
                popularity: 95
            },
            {
                name: "Bad Bunny",
                genres: ["trap latino", "reggaeton"],
                images: [{ url: "https://i.scdn.co/image/ab6761610000e5eb8ee9a6f54dcfe4bc054fe877" }],
                popularity: 94
            },
            {
                name: "Ariana Grande",
                genres: ["pop", "r&b"],
                images: [{ url: "https://i.scdn.co/image/ab6761610000e5eb5a00969a4698c3132a15fbb0" }],
                popularity: 92
            },
        ]
    },

    getTopTracks: async () => {
        // Mock top tracks
        return [
            {
                id: "1",
                name: "Cruel Summer",
                artists: [{ name: "Taylor Swift" }],
                album: { images: [{ url: "https://i.scdn.co/image/ab6761610000e5eb5a00969a4698c3132a15fbb0" }] },
                popularity: 98
            },
            {
                id: "2",
                name: "Starboy",
                artists: [{ name: "The Weeknd" }],
                album: { images: [{ url: "https://i.scdn.co/image/ab6761610000e5eb214f3cf1cbe7139c1e26ffbb" }] },
                popularity: 95
            },
            {
                id: "3",
                name: "As It Was",
                artists: [{ name: "Harry Styles" }],
                album: { images: [{ url: "https://i.scdn.co/image/ab6761610000e5eb2e8f4f45e6df956394f78bd2" }] },
                popularity: 92
            },
            {
                id: "4",
                name: "Flowers",
                artists: [{ name: "Miley Cyrus" }],
                album: { images: [{ url: "https://i.scdn.co/image/ab6761610000e5eb5a00969a4698c3132a15fbb0" }] },
                popularity: 96
            },
            {
                id: "5",
                name: "Kill Bill",
                artists: [{ name: "SZA" }],
                album: { images: [{ url: "https://i.scdn.co/image/ab6761610000e5eb7c1467e33f6a62d74741387d" }] },
                popularity: 93
            },
        ]
    },

    getRecentTracks: async () => {
        // Mock recent tracks
        return Array(20).fill(null).map((_, i) => ({
            id: `recent-${i}`,
            name: ["Cruel Summer", "Anti-Hero", "Vampire", "Paint The Town Red", "Seven"][i % 5],
            artists: [{ name: ["Taylor Swift", "Taylor Swift", "Olivia Rodrigo", "Doja Cat", "Jung Kook"][i % 5] }],
            playedAt: new Date(Date.now() - i * 1000 * 60 * 30).toISOString(), // Every 30 mins
        }))
    },

    getPlaylists: async () => {
        return [
            { name: "My Playlist #1", tracks: { total: 150 } },
            { name: "Gym Hype", tracks: { total: 45 } },
            { name: "Sad Boi Hours", tracks: { total: 82 } },
            { name: "Throwback Thursday", tracks: { total: 200 } },
        ]
    },

    getAudioFeatures: async () => {
        // Mock audio features (High energy, high danceability for pop)
        return {
            audio_features: Array(5).fill(null).map(() => ({
                danceability: 0.7 + Math.random() * 0.2,
                energy: 0.6 + Math.random() * 0.3,
                valence: 0.5 + Math.random() * 0.4,
                acousticness: 0.1 + Math.random() * 0.3,
                instrumentalness: Math.random() * 0.1,
            }))
        }
    }
}
