"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"

interface Question {
  id: string
  text: string
  options: string[]
  correctAnswer: number
  year?: string
  explanation?: string
}

interface QuizState {
  currentQuestionIndex: number
  answers: Record<string, number | null>
  questions: Question[]
  examName: string
  subjectName: string
  startTime: Date | null
  endTime: Date | null
}

type QuizAction =
  | { type: "SET_QUIZ"; payload: { questions: Question[]; examName: string; subjectName: string } }
  | { type: "SET_ANSWER"; payload: { questionId: string; answer: number | null } }
  | { type: "NEXT_QUESTION" }
  | { type: "PREVIOUS_QUESTION" }
  | { type: "START_QUIZ" }
  | { type: "END_QUIZ" }
  | { type: "RESET_QUIZ" }

const initialState: QuizState = {
  currentQuestionIndex: 0,
  answers: {},
  questions: [],
  examName: "",
  subjectName: "",
  startTime: null,
  endTime: null,
}

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "SET_QUIZ":
      return {
        ...state,
        questions: action.payload.questions,
        examName: action.payload.examName,
        subjectName: action.payload.subjectName,
        currentQuestionIndex: 0,
        answers: {},
      }
    case "SET_ANSWER":
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.questionId]: action.payload.answer,
        },
      }
    case "NEXT_QUESTION":
      return {
        ...state,
        currentQuestionIndex: Math.min(state.currentQuestionIndex + 1, state.questions.length - 1),
      }
    case "PREVIOUS_QUESTION":
      return {
        ...state,
        currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
      }
    case "START_QUIZ":
      return {
        ...state,
        startTime: new Date(),
      }
    case "END_QUIZ":
      return {
        ...state,
        endTime: new Date(),
      }
    case "RESET_QUIZ":
      return initialState
    default:
      return state
  }
}

const QuizContext = createContext<{
  state: QuizState
  dispatch: React.Dispatch<QuizAction>
} | null>(null)

export function QuizProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(quizReducer, initialState)

  return <QuizContext.Provider value={{ state, dispatch }}>{children}</QuizContext.Provider>
}

export function useQuiz() {
  const context = useContext(QuizContext)
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider")
  }
  return context
}
