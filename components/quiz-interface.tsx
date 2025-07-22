"use client"

import { useState } from "react"
import { useQuiz } from "./quiz-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, Lightbulb, MessageSquare, SkipBackIcon as Skip } from "lucide-react"
import { HintModal } from "./hint-modal"
import { SuggestionModal } from "./suggestion-modal"
import { useRouter } from "next/navigation"
import Loader from "./ui/Loader"

export function QuizInterface() {
  const { state, dispatch } = useQuiz()
  const router = useRouter()
  const [showHint, setShowHint] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const currentQuestion = state.questions[state.currentQuestionIndex]
  const currentAnswer = state.answers[currentQuestion?.id]
  const progress = ((state.currentQuestionIndex + 1) / state.questions.length) * 100

  if (!currentQuestion) {
    return <Loader />
  }

  const handleOptionSelect = (optionIndex: number) => {
    dispatch({
      type: "SET_ANSWER",
      payload: {
        questionId: currentQuestion.id,
        answer: optionIndex,
      },
    })
  }

  const handleNext = () => {
    if (state.currentQuestionIndex === state.questions.length - 1) {
      // End quiz
      dispatch({ type: "END_QUIZ" })
      router.push("/quiz/results")
    } else {
      dispatch({ type: "NEXT_QUESTION" })
    }
  }

  const handlePrevious = () => {
    dispatch({ type: "PREVIOUS_QUESTION" })
  }

  const handleSkip = () => {
    dispatch({
      type: "SET_ANSWER",
      payload: {
        questionId: currentQuestion.id,
        answer: null,
      },
    })
    handleNext()
  }

  const isFirstQuestion = state.currentQuestionIndex === 0
  const isLastQuestion = state.currentQuestionIndex === state.questions.length - 1

  return (
    <div className="container max-w-4xl py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">
            {state.examName} - {state.subjectName}
          </h1>
          <Badge variant="outline">
            Question: {state.currentQuestionIndex + 1} / {state.questions.length}
          </Badge>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Question {state.currentQuestionIndex + 1}</CardTitle>
            <div className="flex items-center gap-2">
              {currentQuestion.year && (
                <Badge variant="secondary">Asked in: {currentQuestion.year}</Badge>
              )}
              <Button variant="outline" size="sm" onClick={() => setShowHint(true)}>
                <Lightbulb className="h-4 w-4 mr-2" />
                Hint
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowSuggestions(true)}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Suggestions
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-6 leading-relaxed">{currentQuestion.text}</p>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${currentAnswer === index
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${currentAnswer === index ? "border-blue-500 bg-blue-500" : "border-gray-300 dark:border-gray-600"
                      }`}
                  >
                    {currentAnswer === index && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Remove the old helper icons section here */}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={handlePrevious} disabled={isFirstQuestion}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        <div className="flex gap-2">
          {currentAnswer === null || currentAnswer === undefined ? (
            <Button variant="outline" onClick={handleSkip}>
              <Skip className="h-4 w-4 mr-2" />
              Skip
            </Button>
          ) : (
            <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
              {isLastQuestion ? "Submit Quiz" : "Next"}
              {!isLastQuestion && <ChevronRight className="h-4 w-4 ml-2" />}
            </Button>
          )}
        </div>
      </div>

      {/* Modals */}
      <HintModal isOpen={showHint} onClose={() => setShowHint(false)} question={currentQuestion.text} />
      <SuggestionModal
        isOpen={showSuggestions}
        onClose={() => setShowSuggestions(false)}
        questionId={currentQuestion.id}
      />
    </div>
  )
}
