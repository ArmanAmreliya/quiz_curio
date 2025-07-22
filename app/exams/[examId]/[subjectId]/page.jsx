"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Play, BookOpen } from "lucide-react"
import { notFound } from "next/navigation"
import { useState, use } from "react"
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";

const subjectChapters = {
  physics: [
    { id: "mechanics", name: "Mechanics", questions: 50, difficulty: "Medium" },
    { id: "thermodynamics", name: "Thermodynamics", questions: 30, difficulty: "Hard" },
    { id: "electromagnetism", name: "Electromagnetism", questions: 45, difficulty: "Hard" },
    { id: "optics", name: "Optics", questions: 25, difficulty: "Medium" },
    { id: "modern-physics", name: "Modern Physics", questions: 35, difficulty: "Hard" },
  ],
  chemistry: [
    { id: "physical-chemistry", name: "Physical Chemistry", questions: 40, difficulty: "Hard" },
    { id: "organic-chemistry", name: "Organic Chemistry", questions: 50, difficulty: "Medium" },
    { id: "inorganic-chemistry", name: "Inorganic Chemistry", questions: 45, difficulty: "Medium" },
  ],
  mathematics: [
    { id: "algebra", name: "Algebra", questions: 60, difficulty: "Medium" },
    { id: "calculus", name: "Calculus", questions: 55, difficulty: "Hard" },
    { id: "coordinate-geometry", name: "Coordinate Geometry", questions: 40, difficulty: "Medium" },
    { id: "trigonometry", name: "Trigonometry", questions: 35, difficulty: "Easy" },
  ],
  biology: [
    { id: "cell-biology", name: "Cell Biology", questions: 40, difficulty: "Medium" },
    { id: "genetics", name: "Genetics", questions: 35, difficulty: "Hard" },
    { id: "ecology", name: "Ecology", questions: 30, difficulty: "Easy" },
    { id: "human-physiology", name: "Human Physiology", questions: 45, difficulty: "Medium" },
  ],
}

const examNames = {
  jee: "JEE",
  neet: "NEET",
  upsc: "UPSC",
  gate: "GATE",
  gujcet: "GUJCET",
  nda: "NDA",
}

const subjectNames = {
  physics: "Physics",
  chemistry: "Chemistry",
  mathematics: "Mathematics",
  biology: "Biology",
  "general-studies-1": "General Studies - I",
  "general-studies-2": "General Studies - II",
  "general-studies-3": "General Studies - III",
  "general-studies-4": "General Studies - IV",
}

export default function SubjectChaptersPage({ params }) {
  const resolvedParams = use(params);
  const [loadingId, setLoadingId] = useState(null)
  const router = useRouter();
  const chapters = subjectChapters[resolvedParams.subjectId] || []
  const examName = examNames[resolvedParams.examId]
  const subjectName = subjectNames[resolvedParams.subjectId]

  if (!examName || !subjectName) {
    notFound()
  }

  if (chapters.length === 0) {
    return <Loader />;
  }

  return (
    <div className="container py-8">
      <div className="flex items-center gap-4 mb-6">
        <Link href={`/exams/${resolvedParams.examId}`}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Subjects
          </Button>
        </Link>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {examName} - {subjectName}
        </h1>
        <p className="text-muted-foreground text-lg">Select a chapter to start your quiz</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chapters.map((chapter) => (
          <Card key={chapter.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{chapter.name}</CardTitle>
              </div>
              <CardDescription>Practice questions from {chapter.name.toLowerCase()}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  <span>{chapter.questions} questions available</span>
                </div>

                <Button
                  className="w-full"
                  variant="navy"
                  disabled={loadingId === chapter.id}
                  onClick={e => {
                    e.preventDefault();
                    setLoadingId(chapter.id);
                    setTimeout(() => {
                      router.push(`/quiz/${resolvedParams.examId}/${resolvedParams.subjectId}/${chapter.id}`);
                    }, 700);
                  }}
                >
                  {loadingId === chapter.id ? (
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                  ) : (
                    <Play className="h-4 w-4 mr-2" />
                  )}
                  Start Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 