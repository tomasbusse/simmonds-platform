"use client";

import Link from "next/link";
import { GraduationCap, FileText, Clock, Star, CheckCircle, ArrowLeft } from "lucide-react";

export default function StudentTestsPage() {
  // Sample available tests
  const availableTests = [
    {
      id: 1,
      title: "Business Communication - Intermediate",
      description: "Test your business English communication skills",
      level: "intermediate",
      questionCount: 15,
      duration: 30,
      status: "available",
      dueDate: "Tomorrow, 5:00 PM",
    },
    {
      id: 2,
      title: "Grammar Fundamentals - Beginner",
      description: "Basic grammar rules and sentence structure",
      level: "beginner",
      questionCount: 20,
      duration: 25,
      status: "available",
      dueDate: "Friday, 3:00 PM",
    },
  ];

  const completedTests = [
    {
      id: 3,
      title: "Vocabulary Quiz",
      level: "intermediate",
      score: 88,
      completedDate: "5 days ago",
      passed: true,
    },
    {
      id: 4,
      title: "Listening Comprehension",
      level: "intermediate",
      score: 95,
      completedDate: "1 week ago",
      passed: true,
    },
    {
      id: 5,
      title: "Grammar Test - Unit 5",
      level: "intermediate",
      score: 92,
      completedDate: "2 days ago",
      passed: true,
    },
  ];

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
              <Link href="/student" className="btn btn-secondary">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-2">My Tests</h2>
          <p className="text-xl text-neutral-dark">
            Complete assessments to track your progress
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <FileText className="w-8 h-8 text-primary-pink" />
              <span className="badge badge-pink">Pending</span>
            </div>
            <p className="text-3xl font-bold mb-1">{availableTests.length}</p>
            <p className="text-neutral-dark text-sm">Tests Available</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-8 h-8 text-primary-purple" />
              <span className="badge badge-purple">Done</span>
            </div>
            <p className="text-3xl font-bold mb-1">{completedTests.length}</p>
            <p className="text-neutral-dark text-sm">Tests Completed</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <Star className="w-8 h-8 text-primary-blue" />
              <span className="badge badge-blue">Average</span>
            </div>
            <p className="text-3xl font-bold mb-1">
              {Math.round(completedTests.reduce((sum, t) => sum + t.score, 0) / completedTests.length)}%
            </p>
            <p className="text-neutral-dark text-sm">Average Score</p>
          </div>
        </div>

        {/* Available Tests */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6">Available Tests</h3>
          {availableTests.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {availableTests.map((test) => (
                <div key={test.id} className="card p-6 hover:shadow-xl transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold mb-2">{test.title}</h4>
                      <p className="text-neutral-dark text-sm mb-3">{test.description}</p>
                    </div>
                    <span className="badge badge-pink">{test.level}</span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-neutral-dark mb-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span>{test.questionCount} questions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{test.duration} mins</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-neutral-dark/10">
                    <div>
                      <p className="text-xs text-neutral-dark">Due</p>
                      <p className="text-sm font-medium text-primary-pink">{test.dueDate}</p>
                    </div>
                    <Link href={`/student/tests/${test.id}`} className="btn btn-primary">
                      Start Test
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card p-12 text-center">
              <div className="w-20 h-20 bg-primary-pink/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-primary-pink" />
              </div>
              <h4 className="text-2xl font-semibold mb-3">All Caught Up!</h4>
              <p className="text-neutral-dark">
                You don't have any pending tests right now. Great job staying on top of your assessments!
              </p>
            </div>
          )}
        </div>

        {/* Completed Tests */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold">Completed Tests</h3>
            <Link href="/student/tests/history" className="text-primary-purple hover:text-primary-blue transition-colors">
              View All History →
            </Link>
          </div>

          <div className="card">
            <div className="divide-y divide-neutral-dark/10">
              {completedTests.map((test) => (
                <div
                  key={test.id}
                  className="p-6 hover:bg-neutral-light transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">{test.title}</h4>
                        <span className="badge badge-purple">{test.level}</span>
                        {test.passed && (
                          <span className="badge badge-pink">{test.score}%</span>
                        )}
                      </div>
                      <p className="text-sm text-neutral-dark">Completed {test.completedDate}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary-pink">{test.score}%</p>
                        <p className="text-xs text-neutral-dark">Excellent!</p>
                      </div>
                      <Link
                        href={`/student/tests/result/${test.id}`}
                        className="text-sm text-primary-purple hover:text-primary-blue transition-colors font-medium"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
