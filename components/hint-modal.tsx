"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Lightbulb, Loader2 } from "lucide-react"

interface HintModalProps {
  isOpen: boolean
  onClose: () => void
  question: string
}

export function HintModal({ isOpen, onClose, question }: HintModalProps) {
  const [hint, setHint] = useState<string>("")
  const [loading, setLoading] = useState(false)

  const generateHint = async () => {
    setLoading(true)
    // Simulate AI hint generation
    setTimeout(() => {
      setHint(
        "Think about the fundamental principles involved in this problem. Consider the given values and which formula would be most appropriate to use. Break down the problem step by step.",
      )
      setLoading(false)
    }, 1500)
  }

  const handleOpen = () => {
    if (!hint && !loading) {
      generateHint()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md" onOpenAutoFocus={handleOpen}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            AI Hint
          </DialogTitle>
          <DialogDescription>Get a helpful hint to guide you toward the solution</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              <span>Generating hint...</span>
            </div>
          ) : hint ? (
            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg">
              <p className="text-sm leading-relaxed">{hint}</p>
            </div>
          ) : (
            <div className="text-center py-4">
              <Button onClick={generateHint} disabled={loading}>
                Generate Hint
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
