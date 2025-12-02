export class YouTubeMusicService {
    async getProfile() {
        return {
            name: localStorage.getItem("userName") || "YouTube User",
            image: "https://lh3.googleusercontent.com/a/default-user=s96-c", // Generic Google avatar
            id: "yt_mock_user_id",
            platform: "youtube",
        }
    }

    async getTopArtists() {
        return [
            {
                name: "The Weeknd",
                genres: ["R&B", "Pop", "Synth-pop"],
                image: "https://i.scdn.co/image/ab6761610000e5eb214f3cf1cbe7139c1e26ffbb",
                popularity: 98,
                id: "yt_artist_1",
            },
            {
                name: "Taylor Swift",
                genres: ["Pop", "Country", "Folk"],
                image: "https://i.scdn.co/image/ab6761610000e5eb5a00969a4698c3132a15fbb0",
                popularity: 100,
                id: "yt_artist_2",
            },
            {
                name: "Bad Bunny",
                genres: ["Trap", "Reggaeton"],
                image: "https://i.scdn.co/image/ab6761610000e5eb9ad5ec25a41ae1548120b88e",
                popularity: 95,
                id: "yt_artist_3",
            },
            {
                name: "Drake",
                genres: ["Hip Hop", "Rap", "R&B"],
                image: "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
                popularity: 96,
                id: "yt_artist_4",
            },
            {
                name: "BTS",
                genres: ["K-Pop", "Pop"],
                image: "https://i.scdn.co/image/ab6761610000e5eb82a5d58059f81867b871d8b6",
                popularity: 94,
                id: "yt_artist_5",
            },
        ]
    }

    async getTopTracks() {
        return [
            {
                name: "Blinding Lights (Official Audio)",
                artist: "The Weeknd",
                album: "After Hours",
                popularity: 95,
                id: "yt_track_1",
                image: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
            },
            {
                name: "Anti-Hero",
                artist: "Taylor Swift",
                album: "Midnights",
                popularity: 92,
                id: "yt_track_2",
                image: "https://i.scdn.co/image/ab67616d0000b273bb54dde5369e8c4b75120aa5",
            },
            {
                name: "As It Was",
                artist: "Harry Styles",
                album: "Harry's House",
                popularity: 90,
                id: "yt_track_3",
                image: "https://i.scdn.co/image/ab67616d0000b2732e8f4f45e6df958c605c1b23",
            },
            {
                name: "Pink Venom",
                artist: "BLACKPINK",
                album: "BORN PINK",
                popularity: 88,
                id: "yt_track_4",
                image: "https://i.scdn.co/image/ab67616d0000b273b1c4b76e23414c9f20242268",
            },
            {
                name: "Glimpse of Us",
                artist: "Joji",
                album: "SMITHEREENS",
                popularity: 85,
                id: "yt_track_5",
                image: "https://i.scdn.co/image/ab67616d0000b273ea6ca7f4c3b106d55687707c",
            },
        ]
    }

    async getRecentTracks() {
        // Simulate recent tracks with "Official Video" or "Lyric Video" in titles often found on YT
        return [
            {
                name: "Starboy (Official Video)",
                artist: "The Weeknd",
                playedAt: new Date().toISOString(),
                id: "yt_recent_1",
            },
            {
                name: "Levitating [Official Music Video]",
                artist: "Dua Lipa",
                playedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
                id: "yt_recent_2",
            },
            {
                name: "Shape of You (Lyrics)",
                artist: "Ed Sheeran",
                playedAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
                id: "yt_recent_3",
            },
            {
                name: "lofi hip hop radio - beats to relax/study to",
                artist: "Lofi Girl",
                playedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
                id: "yt_recent_4",
            },
            {
                name: "Despacito",
                artist: "Luis Fonsi",
                playedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
                id: "yt_recent_5",
            },
        ]
    }

    async getPlaylists() {
        return [
            {
                name: "My Supermix",
                id: "yt_playlist_1",
                image: "https://www.gstatic.com/youtube/media/ytm/images/pbg/liked-music-@576.png",
            },
            {
                name: "Discover Mix",
                id: "yt_playlist_2",
                image: "https://www.gstatic.com/youtube/media/ytm/images/pbg/discover-mix-@576.png",
            },
            {
                name: "New Release Mix",
                id: "yt_playlist_3",
                image: "https://www.gstatic.com/youtube/media/ytm/images/pbg/new-release-mix-@576.png",
            },
        ]
    }

    async getAudioFeatures(trackIds) {
        // Return mock audio features
        return {
            audio_features: trackIds.map(() => ({
                danceability: Math.random() * 0.5 + 0.4,
                energy: Math.random() * 0.5 + 0.4,
                valence: Math.random() * 0.8 + 0.1,
                acousticness: Math.random() * 0.3,
                instrumentalness: Math.random() * 0.1,
            })),
        }
    }
}

export const youtubeMusicService = new YouTubeMusicService()
