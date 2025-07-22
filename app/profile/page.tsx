"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Trophy, Clock, Target, BookOpen, Calendar } from "lucide-react"
import Loader from "@/components/Loader";

// Mock user data
const userData = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  joinDate: "January 2024",
  totalQuizzes: 25,
  averageScore: 78.5,
  totalTimeSpent: 420, // minutes
  streak: 7,
}

// Mock quiz history
const quizHistory = [
  {
    id: "1",
    examName: "JEE",
    subject: "Physics",
    chapter: "Mechanics",
    score: 85,
    totalQuestions: 20,
    timeTaken: 25,
    date: "2024-01-20",
    status: "completed",
  },
  {
    id: "2",
    examName: "JEE",
    subject: "Chemistry",
    chapter: "Organic Chemistry",
    score: 72,
    totalQuestions: 15,
    timeTaken: 18,
    date: "2024-01-19",
    status: "completed",
  },
  {
    id: "3",
    examName: "NEET",
    subject: "Biology",
    chapter: "Cell Biology",
    score: 90,
    totalQuestions: 25,
    timeTaken: 30,
    date: "2024-01-18",
    status: "completed",
  },
  {
    id: "4",
    examName: "JEE",
    subject: "Mathematics",
    chapter: "Calculus",
    score: 68,
    totalQuestions: 20,
    timeTaken: 35,
    date: "2024-01-17",
    status: "completed",
  },
]

export default function ProfilePage() {
  // Simulate loading state for demonstration
  if (!userData || !quizHistory) {
    return <Loader />;
  }

  return (
    <div className="container max-w-6xl py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src="/placeholder-user.jpg" alt={userData.name} />
                <AvatarFallback className="text-2xl">
                  {userData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <CardTitle>{userData.name}</CardTitle>
              <p className="text-muted-foreground">{userData.email}</p>
              <Badge variant="outline">
                <Calendar className="h-3 w-3 mr-1" />
                Joined {userData.joinDate}
              </Badge>
            </CardHeader>
          </Card>

          {/* Stats Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Quizzes</span>
                <Badge>{userData.totalQuizzes}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Average Score</span>
                <Badge variant="secondary">{userData.averageScore}%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Time Spent</span>
                <Badge variant="outline">
                  {Math.floor(userData.totalTimeSpent / 60)}h {userData.totalTimeSpent % 60}m
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Current Streak</span>
                <Badge className="bg-orange-500 hover:bg-orange-600">🔥 {userData.streak} days</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Overall Progress</span>
                    <span>{userData.averageScore}%</span>
                  </div>
                  <Progress value={userData.averageScore} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Quiz Completion</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Consistency</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quiz History */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Quiz History
              </CardTitle>
              <p className="text-muted-foreground">Your recent quiz attempts and performance</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quizHistory.map((quiz) => (
                  <div key={quiz.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{quiz.examName}</Badge>
                        <span className="font-medium">{quiz.subject}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{quiz.chapter}</span>
                      </div>
                      <Badge variant={quiz.score >= 80 ? "default" : quiz.score >= 60 ? "secondary" : "destructive"}>
                        {quiz.score}%
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          {Math.round((quiz.score / 100) * quiz.totalQuestions)}/{quiz.totalQuestions} correct
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {quiz.timeTaken}m
                        </span>
                      </div>
                      <span>{new Date(quiz.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Button variant="outline">Load More History</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
