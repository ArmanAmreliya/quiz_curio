"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Trophy, Star, Target, Zap } from "lucide-react"

interface MotivationalPopupProps {
  isOpen: boolean
  onClose: () => void
  score: number
  correctAnswers: number
  totalQuestions: number
}

export function MotivationalPopup({ isOpen, onClose, score, correctAnswers, totalQuestions }: MotivationalPopupProps) {
  const getMotivationalMessage = () => {
    if (score >= 90) {
      return {
        icon: <Trophy className="h-12 w-12 text-yellow-500" />,
        title: "Outstanding Performance! 🏆",
        message: "You're absolutely crushing it! Your dedication and hard work are paying off brilliantly.",
        color: "text-yellow-600",
      }
    } else if (score >= 75) {
      return {
        icon: <Star className="h-12 w-12 text-green-500" />,
        title: "Excellent Work! ⭐",
        message: "Great job! You're showing strong understanding and making excellent progress.",
        color: "text-green-600",
      }
    } else if (score >= 50) {
      return {
        icon: <Target className="h-12 w-12 text-blue-500" />,
        title: "Good Effort! 🎯",
        message: "You're on the right track! Keep practicing and you'll see even better results.",
        color: "text-blue-600",
      }
    } else {
      return {
        icon: <Zap className="h-12 w-12 text-orange-500" />,
        title: "Keep Going! ⚡",
        message: "Every expert was once a beginner. Your persistence will lead to improvement!",
        color: "text-orange-600",
      }
    }
  }

  const motivation = getMotivationalMessage()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md text-center">
        <DialogHeader>
          <div className="flex justify-center mb-4">{motivation.icon}</div>
          <DialogTitle className={`text-2xl ${motivation.color}`}>{motivation.title}</DialogTitle>
          <DialogDescription className="text-base leading-relaxed pt-2">{motivation.message}</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="bg-muted rounded-lg p-4 mb-4">
            <div className="text-sm text-muted-foreground mb-2">Your Progress</div>
            <div className="text-2xl font-bold">
              {correctAnswers} out of {totalQuestions} correct
            </div>
            <div className="text-sm text-muted-foreground">{score.toFixed(1)}% overall score</div>
          </div>

          <Button onClick={onClose} className="w-full">
            Continue Learning
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
