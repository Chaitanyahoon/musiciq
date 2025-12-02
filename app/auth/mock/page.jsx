"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, ChevronRight, Globe, Lock, Info } from "lucide-react"

export default function MockAuth() {
    const [service, setService] = useState("spotify")
    const [userName, setUserName] = useState("")

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        setService(params.get("service") || "spotify")
        setUserName(localStorage.getItem("userName") || "User")
    }, [])

    // Common Cyber-Noir Background Wrapper
    const AuthWrapper = ({ children }) => (
        <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center relative overflow-hidden font-sans">
            {/* Ambient Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] animate-pulse-glow"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] animate-pulse-glow delay-1000"></div>
            </div>

            {/* Content with Glass Effect Container */}
            <div className="relative z-10 w-full max-w-md mx-4 animate-in fade-in zoom-in duration-500">
                {children}
            </div>
        </div>
    )

    if (service === "youtube") return <AuthWrapper><GoogleAuth userName={userName} /></AuthWrapper>
    if (service === "apple") return <AuthWrapper><AppleAuth userName={userName} /></AuthWrapper>
    return <AuthWrapper><SpotifyAuth userName={userName} /></AuthWrapper>
}

function SpotifyAuth({ userName }) {
    const [isLoading, setIsLoading] = useState(false)

    const handleAllow = () => {
        setIsLoading(true)
        setTimeout(() => {
            localStorage.setItem("connectedService", "spotify")
            window.location.href = "/analysis"
        }, 1500)
    }

    return (
        <div className="bg-[#121212] text-white rounded-xl shadow-2xl overflow-hidden border border-[#282828]">
            <div className="p-8 flex flex-col items-center">
                {/* Spotify Header */}
                <div className="text-center mb-8">
                    <svg viewBox="0 0 24 24" className="w-12 h-12 text-white fill-current mx-auto mb-4"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.66.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" /></svg>
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold mb-2">MusicIQ</h1>
                    <p className="text-gray-400 text-sm">wants access to your Spotify account</p>
                </div>

                {/* User Chip */}
                <div className="bg-[#282828] rounded-full p-1 pr-4 inline-flex items-center mb-8 mx-auto">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">
                        {userName.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-bold text-white">{userName}</span>
                    <span className="text-xs text-gray-400 ml-2">(not you?)</span>
                </div>

                {/* Permissions */}
                <div className="space-y-6 mb-10 text-left w-full">
                    <div className="flex items-start">
                        <div className="mt-1 mr-4 text-gray-400">
                            <Info className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm mb-1">View your Spotify account data</h3>
                            <p className="text-xs text-gray-400">Your name and username, your profile picture, how many followers you have on Spotify, and your public playlists.</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="mt-1 mr-4 text-gray-400">
                            <Info className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm mb-1">View your activity on Spotify</h3>
                            <p className="text-xs text-gray-400">Content you have recently played, what you've played, and your top artists and content.</p>
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="space-y-3 w-full">
                    <button
                        onClick={handleAllow}
                        disabled={isLoading}
                        className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold py-3 rounded-full uppercase tracking-widest text-xs transition-transform active:scale-95"
                    >
                        {isLoading ? "Connecting..." : "Agree"}
                    </button>
                    <button
                        onClick={() => window.location.href = "/"}
                        className="w-full text-white font-bold py-3 rounded-full uppercase tracking-widest text-xs hover:text-gray-300"
                    >
                        Cancel
                    </button>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-[10px] text-gray-500">
                        You can remove this access at any time at spotify.com/account.
                    </p>
                </div>
            </div>
        </div>
    )
}

function GoogleAuth({ userName }) {
    const [isLoading, setIsLoading] = useState(false)

    const handleAllow = () => {
        setIsLoading(true)
        setTimeout(() => {
            localStorage.setItem("connectedService", "youtube")
            window.location.href = "/analysis"
        }, 1500)
    }

    return (
        <Card className="w-full bg-[#202124] border border-[#5f6368] rounded-lg shadow-2xl mx-auto overflow-hidden">
            <CardContent className="p-8">
                <div className="flex flex-col items-center mb-6">
                    <div className="mb-4">
                        <svg viewBox="0 0 24 24" className="w-8 h-8"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                    </div>
                    <h1 className="text-2xl font-normal mb-2 text-[#e8eaed]">Sign in with Google</h1>
                    <p className="text-[#9aa0a6] text-base">to continue to <span className="text-[#e8eaed]">MusicIQ</span></p>
                </div>

                {/* Account Chip */}
                <div className="border border-[#5f6368] rounded-full p-1 pr-4 flex items-center mb-8 cursor-pointer hover:bg-[#303134] transition-colors">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 text-white">
                        {userName.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-[#e8eaed]">{userName}</span>
                        <span className="text-xs text-[#9aa0a6]">{userName.toLowerCase().replace(/\s/g, '')}@gmail.com</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#9aa0a6] ml-auto" />
                </div>

                <div className="mb-10">
                    <p className="text-sm text-[#e8eaed] mb-4">To continue, Google will share your name, email address, language preference, and profile picture with MusicIQ.</p>
                    <div className="flex items-center text-[#8ab4f8] text-sm cursor-pointer hover:underline">
                        <Lock className="w-3 h-3 mr-2" />
                        Before using this app, you can review MusicIQ's privacy policy and terms of service.
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        onClick={() => window.location.href = "/"}
                        className="text-[#8ab4f8] font-medium text-sm px-4 py-2 rounded hover:bg-[#8ab4f8]/10 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAllow}
                        disabled={isLoading}
                        className="bg-[#8ab4f8] text-[#202124] font-medium text-sm px-6 py-2 rounded hover:bg-[#aecbfa] transition-colors"
                    >
                        {isLoading ? "Connecting..." : "Continue"}
                    </button>
                </div>
            </CardContent>
        </Card>
    )
}

function AppleAuth({ userName }) {
    const [isLoading, setIsLoading] = useState(false)

    const handleAllow = () => {
        setIsLoading(true)
        setTimeout(() => {
            localStorage.setItem("connectedService", "apple")
            window.location.href = "/analysis"
        }, 1500)
    }

    return (
        <div className="w-full bg-[#323232] text-white rounded-xl shadow-2xl overflow-hidden font-sans">
            <div className="p-10 text-center">
                <div className="mb-8">
                    <svg className="w-12 h-12 mx-auto text-white fill-current" viewBox="0 0 384 512">
                        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z" />
                    </svg>
                </div>

                <h1 className="text-2xl font-bold mb-2">Apple ID</h1>
                <p className="text-lg text-gray-300 mb-8">Sign in to MusicIQ</p>

                <div className="bg-[#1c1c1e] rounded-xl overflow-hidden mb-8 text-left">
                    <div className="border-b border-[#38383a] p-4 flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Apple ID</span>
                        <span className="text-white text-sm">{userName.toLowerCase().replace(/\s/g, '')}@icloud.com</span>
                    </div>
                    <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-[#2c2c2e]">
                        <span className="text-gray-400 text-sm">Password</span>
                        <span className="text-white text-sm">•••••••••••••</span>
                    </div>
                </div>

                <div className="mb-8 flex items-center justify-center text-[#0071e3] text-sm cursor-pointer">
                    <span className="hover:underline">Forgotten your Apple ID or password?</span>
                </div>

                <div className="mb-10 text-xs text-gray-400 leading-relaxed">
                    Your Apple ID information is used to enable you to sign in securely and access your data. Apple records certain data for security, support, and reporting purposes. <span className="text-[#0071e3] cursor-pointer hover:underline">See how your data is managed...</span>
                </div>

                <button
                    onClick={handleAllow}
                    disabled={isLoading}
                    className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center mx-auto hover:bg-white hover:text-black transition-all"
                >
                    {isLoading ? <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : <ChevronRight className="w-6 h-6" />}
                </button>
            </div>
        </div>
    )
}
