"use client";

import Link from "next/link";
import { GraduationCap, Trophy, Star, TrendingUp, BookOpen, CheckCircle } from "lucide-react";

export default function TestResultPage({ params }: { params: { id: string } }) {
  // Sample test result data - in real app, this would be fetched from Convex
  const result = {
    testId: params.id,
    testTitle: "Business Communication - Intermediate",
    level: "intermediate",
    score: 88,
    totalPoints: 25,
    earnedPoints: 22,
    passed: true,
    completedAt: new Date().toISOString(),
    answersCorrect: 4,
    totalQuestions: 5,
    timeSpent: "18 minutes",
    encouragingMessage: "Excellent work! Your understanding of business communication is impressive.",
    strengths: [
      "Formal email writing",
      "Professional tone",
      "Business vocabulary",
    ],
    areasForImprovement: [
      "Idiomatic expressions",
      "Complex sentence structures",
    ],
    nextSteps: [
      "Practice writing professional emails",
      "Review advanced business vocabulary",
      "Take the Advanced Business Communication test",
    ],
  };

  const percentage = Math.round((result.earnedPoints / result.totalPoints) * 100);

  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-neutral-dark/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link href="/student" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-pink rounded-xl flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary-blue">Simmonds</h1>
                <p className="text-xs text-neutral-dark">Student Portal</p>
              </div>
            </Link>
            <div className="flex gap-4">
              <Link href="/student/tests" className="btn btn-secondary">
                Back to Tests
              </Link>
              <Link href="/student" className="btn btn-primary">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Banner */}
        <div className="gradient-soft rounded-2xl p-8 mb-8 border-2 border-primary-pink/20">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 bg-primary-pink/20 rounded-full flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-primary-pink" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold mb-1">Excellent Work! 🎉</h2>
                  <p className="text-lg text-neutral-dark">{result.testTitle}</p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-primary-pink mb-2">{percentage}%</div>
              <span className="badge badge-pink text-base">Passed</span>
            </div>
          </div>

          <div className="mt-6 p-6 bg-white/50 rounded-xl">
            <p className="text-lg text-neutral-dark leading-relaxed">
              {result.encouragingMessage}
            </p>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-8 h-8 text-primary-purple" />
              <span className="badge badge-purple">Accuracy</span>
            </div>
            <p className="text-3xl font-bold mb-1">{result.answersCorrect}/{result.totalQuestions}</p>
            <p className="text-neutral-dark text-sm">Correct Answers</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <Star className="w-8 h-8 text-primary-pink" />
              <span className="badge badge-pink">Points</span>
            </div>
            <p className="text-3xl font-bold mb-1">{result.earnedPoints}/{result.totalPoints}</p>
            <p className="text-neutral-dark text-sm">Points Earned</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-primary-blue" />
              <span className="badge badge-blue">Time</span>
            </div>
            <p className="text-3xl font-bold mb-1">{result.timeSpent}</p>
            <p className="text-neutral-dark text-sm">Total Time</p>
          </div>
        </div>

        {/* Strengths & Areas for Improvement */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Strengths */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary-purple/10 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-primary-purple" />
              </div>
              <h3 className="text-xl font-semibold">Your Strengths</h3>
            </div>
            <ul className="space-y-3">
              {result.strengths.map((strength, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-primary-purple/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-primary-purple" />
                  </div>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas for Improvement */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary-blue/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary-blue" />
              </div>
              <h3 className="text-xl font-semibold">Keep Practicing</h3>
            </div>
            <ul className="space-y-3">
              {result.areasForImprovement.map((area, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-primary-blue/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-4 h-4 text-primary-blue" />
                  </div>
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Next Steps */}
        <div className="card p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary-pink/10 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary-pink" />
            </div>
            <h3 className="text-2xl font-semibold">Recommended Next Steps</h3>
          </div>
          <div className="space-y-4">
            {result.nextSteps.map((step, idx) => (
              <div key={idx} className="p-4 bg-neutral-light rounded-xl flex items-start gap-4">
                <div className="w-8 h-8 bg-primary-pink/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="font-semibold text-primary-pink">{idx + 1}</span>
                </div>
                <p className="flex-1 pt-1">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4 justify-center">
          <Link href="/student/tests" className="btn btn-secondary">
            View All Tests
          </Link>
          <Link href="/student/materials" className="btn btn-primary">
            Continue Learning
          </Link>
        </div>

        {/* Encouragement Footer */}
        <div className="mt-8 p-6 bg-gradient-soft rounded-2xl border-2 border-primary-pink/20 text-center">
          <p className="text-lg font-semibold mb-2">🌟 Keep Up the Amazing Work!</p>
          <p className="text-neutral-dark">
            You're making excellent progress on your English learning journey. Your dedication is truly impressive!
          </p>
        </div>
      </main>
    </div>
  );
}
