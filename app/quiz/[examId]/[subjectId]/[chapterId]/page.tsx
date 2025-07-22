"use client"

import { use } from "react"
import { useEffect } from "react"
import { useQuiz } from "@/components/quiz-provider"
import { QuizInterface } from "@/components/quiz-interface"
import { notFound } from "next/navigation"

// Mock questions data
const mockQuestions = {
  mechanics: [
    {
      id: "mech_1",
      text: "A ball is thrown vertically upward with an initial velocity of 20 m/s. What is the maximum height reached by the ball? (Take g = 10 m/s²)",
      options: ["15 m", "20 m", "25 m", "30 m"],
      correctAnswer: 1,
      year: "JEE 2022",
      explanation: "Using v² = u² - 2gh, at maximum height v = 0, so h = u²/2g = 400/20 = 20 m",
    },
    {
      id: "mech_2",
      text: "Two blocks of masses 2 kg and 3 kg are connected by a string passing over a pulley. What is the acceleration of the system?",
      options: ["2 m/s²", "4 m/s²", "6 m/s²", "8 m/s²"],
      correctAnswer: 0,
      year: "JEE 2021",
      explanation: "For Atwood machine: a = (m₂ - m₁)g/(m₁ + m₂) = (3-2)×10/(2+3) = 2 m/s²",
    },
    {
      id: "mech_3",
      text: "A body is projected horizontally from the top of a 45 m high tower with a speed of 10 m/s. How far from the base will it strike the ground? (Take g = 10 m/s²)",
      options: ["20 m", "25 m", "30 m", "35 m"],
      correctAnswer: 2,
      year: "JEE 2020",
      explanation: "Time to fall: t = √(2h/g) = √(2×45/10) = 3 s. Horizontal distance = u×t = 10×3 = 30 m",
    },

    {
      id: "mech_4",
      text: "A spring of spring constant 200 N/m is compressed by 0.1 m. What is the potential energy stored in the spring?",
      options: ["0.5 J", "1 J", "1.5 J", "2 J"],
      correctAnswer: 0,
      year: "JEE 2019",
      explanation: "PE = ½kx² = ½×200×(0.1)² = 1 J",
    },

    {
      id: "mech_5",
      text: "A car accelerates from rest at 2 m/s² for 10 seconds. What is the distance covered?",
      options: ["100 m", "50 m", "200 m", "150 m"],
      correctAnswer: 1,
      year: "JEE 2018",
      explanation: "Using s = ut + ½at², u = 0 ⇒ s = ½×2×10² = 100 m",
    },

  ],
}

const examNames = {
  jee: "JEE",
  neet: "NEET",
  upsc: "UPSC",
}

const subjectNames = {
  physics: "Physics",
  chemistry: "Chemistry",
  mathematics: "Mathematics",
}

export default function QuizPage({
  params,
}: {
  params: Promise<{ examId: string; subjectId: string; chapterId: string }>
}) {
  const { examId, subjectId, chapterId } = use(params)
  const { dispatch } = useQuiz()

  const examName = examNames[examId as keyof typeof examNames]
  const subjectName = subjectNames[subjectId as keyof typeof subjectNames]
  const questions = mockQuestions[chapterId as keyof typeof mockQuestions]

  useEffect(() => {
    if (questions && examName && subjectName) {
      dispatch({
        type: "SET_QUIZ",
        payload: {
          questions,
          examName,
          subjectName,
        },
      })
      dispatch({ type: "START_QUIZ" })
    }
  }, [dispatch, questions, examName, subjectName])

  if (!examName || !subjectName || !questions) {
    notFound()
  }

  return <QuizInterface />
}
