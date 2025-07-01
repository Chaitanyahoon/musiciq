"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Brain, CheckCircle, Zap } from "lucide-react"
import { generateRealQuestions } from "@/lib/real-quiz-generator"

export default function Quiz() {
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [userName, setUserName] = useState("")
  const [spotifyData, setSpotifyData] = useState(null)

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

    setTimeout(() => {
      const newAnswers = [...answers, selectedAnswer]
      setAnswers(newAnswers)
      setSelectedAnswer("")
      setIsProcessing(false)

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        // Store answers and go to results
        localStorage.setItem("quizAnswers", JSON.stringify(newAnswers))
        setTimeout(() => {
          window.location.href = "/results"
        }, 1000)
      }
    }, 1800)
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-12 h-12 text-blue-400 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-400">Generating personalized questions from your Spotify data...</p>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white flex items-center justify-center">
        <Card className="max-w-lg mx-4 bg-slate-800/30 border-slate-700/50 backdrop-blur-xl">
          <CardContent className="p-10 text-center">
            <div className="relative mb-6">
              <Zap className="w-16 h-16 text-blue-400 mx-auto animate-pulse" />
              <div className="absolute inset-0 w-16 h-16 mx-auto border-4 border-blue-400/30 rounded-full animate-ping"></div>
            </div>
            <h3 className="text-2xl font-light text-white mb-4">Processing Response</h3>
            <p className="text-gray-400">Cross-referencing with your Spotify data...</p>
            <div className="mt-6 w-full bg-slate-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full w-1/3 animate-pulse"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-6">
            <Brain className="w-10 h-10 text-blue-400 mr-3 animate-pulse" />
            <h1 className="text-4xl font-light text-white">Musical Intelligence Assessment</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Personalized evaluation for <span className="text-blue-400 font-medium">{userName}</span>
          </p>
          <p className="text-sm text-gray-500 mt-2">Based on your real Spotify listening data</p>
        </div>

        {/* Enhanced Progress */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex justify-between text-sm text-gray-400 mb-3">
            <span>
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 h-3 rounded-full transition-all duration-700 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Enhanced Question Card */}
        <Card className="max-w-4xl mx-auto bg-slate-800/30 border-slate-700/50 backdrop-blur-xl shadow-2xl">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl text-center text-white font-light leading-relaxed px-4">
              {question.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect} className="space-y-4">
              {question.options.map((option, index) => (
                <div
                  key={option.value}
                  className="group flex items-center space-x-4 p-6 rounded-xl border border-slate-600/50 hover:bg-slate-700/30 hover:border-blue-500/50 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedAnswer(option.value)}
                >
                  <RadioGroupItem value={option.value} id={option.value} className="text-blue-400" />
                  <Label
                    htmlFor={option.value}
                    className="text-gray-300 cursor-pointer flex-1 text-lg group-hover:text-white transition-colors"
                  >
                    <span className="text-blue-400 font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="mt-10 text-center">
              <Button
                onClick={handleNextQuestion}
                disabled={!selectedAnswer}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white font-medium py-4 px-12 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-lg hover:shadow-xl"
              >
                {currentQuestion === questions.length - 1 ? (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Complete Assessment
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 mr-2" />
                    Process & Continue
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Footer */}
        <div className="text-center mt-12">
          <p className="text-xs text-gray-500">
            Questions generated from your actual Spotify data • Advanced AI Analysis • Secure & Private
          </p>
        </div>
      </div>
    </div>
  )
}
