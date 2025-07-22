import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black px-4">
      {/* Hero Section */}
      <section className="w-full max-w-3xl text-center py-20">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6" style={{ color: '#0a1931' }}>
          Master Your Competitive Exams
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
          Practice with thousands of questions from JEE, NEET, UPSC, GATE, and more. Get AI-powered hints and track your progress.
        </p>
        <Link href="/exams">
          <Button size="lg" className="text-lg px-8 py-4" style={{ backgroundColor: '#0a1931', color: 'white' }}>
            Start Quiz
          </Button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-4xl py-12">
        <h2 className="text-2xl font-bold mb-10 text-center" style={{ color: '#0a1931' }}>
          Why Choose Our Platform?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 border rounded-lg shadow-sm bg-white">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#e5eaf5' }}>
              <span className="text-2xl font-bold" style={{ color: '#0a1931' }}>Q</span>
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#0a1931' }}>
              Comprehensive Question Bank
            </h3>
            <p className="text-gray-700">
              Access thousands of questions from previous years across all major competitive exams.
            </p>
          </div>
          <div className="text-center p-6 border rounded-lg shadow-sm bg-white">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#e5eaf5' }}>
              <span className="text-2xl font-bold" style={{ color: '#0a1931' }}>AI</span>
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#0a1931' }}>
              AI-Powered Hints
            </h3>
            <p className="text-gray-700">
              Get intelligent hints when you're stuck, powered by advanced AI technology.
            </p>
          </div>
          <div className="text-center p-6 border rounded-lg shadow-sm bg-white">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#e5eaf5' }}>
              <span className="text-2xl font-bold" style={{ color: '#0a1931' }}>T</span>
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#0a1931' }}>
              Track Progress
            </h3>
            <p className="text-gray-700">
              Monitor your performance with detailed analytics and score tracking.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full max-w-2xl py-12">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold mb-2" style={{ color: '#0a1931' }}>10,000+</div>
            <div className="text-gray-700">Practice Questions</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2" style={{ color: '#0a1931' }}>50,000+</div>
            <div className="text-gray-700">Students Helped</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2" style={{ color: '#0a1931' }}>95%</div>
            <div className="text-gray-700">Success Rate</div>
          </div>
        </div>
      </section>
    </div>
  )
}
