"use client";

import Link from "next/link";
import { GraduationCap, BookOpen, Trophy, Calendar, Play, Star } from "lucide-react";

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-neutral-dark/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-pink rounded-xl flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary-blue">Simmonds</h1>
                <p className="text-xs text-neutral-dark">Student Portal</p>
              </div>
            </Link>
            <div className="flex gap-4">
              <Link href="/admin" className="text-neutral-dark hover:text-primary-blue transition-colors">
                Admin View
              </Link>
              <Link href="/teacher" className="text-neutral-dark hover:text-primary-purple transition-colors">
                Teacher View
              </Link>
              <div className="w-10 h-10 bg-primary-pink/10 rounded-xl flex items-center justify-center">
                <span className="text-primary-pink font-semibold">S</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <div className="gradient-soft rounded-2xl p-8 mb-8 border border-neutral-dark/5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold mb-2">Great job, Student! 🎉</h2>
              <p className="text-xl text-neutral-dark">
                You're making excellent progress in your English learning journey
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-32 h-32 bg-primary-pink/10 rounded-full flex items-center justify-center">
                <Trophy className="w-16 h-16 text-primary-pink" />
              </div>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <Star className="w-8 h-8 text-primary-pink" />
              <span className="badge badge-pink">Level</span>
            </div>
            <p className="text-3xl font-bold mb-1">B2</p>
            <p className="text-neutral-dark text-sm">Current Level</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <Trophy className="w-8 h-8 text-primary-purple" />
              <span className="badge badge-purple">+15 pts</span>
            </div>
            <p className="text-3xl font-bold mb-1">485</p>
            <p className="text-neutral-dark text-sm">Total Points</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="w-8 h-8 text-primary-blue" />
              <span className="badge badge-blue">This week</span>
            </div>
            <p className="text-3xl font-bold mb-1">12</p>
            <p className="text-neutral-dark text-sm">Lessons Completed</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8 text-primary-pink" />
              <span className="badge badge-pink">92%</span>
            </div>
            <p className="text-3xl font-bold mb-1">23</p>
            <p className="text-neutral-dark text-sm">Days Streak</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Recent Test Results */}
          <div className="card p-8">
            <h3 className="text-2xl font-semibold mb-6">Recent Test Results</h3>
            <div className="space-y-4">
              {[
                { name: "Grammar Test - Unit 5", score: 92, date: "2 days ago", passed: true },
                { name: "Vocabulary Quiz", score: 88, date: "5 days ago", passed: true },
                { name: "Listening Comprehension", score: 95, date: "1 week ago", passed: true },
              ].map((test, idx) => (
                <div key={idx} className="p-4 bg-neutral-light rounded-xl border-l-4 border-primary-pink">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold">{test.name}</p>
                    <span className={`badge ${test.passed ? 'badge-pink' : 'badge-blue'}`}>
                      {test.score}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-neutral-dark">{test.date}</p>
                    <p className="text-sm font-medium text-primary-pink">
                      {test.passed ? '✓ Excellent!' : 'Keep practicing'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/student/tests/history" className="btn btn-secondary w-full mt-6">
              View All Results
            </Link>
          </div>

          {/* Upcoming Lessons */}
          <div className="card p-8">
            <h3 className="text-2xl font-semibold mb-6">Upcoming Lessons</h3>
            <div className="space-y-4">
              {[
                { title: "Business Conversation", teacher: "Ms. Johnson", time: "Today, 3:00 PM" },
                { title: "Advanced Grammar", teacher: "Mr. Smith", time: "Tomorrow, 10:00 AM" },
                { title: "Writing Workshop", teacher: "Ms. Davis", time: "Friday, 2:00 PM" },
              ].map((lesson, idx) => (
                <div key={idx} className="p-4 bg-neutral-light rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary-purple/10 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-primary-purple" />
                    </div>
                    <div>
                      <p className="font-semibold">{lesson.title}</p>
                      <p className="text-sm text-neutral-dark">{lesson.teacher}</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-primary-purple">{lesson.time}</p>
                </div>
              ))}
            </div>
            <Link href="/student/lessons" className="btn btn-primary w-full mt-6">
              View Calendar
            </Link>
          </div>
        </div>

        {/* Learning Materials */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold">Continue Learning</h3>
            <Link href="/student/materials" className="text-primary-purple hover:text-primary-blue transition-colors">
              View All →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Business Email Writing", progress: 75, icon: BookOpen, color: "blue" },
              { title: "Pronunciation Practice", progress: 45, icon: Play, color: "purple" },
              { title: "Grammar Exercises", progress: 90, icon: Star, color: "pink" },
            ].map((material, idx) => (
              <Link
                key={idx}
                href={`/student/materials/${idx + 1}`}
                className="card p-6 group hover:shadow-xl transition-all"
              >
                <div className={`w-14 h-14 bg-primary-${material.color}/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <material.icon className={`w-7 h-7 text-primary-${material.color}`} />
                </div>
                <h4 className="font-semibold mb-2">{material.title}</h4>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-neutral-light rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-primary-${material.color}`}
                      style={{ width: `${material.progress}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-neutral-dark">{material.progress}%</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Encouragement */}
        <div className="card p-8 bg-gradient-soft border-2 border-primary-pink/20">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary-pink/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Trophy className="w-8 h-8 text-primary-pink" />
            </div>
            <div>
              <p className="text-xl font-semibold mb-1">You're doing amazing!</p>
              <p className="text-neutral-dark">
                Keep up the great work! You've completed 12 lessons this week and scored an average of 91% on your tests.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}