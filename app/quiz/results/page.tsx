"use client"

import React, { useEffect, useState } from "react"
import { useQuiz } from "@/components/quiz-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Target, RotateCcw, Eye } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { MotivationalPopup } from "@/components/motivational-popup"
import Loader from "@/components/Loader";

export default function ResultsPage() {
  const { state } = useQuiz()
  const router = useRouter()
  const [showPopup, setShowPopup] = useState(false)

  // Calculate results
  const totalQuestions = state.questions.length
  const answeredQuestions = Object.values(state.answers).filter((answer) => answer !== null).length
  const correctAnswers = state.questions.filter(
    (question, index) => state.answers[question.id] === question.correctAnswer,
  ).length
  const incorrectAnswers = answeredQuestions - correctAnswers
  const skippedQuestions = totalQuestions - answeredQuestions

  // Calculate score with negative marking (+4 correct, -1 incorrect, 0 skipped)
  const totalScore = correctAnswers * 4 - incorrectAnswers * 1
  const maxPossibleScore = totalQuestions * 4
  const percentage = Math.max(0, (totalScore / maxPossibleScore) * 100)

  // Calculate time taken
  const timeTaken =
    state.startTime && state.endTime ? Math.round((state.endTime.getTime() - state.startTime.getTime()) / 1000 / 60) : 0

  useEffect(() => {
    if (state.questions.length === 0) {
      router.push("/exams")
      return
    }

    // Show motivational popup after a short delay
    const timer = setTimeout(() => {
      setShowPopup(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [state.questions.length, router])

  if (state.questions.length === 0) {
    return <Loader />;
  }

  // Semicircle chart calculations
  const radius = 90
  const semicirc = Math.PI * radius // Only half the circumference
  const centerX = 110
  const centerY = 110
  const correctRatio = correctAnswers / totalQuestions
  const incorrectRatio = incorrectAnswers / totalQuestions
  const notAttemptedRatio = skippedQuestions / totalQuestions

  // Arc lengths for semicircle
  const correctLength = correctRatio > 0 ? (semicirc * correctRatio) : 0
  const incorrectLength = incorrectRatio > 0 ? (semicirc * incorrectRatio) : 0
  const notAttemptedLength = notAttemptedRatio > 0 ? (semicirc * notAttemptedRatio) : 0

  // Soft pastel colors
  const colorCorrect = '#34d399' // emerald-400
  const colorIncorrect = '#f87171' // red-400
  const colorNotAttempted = '#a1a1aa' // zinc-400

  // Animated state
  const [animate, setAnimate] = useState(false)
  useEffect(() => {
    setTimeout(() => setAnimate(true), 200)
  }, [])

  // Helper to get arc path for a semicircle segment
  function getArcPath(cx: number, cy: number, r: number, startAngle: number, arcLength: number) {
    const endAngle = startAngle + arcLength
    const start = {
      x: cx + r * Math.cos(startAngle),
      y: cy + r * Math.sin(startAngle),
    }
    const end = {
      x: cx + r * Math.cos(endAngle),
      y: cy + r * Math.sin(endAngle),
    }
    const largeArcFlag = arcLength > Math.PI ? 1 : 0
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`
  }

  // Animated arc lengths
  const animCorrect = animate ? correctLength : 0
  const animIncorrect = animate ? incorrectLength : 0
  const animNotAttempted = animate ? notAttemptedLength : 0

  // Angles for each segment (in radians)
  let startAngle = Math.PI // leftmost point (180deg)
  const correctArc = getArcPath(centerX, centerY, radius, startAngle, (animCorrect / semicirc) * Math.PI)
  startAngle += (animCorrect / semicirc) * Math.PI
  const incorrectArc = getArcPath(centerX, centerY, radius, startAngle, (animIncorrect / semicirc) * Math.PI)
  startAngle += (animIncorrect / semicirc) * Math.PI
  const notAttemptedArc = getArcPath(centerX, centerY, radius, startAngle, (animNotAttempted / semicirc) * Math.PI)

  return (
    <div className="container max-w-4xl py-8">
      <div className="flex flex-col md:flex-row bg-white dark:bg-[#232323] rounded-2xl p-6 md:p-8 mb-8 shadow-lg items-center">
        {/* Semicircular Progress Chart */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <svg width="220" height="120" viewBox="0 0 220 120">
            {/* Correct (Soft Green) */}
            {correctLength > 0 && (
              <path
                d={correctArc}
                stroke={colorCorrect}
                strokeWidth="14"
                fill="none"
                strokeLinecap="round"
                style={{ transition: 'd 1s' }}
              />
            )}
            {/* Incorrect (Soft Red) */}
            {incorrectLength > 0 && (
              <path
                d={incorrectArc}
                stroke={colorIncorrect}
                strokeWidth="14"
                fill="none"
                strokeLinecap="round"
                style={{ transition: 'd 1s' }}
              />
            )}
            {/* Not Attempted (Soft Gray) */}
            {notAttemptedLength > 0 && (
              <path
                d={notAttemptedArc}
                stroke={colorNotAttempted}
                strokeWidth="14"
                fill="none"
                strokeLinecap="round"
                style={{ transition: 'd 1s' }}
              />
            )}
          </svg>
          <div className="-mt-10 text-center">
            <div className="text-4xl font-bold text-gray-900 dark:text-white">{correctAnswers + incorrectAnswers}/{totalQuestions}</div>
            <div className="text-lg text-green-500 dark:text-green-400 font-semibold">Solved</div>
            <div className="text-gray-500 dark:text-gray-400">{skippedQuestions} Attempting</div>
          </div>
        </div>
        {/* Stats on the right */}
        <div className="flex flex-col gap-4 ml-0 md:ml-8 mt-8 md:mt-0 w-full md:w-auto">
          <div className="rounded-lg px-6 py-3 flex items-center justify-between shadow border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#232323]">
            <span className="text-green-500 dark:text-green-400 font-semibold text-lg">Correct</span>
            <span className="text-gray-900 dark:text-white font-bold text-lg">{correctAnswers}</span>
          </div>
          <div className="rounded-lg px-6 py-3 flex items-center justify-between shadow border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#232323]">
            <span className="text-red-500 dark:text-red-400 font-semibold text-lg">Incorrect</span>
            <span className="text-gray-900 dark:text-white font-bold text-lg">{incorrectAnswers}</span>
          </div>
          <div className="rounded-lg px-6 py-3 flex items-center justify-between shadow border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#232323]">
            <span className="text-gray-500 dark:text-gray-400 font-semibold text-lg">Not Attempted</span>
            <span className="text-gray-900 dark:text-white font-bold text-lg">{skippedQuestions}</span>
          </div>
        </div>
      </div>

      {/* Performance Analysis */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Performance Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Accuracy Rate</span>
              <Badge variant={percentage >= 75 ? "default" : percentage >= 50 ? "secondary" : "destructive"}>
                {answeredQuestions > 0 ? ((correctAnswers / answeredQuestions) * 100).toFixed(1) : 0}%
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Completion Rate</span>
              <Badge variant="outline">{((answeredQuestions / totalQuestions) * 100).toFixed(1)}%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Average Time per Question</span>
              <Badge variant="outline">{answeredQuestions > 0 ? (timeTaken / answeredQuestions).toFixed(1) : 0}m</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/quiz/review">
          <Button variant="outline" className="w-full sm:w-auto bg-transparent">
            <Eye className="h-4 w-4 mr-2" />
            Review Answers
          </Button>
        </Link>
        <Link href={`/exams`}>
          <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
            <RotateCcw className="h-4 w-4 mr-2" />
            Back to Subjects
          </Button>
        </Link>
      </div>

      <MotivationalPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        score={percentage}
        correctAnswers={correctAnswers}
        totalQuestions={totalQuestions}
      />
    </div>
  )
}
