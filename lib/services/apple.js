export class AppleMusicService {
    async getProfile() {
        return {
            name: localStorage.getItem("userName") || "Apple Music User",
            image: "https://www.apple.com/v/apple-music/x/images/shared/og-image.png", // Generic Apple Music image
            id: "apple_mock_user_id",
            platform: "apple",
        }
    }

    async getTopArtists() {
        return [
            {
                name: "Frank Ocean",
                genres: ["R&B", "Soul"],
                image: "https://i.scdn.co/image/ab6761610000e5eb7a18e930985553181c4c4189",
                popularity: 90,
                id: "apple_artist_1",
            },
            {
                name: "Kendrick Lamar",
                genres: ["Hip Hop", "Rap"],
                image: "https://i.scdn.co/image/ab6761610000e5eb437b9e2a82505b3d93ff1022",
                popularity: 92,
                id: "apple_artist_2",
            },
            {
                name: "Adele",
                genres: ["Pop", "Soul"],
                image: "https://i.scdn.co/image/ab6761610000e5eb68f6e5892075d7f22615bd17",
                popularity: 95,
                id: "apple_artist_3",
            },
            {
                name: "Radiohead",
                genres: ["Alternative", "Rock"],
                image: "https://i.scdn.co/image/ab6761610000e5eb8c6602851e3e56637d17e46a",
                popularity: 85,
                id: "apple_artist_4",
            },
            {
                name: "Beyoncé",
                genres: ["Pop", "R&B"],
                image: "https://i.scdn.co/image/ab6761610000e5eb249355146535693d304a9976",
                popularity: 98,
                id: "apple_artist_5",
            },
        ]
    }

    async getTopTracks() {
        return [
            {
                name: "Pink + White",
                artist: "Frank Ocean",
                album: "Blonde",
                popularity: 88,
                id: "apple_track_1",
                image: "https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526",
            },
            {
                name: "Money Trees",
                artist: "Kendrick Lamar",
                album: "good kid, m.A.A.d city",
                popularity: 85,
                id: "apple_track_2",
                image: "https://i.scdn.co/image/ab67616d0000b273d28d2ebdedb220e4797437c7",
            },
            {
                name: "Easy On Me",
                artist: "Adele",
                album: "30",
                popularity: 90,
                id: "apple_track_3",
                image: "https://i.scdn.co/image/ab67616d0000b2732118bf9b198b05a95ded6300",
            },
            {
                name: "Creep",
                artist: "Radiohead",
                album: "Pablo Honey",
                popularity: 82,
                id: "apple_track_4",
                image: "https://i.scdn.co/image/ab67616d0000b273c8b444df094279e70d0ed856",
            },
            {
                name: "BREAK MY SOUL",
                artist: "Beyoncé",
                album: "RENAISSANCE",
                popularity: 89,
                id: "apple_track_5",
                image: "https://i.scdn.co/image/ab67616d0000b2730c11d427e8f48258501cacf8",
            },
        ]
    }

    async getRecentTracks() {
        return [
            {
                name: "Nights",
                artist: "Frank Ocean",
                playedAt: new Date().toISOString(),
                id: "apple_recent_1",
            },
            {
                name: "HUMBLE.",
                artist: "Kendrick Lamar",
                playedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
                id: "apple_recent_2",
            },
            {
                name: "Hello",
                artist: "Adele",
                playedAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
                id: "apple_recent_3",
            },
            {
                name: "Karma Police",
                artist: "Radiohead",
                playedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
                id: "apple_recent_4",
            },
            {
                name: "CUFF IT",
                artist: "Beyoncé",
                playedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
                id: "apple_recent_5",
            },
        ]
    }

    async getPlaylists() {
        return [
            {
                name: "Replay 2024",
                id: "apple_playlist_1",
                image: "https://music.apple.com/assets/product/replay/2024/en-us/ec-960.png",
            },
            {
                name: "Favorites Mix",
                id: "apple_playlist_2",
                image: "https://is1-ssl.mzstatic.com/image/thumb/Features114/v4/01/e9/86/01e98604-201c-041e-9292-960407152083/source/600x600bb.jpg",
            },
            {
                name: "Get Up! Mix",
                id: "apple_playlist_3",
                image: "https://is1-ssl.mzstatic.com/image/thumb/Features124/v4/e6/57/31/e65731f2-43b6-9e43-9826-646738501d9e/source/600x600bb.jpg",
            },
        ]
    }

    async getAudioFeatures(trackIds) {
        // Return mock audio features, slightly more "sophisticated" for Apple Music stereotype
        return {
            audio_features: trackIds.map(() => ({
                danceability: Math.random() * 0.4 + 0.3,
                energy: Math.random() * 0.4 + 0.3,
                valence: Math.random() * 0.6 + 0.2,
                acousticness: Math.random() * 0.4 + 0.1,
                instrumentalness: Math.random() * 0.2,
            })),
        }
    }
}

export const appleMusicService = new AppleMusicService()
