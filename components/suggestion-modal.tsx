"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, ThumbsUp, Send } from "lucide-react"

interface Suggestion {
  id: string
  text: string
  author: string
  likes: number
  timestamp: Date
}

interface SuggestionModalProps {
  isOpen: boolean
  onClose: () => void
  questionId: string
}

const mockSuggestions: Suggestion[] = [
  {
    id: "1",
    text: "Remember to use the kinematic equation v² = u² + 2as when dealing with motion problems. The key is identifying which values are given and what you need to find.",
    author: "StudyBuddy123",
    likes: 15,
    timestamp: new Date("2024-01-15"),
  },
  {
    id: "2",
    text: "For this type of problem, always draw a free body diagram first. It helps visualize all the forces acting on the object.",
    author: "PhysicsGuru",
    likes: 8,
    timestamp: new Date("2024-01-14"),
  },
]

export function SuggestionModal({ isOpen, onClose, questionId }: SuggestionModalProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>(mockSuggestions)
  const [newSuggestion, setNewSuggestion] = useState("")
  const [likedSuggestions, setLikedSuggestions] = useState<Set<string>>(new Set())

  const handleSubmitSuggestion = () => {
    if (newSuggestion.trim()) {
      const suggestion: Suggestion = {
        id: Date.now().toString(),
        text: newSuggestion.trim(),
        author: "You",
        likes: 0,
        timestamp: new Date(),
      }
      setSuggestions([suggestion, ...suggestions])
      setNewSuggestion("")
    }
  }

  const handleLike = (suggestionId: string) => {
    if (likedSuggestions.has(suggestionId)) return

    setSuggestions(suggestions.map((s) => (s.id === suggestionId ? { ...s, likes: s.likes + 1 } : s)))
    setLikedSuggestions(new Set([...likedSuggestions, suggestionId]))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-500" />
            Community Suggestions
          </DialogTitle>
          <DialogDescription>Share your insights or learn from other students' suggestions</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Add New Suggestion */}
          <div className="space-y-3">
            <h4 className="font-medium">Share your suggestion:</h4>
            <Textarea
              placeholder="Share a helpful tip, approach, or clarification for this question..."
              value={newSuggestion}
              onChange={(e) => setNewSuggestion(e.target.value)}
              rows={3}
            />
            <Button onClick={handleSubmitSuggestion} disabled={!newSuggestion.trim()} size="sm">
              <Send className="h-4 w-4 mr-2" />
              Submit Suggestion
            </Button>
          </div>

          {/* Existing Suggestions */}
          <div className="space-y-4">
            <h4 className="font-medium">Community Suggestions ({suggestions.length}):</h4>
            {suggestions.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No suggestions yet. Be the first to help others!</p>
            ) : (
              suggestions.map((suggestion) => (
                <div key={suggestion.id} className="border rounded-lg p-4 space-y-3">
                  <p className="text-sm leading-relaxed">{suggestion.text}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {suggestion.author}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{suggestion.timestamp.toLocaleDateString()}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(suggestion.id)}
                      disabled={likedSuggestions.has(suggestion.id)}
                      className="text-xs"
                    >
                      <ThumbsUp
                        className={`h-3 w-3 mr-1 ${likedSuggestions.has(suggestion.id) ? "fill-current" : ""}`}
                      />
                      {suggestion.likes}
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
