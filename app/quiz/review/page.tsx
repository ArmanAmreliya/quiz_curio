"use client"

import { useQuiz } from "@/components/quiz-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle, XCircle, MinusCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Loader from "@/components/Loader";

export default function ReviewPage() {
  const { state } = useQuiz()
  const router = useRouter()

  useEffect(() => {
    if (state.questions.length === 0) {
      router.push("/exams")
    }
  }, [state.questions.length, router])

  if (state.questions.length === 0) {
    return <Loader />;
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/quiz/results">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Results
          </Button>
        </Link>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Answer Review</h1>
        <p className="text-muted-foreground">
          {state.examName} - {state.subjectName}
        </p>
      </div>

      <div className="space-y-6">
        {state.questions.map((question, index) => {
          const userAnswer = state.answers[question.id]
          const isCorrect = userAnswer === question.correctAnswer
          const isSkipped = userAnswer === null || userAnswer === undefined

          return (
            <Card key={question.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Question {index + 1}</CardTitle>
                  <div className="flex items-center gap-2">
                    {question.year && <Badge variant="outline">{question.year}</Badge>}
                    <Badge
                      variant={isSkipped ? "secondary" : isCorrect ? "default" : "destructive"}
                      className="flex items-center gap-1"
                    >
                      {isSkipped ? (
                        <>
                          <MinusCircle className="h-3 w-3" />
                          Skipped
                        </>
                      ) : isCorrect ? (
                        <>
                          <CheckCircle className="h-3 w-3" />
                          Correct
                        </>
                      ) : (
                        <>
                          <XCircle className="h-3 w-3" />
                          Incorrect
                        </>
                      )}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-lg mb-6 leading-relaxed">{question.text}</p>

                <div className="space-y-3 mb-6">
                  {question.options.map((option, optionIndex) => {
                    const isUserAnswer = userAnswer === optionIndex
                    const isCorrectAnswer = optionIndex === question.correctAnswer

                    let className = "w-full p-4 text-left rounded-lg border-2 transition-all "

                    if (isCorrectAnswer) {
                      className += "border-green-500 bg-green-50 dark:bg-green-950 "
                    } else if (isUserAnswer && !isCorrect) {
                      className += "border-red-500 bg-red-50 dark:bg-red-950 "
                    } else {
                      className += "border-gray-200 dark:border-gray-700 "
                    }

                    return (
                      <div key={optionIndex} className={className}>
                        <div className="flex items-center">
                          <div
                            className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${isCorrectAnswer
                              ? "border-green-500 bg-green-500"
                              : isUserAnswer && !isCorrect
                                ? "border-red-500 bg-red-500"
                                : "border-gray-300 dark:border-gray-600"
                              }`}
                          >
                            {(isCorrectAnswer || (isUserAnswer && !isCorrect)) && (
                              <div className="w-2 h-2 rounded-full bg-white" />
                            )}
                          </div>
                          <span className="font-medium mr-2">{String.fromCharCode(65 + optionIndex)}.</span>
                          <span>{option}</span>
                          {isCorrectAnswer && <CheckCircle className="h-4 w-4 text-green-600 ml-auto" />}
                          {isUserAnswer && !isCorrect && <XCircle className="h-4 w-4 text-red-600 ml-auto" />}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {question.explanation && (
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Explanation:</h4>
                    <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">{question.explanation}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="mt-8 text-center">
        <Link href="/exams">
          <Button className="bg-blue-600 hover:bg-blue-700">Take Another Quiz</Button>
        </Link>
      </div>
    </div>
  )
}
