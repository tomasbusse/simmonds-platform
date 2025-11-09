"use client";

import Link from "next/link";
import { GraduationCap, Users, Calendar, FileCheck, BookOpen, TrendingUp } from "lucide-react";

export default function TeacherDashboard() {
  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-neutral-dark/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-purple rounded-xl flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary-blue">Simmonds</h1>
                <p className="text-xs text-neutral-dark">Teacher Portal</p>
              </div>
            </Link>
            <div className="flex gap-4">
              <Link href="/admin" className="text-neutral-dark hover:text-primary-blue transition-colors">
                Admin View
              </Link>
              <Link href="/student" className="text-neutral-dark hover:text-primary-pink transition-colors">
                Student View
              </Link>
              <div className="w-10 h-10 bg-primary-purple/10 rounded-xl flex items-center justify-center">
                <span className="text-primary-purple font-semibold">T</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-2">Welcome back, Teacher!</h2>
          <p className="text-xl text-neutral-dark">
            Manage your groups and track student progress
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-primary-purple" />
              <span className="badge badge-purple">3 groups</span>
            </div>
            <p className="text-3xl font-bold mb-1">42</p>
            <p className="text-neutral-dark text-sm">Total Students</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8 text-primary-blue" />
              <span className="badge badge-blue">This week</span>
            </div>
            <p className="text-3xl font-bold mb-1">8</p>
            <p className="text-neutral-dark text-sm">Scheduled Lessons</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <FileCheck className="w-8 h-8 text-primary-pink" />
              <span className="badge badge-pink">Graded</span>
            </div>
            <p className="text-3xl font-bold mb-1">156</p>
            <p className="text-neutral-dark text-sm">Assignments</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-primary-purple" />
              <span className="badge badge-purple">+12%</span>
            </div>
            <p className="text-3xl font-bold mb-1">87%</p>
            <p className="text-neutral-dark text-sm">Avg. Attendance</p>
          </div>
        </div>

        {/* Main Actions */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* My Groups */}
          <div className="card p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold">My Groups</h3>
              <Link href="/teacher/groups" className="btn btn-secondary">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {[
                { name: "Beginner Group A", students: 15, level: "beginner", color: "blue" },
                { name: "Intermediate Group B", students: 18, level: "intermediate", color: "purple" },
                { name: "Advanced Group C", students: 9, level: "advanced", color: "pink" },
              ].map((group, idx) => (
                <Link
                  key={idx}
                  href={`/teacher/groups/${idx + 1}`}
                  className="flex items-center justify-between p-4 bg-neutral-light rounded-xl hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 bg-primary-${group.color}/10 rounded-xl flex items-center justify-center`}>
                      <Users className={`w-6 h-6 text-primary-${group.color}`} />
                    </div>
                    <div>
                      <p className="font-semibold">{group.name}</p>
                      <p className="text-sm text-neutral-dark">{group.students} students • {group.level}</p>
                    </div>
                  </div>
                  <span className={`badge badge-${group.color}`}>{group.level}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Upcoming Lessons */}
          <div className="card p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold">Upcoming Lessons</h3>
              <Link href="/teacher/lessons" className="btn btn-primary">
                Schedule
              </Link>
            </div>
            <div className="space-y-4">
              {[
                { title: "Grammar Essentials", group: "Beginner A", time: "Today, 10:00 AM", students: 15 },
                { title: "Business English", group: "Advanced C", time: "Today, 2:00 PM", students: 9 },
                { title: "Conversation Practice", group: "Intermediate B", time: "Tomorrow, 9:00 AM", students: 18 },
              ].map((lesson, idx) => (
                <div key={idx} className="p-4 bg-neutral-light rounded-xl border-l-4 border-primary-purple">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold mb-1">{lesson.title}</p>
                      <p className="text-sm text-neutral-dark">{lesson.group} • {lesson.students} students</p>
                    </div>
                    <p className="text-sm font-medium text-primary-purple">{lesson.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/teacher/attendance" className="card p-6 group hover:shadow-xl transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-blue/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileCheck className="w-6 h-6 text-primary-blue" />
              </div>
              <div>
                <p className="font-semibold">Track Attendance</p>
                <p className="text-sm text-neutral-dark">Mark students present/absent</p>
              </div>
            </div>
          </Link>

          <Link href="/teacher/lessons/create" className="card p-6 group hover:shadow-xl transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-purple/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6 text-primary-purple" />
              </div>
              <div>
                <p className="font-semibold">Create Lesson</p>
                <p className="text-sm text-neutral-dark">Plan new learning materials</p>
              </div>
            </div>
          </Link>

          <Link href="/teacher/progress" className="card p-6 group hover:shadow-xl transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-pink/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-primary-pink" />
              </div>
              <div>
                <p className="font-semibold">Student Progress</p>
                <p className="text-sm text-neutral-dark">View detailed analytics</p>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}