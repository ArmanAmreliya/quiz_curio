"use client"

import { use } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BookOpen, FileText, Play } from "lucide-react"
import { notFound } from "next/navigation"
import Loader from "@/components/Loader";

const examSubjects = {
  jee: [
    {
      id: "physics",
      name: "Physics",
      description: "Mechanics, Thermodynamics, Electromagnetism, Optics, and Modern Physics",
      chapters: 25,
      questions: 400,
      color: "bg-blue-500",
    },
    {
      id: "chemistry",
      name: "Chemistry",
      description: "Physical, Organic, and Inorganic Chemistry concepts",
      chapters: 30,
      questions: 400,
      color: "bg-green-500",
    },
    {
      id: "mathematics",
      name: "Mathematics",
      description: "Algebra, Calculus, Coordinate Geometry, and Trigonometry",
      chapters: 20,
      questions: 400,
      color: "bg-purple-500",
    },
  ],
  neet: [
    {
      id: "physics",
      name: "Physics",
      description: "Mechanics, Thermodynamics, Electromagnetism, and Modern Physics",
      chapters: 20,
      questions: 200,
      color: "bg-blue-500",
    },
    {
      id: "chemistry",
      name: "Chemistry",
      description: "Physical, Organic, and Inorganic Chemistry",
      chapters: 25,
      questions: 300,
      color: "bg-green-500",
    },
    {
      id: "biology",
      name: "Biology",
      description: "Botany and Zoology concepts for medical entrance",
      chapters: 35,
      questions: 300,
      color: "bg-red-500",
    },
  ],
  upsc: [
    {
      id: "general-studies-1",
      name: "General Studies - I",
      description: "History, Geography, Art & Culture, and Society",
      chapters: 15,
      questions: 500,
      color: "bg-purple-500",
    },
    {
      id: "general-studies-2",
      name: "General Studies - II",
      description: "Governance, Constitution, Polity, and International Relations",
      chapters: 12,
      questions: 500,
      color: "bg-orange-500",
    },
    {
      id: "general-studies-3",
      name: "General Studies - III",
      description: "Economy, Science & Technology, and Environment",
      chapters: 10,
      questions: 500,
      color: "bg-teal-500",
    },
    {
      id: "general-studies-4",
      name: "General Studies - IV",
      description: "Ethics, Integrity, and Aptitude",
      chapters: 8,
      questions: 300,
      color: "bg-pink-500",
    },
  ],
}

const examNames = {
  jee: "JEE (Joint Entrance Examination)",
  neet: "NEET (National Eligibility cum Entrance Test)",
  upsc: "UPSC (Union Public Service Commission)",
  gate: "GATE (Graduate Aptitude Test in Engineering)",
  gujcet: "GUJCET (Gujarat Common Entrance Test)",
  nda: "NDA (National Defence Academy)",
}

export default function ExamSubjectsPage({
  params,
}: {
  params: Promise<{ examId: string }>
}) {
  const { examId } = use(params)

  const subjects = examSubjects[examId as keyof typeof examSubjects]
  const examName = examNames[examId as keyof typeof examNames]

  if (!subjects || !examName) {
    return <Loader />;
  }

  return (
    <div className="container py-8">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/exams">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Exams
          </Button>
        </Link>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">{examName}</h1>
        <p className="text-muted-foreground text-lg">Choose a subject to start practicing</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <Link key={subject.id} href={`/exams/${examId}/${subject.id}`}>
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-white`}>
                  {subject.id === "physics" && (
                    <img src="/physics.jpeg" alt="Physics" className="w-10 h-10 object-contain" />
                  )}
                  {subject.id === "chemistry" && (
                    <img src="/chem.jpeg" alt="Chemistry" className="w-10 h-10 object-contain" />
                  )}
                  {subject.id === "biology" && (
                    <img src="/biological.jpeg" alt="Biology" className="w-10 h-10 object-contain" />
                  )}
                  {subject.id === "mathematics" && (
                    <img src="/maths.png" alt="Mathematics" className="w-10 h-10 object-contain" />
                  )}
                  {/* Add more subject images as needed */}
                </div>
                <CardTitle className="group-hover:text-blue-600 transition-colors">
                  {subject.name}
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {subject.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      <span>{subject.chapters} chapters</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{subject.questions} questions</span>
                    </div>
                  </div>

                  <Badge variant="navy" className="w-full justify-center py-3 px-6 text-lg font-semibold rounded-xl flex items-center gap-2">
                    <Play className="h-5 w-5 mr-2" />
                    Start Practice
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
