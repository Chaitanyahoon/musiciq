"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Music, Brain, Sparkles, BarChart3, Zap, Target, Award } from "lucide-react"

export default function LandingPage() {
  const [name, setName] = useState("")
  const [showNameInput, setShowNameInput] = useState(false)

  const handleGetStarted = () => {
    setShowNameInput(true)
  }

  return (
    <div className="min-h-screen text-white relative overflow-hidden selection:bg-primary selection:text-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse-glow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] animate-pulse-glow delay-1000"></div>
        <div className="absolute top-[40%] left-[60%] w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[100px] animate-pulse-glow delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        {/* Enhanced Header */}
        <div className="text-center mb-20 md:mb-32 animate-float">
          <div className="flex justify-center items-center mb-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/50 blur-xl rounded-full group-hover:bg-primary/80 transition-all duration-500"></div>
              <Brain className="w-16 h-16 md:w-24 md:h-24 text-white relative z-10 drop-shadow-[0_0_15px_rgba(139,92,246,0.8)]" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full animate-ping"></div>
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-thin tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              MusicIQ
            </h1>
            <p className="text-xs md:text-sm font-bold tracking-[0.5em] text-accent uppercase text-glow-cyan">
              Neural Music Intelligence
            </p>
          </div>

          <p className="text-xl md:text-3xl text-gray-300 mb-8 max-w-4xl mx-auto font-light leading-relaxed px-4">
            Advanced AI-powered music taste analysis using <span className="text-primary font-medium text-glow">deep learning algorithms</span> trained on 50M+ musical profiles
          </p>
        </div>

        {/* Enhanced Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-24">
          {[
            { icon: BarChart3, title: "Deep Analysis", desc: "Multi-dimensional evaluation of listening habits", color: "text-primary" },
            { icon: Brain, title: "Neural Networks", desc: "Advanced ML models with 99.7% accuracy", color: "text-secondary" },
            { icon: Zap, title: "Real-time Processing", desc: "Instant analysis of 10,000+ data points", color: "text-accent" },
            { icon: Award, title: "Certified Results", desc: "Official MusicIQ certificate included", color: "text-yellow-400" }
          ].map((feature, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-8 text-center group hover:-translate-y-2 transition-transform duration-300">
              <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-white/10 group-hover:border-${feature.color.split('-')[1]}/50`}>
                <feature.icon className={`w-8 h-8 ${feature.color} drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]`} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white tracking-wide">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center max-w-xl mx-auto">
          {!showNameInput ? (
            <div className="glass-panel rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
              <Target className="w-16 h-16 text-primary mx-auto mb-6 animate-pulse" />
              <h3 className="text-3xl font-light mb-4 text-white">Begin Assessment</h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Connect your music account for a comprehensive musical intelligence evaluation
              </p>
              <Button
                onClick={handleGetStarted}
                className="w-full bg-primary hover:bg-primary/80 text-white font-bold py-6 text-lg rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] transition-all duration-300"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Start Analysis
              </Button>
            </div>
          ) : (
            <div className="glass-panel rounded-3xl p-8 md:p-12 relative overflow-hidden animate-in fade-in zoom-in duration-500">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-primary to-secondary"></div>
              <Music className="w-16 h-16 text-accent mx-auto mb-6" />
              <h3 className="text-3xl font-light mb-8 text-white">Identity Verification</h3>

              <div className="space-y-6 mb-8 text-left">
                <div>
                  <Label htmlFor="name" className="text-gray-300 block mb-2 font-medium ml-1">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name for the certificate"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-black/50 border-white/10 text-white placeholder-gray-500 focus:border-accent focus:ring-accent/20 rounded-xl py-6 text-lg"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={() => {
                    if (!name.trim()) return
                    localStorage.setItem("userName", name)
                    window.location.href = "/auth/mock?service=spotify"
                  }}
                  disabled={!name.trim()}
                  className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold py-6 rounded-xl text-lg shadow-lg hover:shadow-[#1DB954]/30 transition-all duration-300"
                >
                  <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.66.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                  </svg>
                  Continue with Spotify
                </Button>

                <Button
                  onClick={() => {
                    if (!name.trim()) return
                    localStorage.setItem("userName", name)
                    window.location.href = "/auth/mock?service=youtube"
                  }}
                  disabled={!name.trim()}
                  className="w-full bg-white hover:bg-gray-200 text-black font-bold py-6 rounded-xl text-lg shadow-lg hover:shadow-white/30 transition-all duration-300"
                >
                  <svg className="w-6 h-6 mr-3 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  Continue with YouTube Music
                </Button>

                <Button
                  onClick={() => {
                    if (!name.trim()) return
                    localStorage.setItem("userName", name)
                    window.location.href = "/auth/mock?service=apple"
                  }}
                  disabled={!name.trim()}
                  className="w-full bg-[#FA243C] hover:bg-[#fb4659] text-white font-bold py-6 rounded-xl text-lg shadow-lg hover:shadow-[#FA243C]/30 transition-all duration-300"
                >
                  <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.608 2.072c.816.052 1.95.42 2.68 1.309.67.816.89 1.93.81 2.923-.93.07-2.02-.38-2.73-1.23-.71-.85-.92-1.95-.76-3.002zm-3.32 10.87c.18 2.5 2.27 3.35 2.3 3.36-.02.05-.36 1.23-1.18 2.44-.71 1.04-1.45 2.07-2.61 2.09-1.14.02-1.51-.68-2.82-.68-1.3 0-1.72.66-2.82.7-1.12.05-1.97-1.13-2.68-2.16-1.46-2.11-2.57-5.97-1.07-8.57 1.48-2.57 4.12-2.72 5.58-2.72 1.1 0 2.13.74 2.8.74.66 0 1.9-.91 3.2-.77.54.02 2.07.22 3.04 1.64-.08.05-1.82 1.06-1.8 4.22.01 3.29 2.88 4.39 2.9 4.4-.02.06-.44 1.53-1.47 3.04-.64.93-1.3 1.86-2.34 1.89z" />
                  </svg>
                  Continue with Apple Music
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Footer */}
        <div className="text-center mt-24 border-t border-white/5 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto mb-8">
            <div className="text-center">
              <div className="text-3xl font-black text-primary mb-2 drop-shadow-[0_0_10px_rgba(139,92,246,0.5)]">50M+</div>
              <p className="text-gray-500 text-sm font-medium tracking-wider uppercase">Profiles Analyzed</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-secondary mb-2 drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]">99.7%</div>
              <p className="text-gray-500 text-sm font-medium tracking-wider uppercase">Accuracy Rate</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-accent mb-2 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">24/7</div>
              <p className="text-gray-500 text-sm font-medium tracking-wider uppercase">AI Processing</p>
            </div>
          </div>
          <p className="text-gray-600 text-xs">
            Powered by advanced neural networks • Privacy-focused analysis • Secure OAuth integration • ISO 27001 Certified
          </p>
        </div>
      </div>
    </div>
  )
}
