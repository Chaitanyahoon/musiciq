"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Brain, CheckCircle, Zap, TrendingUp, TrendingDown } from "lucide-react"
import { generateRealQuestions } from "@/lib/real-quiz-generator"

export default function Quiz() {
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [userName, setUserName] = useState("")
  const [spotifyData, setSpotifyData] = useState(null)

  // New state for Live IQ
  const [liveIQ, setLiveIQ] = useState(120)
  const [iqTrend, setIqTrend] = useState("stable") // stable, up, down

  useEffect(() => {
    const name = localStorage.getItem("userName") || "Anonymous"
    const data = JSON.parse(localStorage.getItem("spotifyAnalysis") || "{}")

    setUserName(name)
    setSpotifyData(data)

    if (Object.keys(data).length > 0) {
      const generatedQuestions = generateRealQuestions(data)
      setQuestions(generatedQuestions)
    } else {
      // Redirect back if no data
      window.location.href = "/"
    }
  }, [])

  const handleAnswerSelect = (value) => {
    setSelectedAnswer(value)
  }

  const handleNextQuestion = () => {
    if (!selectedAnswer) return

    setIsProcessing(true)

    // Simulate IQ change based on answer (randomized for effect)
    const iqChange = Math.floor(Math.random() * 10) - 3
    const newIQ = Math.max(60, Math.min(160, liveIQ + iqChange))
    setIqTrend(iqChange > 0 ? "up" : "down")
    setLiveIQ(newIQ)

    setTimeout(() => {
      const newAnswers = [...answers, selectedAnswer]
      setAnswers(newAnswers)
      setSelectedAnswer("")
      setIsProcessing(false)
      setIqTrend("stable")

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        // Store answers and go to results
        localStorage.setItem("quizAnswers", JSON.stringify(newAnswers))
        setTimeout(() => {
          window.location.href = "/results"
        }, 1000)
      }
    }, 1500)
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]" />
          <p className="text-gray-400 text-glow">Generating personalized questions from your music data...</p>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  // Dynamic theme based on phase
  const getPhaseColor = () => {
    switch (question.phase) {
      case "roast": return "text-red-500 text-glow-pink"
      case "doubt": return "text-purple-400 text-glow"
      default: return "text-blue-400 text-glow-cyan"
    }
  }

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse-glow"></div>
        </div>

        <div className="glass-panel max-w-lg mx-4 border-primary/30 animate-in zoom-in duration-300">
          <div className="p-10 text-center">
            <div className="relative mb-6">
              <Zap className="w-16 h-16 text-primary mx-auto animate-pulse drop-shadow-[0_0_15px_rgba(139,92,246,0.8)]" />
              <div className="absolute inset-0 w-16 h-16 mx-auto border-4 border-primary/30 rounded-full animate-ping"></div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 text-glow">Analyzing Response</h3>
            <p className="text-gray-300">Adjusting Music IQ Estimate...</p>
            <div className="mt-8 text-6xl font-black flex justify-center items-center gap-4">
              <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">{liveIQ}</span>
              {iqTrend === "up" && <TrendingUp className="text-green-400 w-10 h-10 animate-bounce drop-shadow-[0_0_10px_#22c55e]" />}
              {iqTrend === "down" && <TrendingDown className="text-red-400 w-10 h-10 animate-bounce drop-shadow-[0_0_10px_#ef4444]" />}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden font-sans">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header with Live IQ */}
        <div className="flex justify-between items-center mb-12 max-w-4xl mx-auto glass-panel p-6 rounded-2xl border-white/10">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1 tracking-tight">Assessment in Progress</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Phase:</span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full bg-white/5 border border-white/10 uppercase tracking-wider ${getPhaseColor()}`}>
                {question.phase || "Analysis"}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-1 font-bold">Live Music IQ</p>
            <div className={`text-4xl md:text-5xl font-black ${liveIQ > 100 ? "text-green-400 text-glow-green" : liveIQ > 80 ? "text-yellow-400 text-glow-yellow" : "text-red-500 text-glow-pink"}`}>
              {liveIQ}
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden border border-white/5">
            <div
              className="bg-gradient-to-r from-primary via-secondary to-accent h-2 rounded-full transition-all duration-700 relative shadow-[0_0_15px_rgba(139,92,246,0.5)]"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white]"></div>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="glass-panel max-w-4xl mx-auto rounded-3xl overflow-hidden border-white/10 shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-50"></div>

          <div className="p-8 md:p-12">
            <h2 className="text-2xl md:text-4xl text-center text-white font-light leading-tight mb-10 px-2 md:px-4">
              {question.question}
            </h2>

            <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect} className="space-y-4">
              {question.options.map((option, index) => (
                <div
                  key={option.value}
                  className={`group flex items-center space-x-4 p-5 md:p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${selectedAnswer === option.value
                    ? "bg-primary/20 border-primary shadow-[0_0_20px_rgba(139,92,246,0.2)]"
                    : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20 hover:scale-[1.01]"
                    }`}
                  onClick={() => setSelectedAnswer(option.value)}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-bold text-lg transition-colors ${selectedAnswer === option.value
                    ? "border-primary bg-primary text-white shadow-[0_0_10px_#8b5cf6]"
                    : "border-white/20 text-gray-400 group-hover:border-white/50 group-hover:text-white"
                    }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <Label
                    htmlFor={option.value}
                    className={`cursor-pointer flex-1 text-lg md:text-xl font-light transition-colors ${selectedAnswer === option.value ? "text-white" : "text-gray-300 group-hover:text-white"
                      }`}
                  >
                    {option.text}
                  </Label>
                  <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
                </div>
              ))}
            </RadioGroup>

            <div className="mt-12 text-center">
              <Button
                onClick={handleNextQuestion}
                disabled={!selectedAnswer}
                className="bg-white text-black hover:bg-gray-200 font-bold py-6 px-12 rounded-full transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed text-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transform hover:scale-105 active:scale-95 uppercase tracking-widest"
              >
                {currentQuestion === questions.length - 1 ? (
                  <>
                    <CheckCircle className="w-5 h-5 mr-3" />
                    Complete Assessment
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 mr-3" />
                    Submit Answer
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
