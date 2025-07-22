import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { QuizProvider } from "@/components/quiz-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Quiz Platform - Master Your Competitive Exams",
  description: "Practice with thousands of questions from JEE, NEET, UPSC, GATE, and more.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <QuizProvider>
            <Header />
            <main className="flex flex-col items-center justify-center min-h-screen w-full">
              {children}
            </main>
          </QuizProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
