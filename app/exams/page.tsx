import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock } from "lucide-react"

const exams = [
  {
    id: "jee",
    name: "JEE (Joint Entrance Examination)",
    description: "Engineering entrance exam for IITs, NITs, and other technical institutes",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    difficulty: "High",
    duration: "3 hours",
    questions: 1200,
    color: "bg-blue-500",
  },
  {
    id: "neet",
    name: "NEET (National Eligibility cum Entrance Test)",
    description: "Medical entrance exam for MBBS, BDS, and other medical courses",
    subjects: ["Physics", "Chemistry", "Biology"],
    difficulty: "High",
    duration: "3 hours",
    questions: 800,
    color: "bg-green-500",
  },
  {
    id: "upsc",
    name: "UPSC (Union Public Service Commission)",
    description: "Civil services examination for IAS, IPS, and other government services",
    subjects: ["General Studies", "Optional Subject", "Essay"],
    difficulty: "Very High",
    duration: "Varies",
    questions: 2000,
    color: "bg-purple-500",
  },
  {
    id: "gate",
    name: "GATE (Graduate Aptitude Test in Engineering)",
    description: "Entrance exam for M.Tech admissions and PSU recruitments",
    subjects: ["Engineering Mathematics", "Core Subject", "General Aptitude"],
    difficulty: "High",
    duration: "3 hours",
    questions: 1500,
    color: "bg-orange-500",
  },
  {
    id: "gujcet",
    name: "GUJCET (Gujarat Common Entrance Test)",
    description: "State-level entrance exam for engineering and pharmacy courses in Gujarat",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    difficulty: "Medium",
    duration: "3 hours",
    questions: 600,
    color: "bg-teal-500",
  },
  {
    id: "nda",
    name: "NDA (National Defence Academy)",
    description: "Entrance exam for Indian Army, Navy, and Air Force",
    subjects: ["Mathematics", "General Ability Test"],
    difficulty: "Medium",
    duration: "4.5 hours",
    questions: 900,
    color: "bg-red-500",
  },
]

export default function ExamsPage() {
  return (
    <div className="container py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Choose Your Exam</h1>
        <p className="text-muted-foreground text-lg">Select the competitive exam you want to practice for</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <Link key={exam.id} href={`/exams/${exam.id}`}>
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-lg ${exam.color} flex items-center justify-center mb-4`}>
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <Badge
                    variant={
                      exam.difficulty === "Very Hard"
                        ? "destructive"
                        : exam.difficulty === "Hard"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {exam.difficulty}
                  </Badge>
                </div>
                <CardTitle className="group-hover:text-blue-600 transition-colors">{exam.name}</CardTitle>
                <CardDescription className="line-clamp-2">{exam.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Removed subject names section */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{exam.questions} questions</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{exam.duration}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
