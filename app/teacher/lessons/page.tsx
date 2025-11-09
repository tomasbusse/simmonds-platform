"use client";

import { useState } from "react";
import Link from "next/link";
import { GraduationCap, Calendar, Plus, Clock, Users, BookOpen, Filter } from "lucide-react";

type ViewMode = "calendar" | "list";

export default function TeacherLessonsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  // Sample lessons data
  const upcomingLessons = [
    {
      id: 1,
      title: "Grammar Essentials",
      groupName: "Beginner Group A",
      groupId: 1,
      date: "Today",
      time: "10:00 AM - 11:30 AM",
      duration: 90,
      students: 15,
      attendanceMarked: false,
      materials: ["Grammar Workbook - Unit 5", "Practice Exercises"],
      status: "scheduled",
    },
    {
      id: 2,
      title: "Business English",
      groupName: "Advanced Group C",
      groupId: 3,
      date: "Today",
      time: "2:00 PM - 3:30 PM",
      duration: 90,
      students: 9,
      attendanceMarked: false,
      materials: ["Business Vocabulary", "Email Writing Guide"],
      status: "scheduled",
    },
    {
      id: 3,
      title: "Conversation Practice",
      groupName: "Intermediate Group B",
      groupId: 2,
      date: "Tomorrow",
      time: "9:00 AM - 10:30 AM",
      duration: 90,
      students: 18,
      attendanceMarked: false,
      materials: ["Discussion Topics", "Listening Exercises"],
      status: "scheduled",
    },
  ];

  const pastLessons = [
    {
      id: 4,
      title: "Pronunciation Workshop",
      groupName: "Beginner Group A",
      groupId: 1,
      date: "Yesterday",
      time: "10:00 AM",
      students: 15,
      attended: 14,
      attendanceMarked: true,
      status: "completed",
    },
    {
      id: 5,
      title: "Writing Skills",
      groupName: "Intermediate Group B",
      groupId: 2,
      date: "2 days ago",
      time: "2:00 PM",
      students: 18,
      attended: 17,
      attendanceMarked: true,
      status: "completed",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-neutral-dark/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link href="/teacher" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-purple rounded-xl flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary-blue">Simmonds</h1>
                <p className="text-xs text-neutral-dark">Teacher Portal</p>
              </div>
            </Link>
            <div className="flex gap-4">
              <Link href="/teacher" className="text-neutral-dark hover:text-primary-purple transition-colors">
                Dashboard
              </Link>
              <Link href="/teacher/groups" className="text-neutral-dark hover:text-primary-purple transition-colors">
                Groups
              </Link>
              <Link href="/teacher/attendance" className="text-neutral-dark hover:text-primary-purple transition-colors">
                Attendance
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold mb-2">Lesson Management</h2>
            <p className="text-xl text-neutral-dark">
              Schedule and manage your lessons
            </p>
          </div>
          <Link href="/teacher/lessons/create" className="btn btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Schedule Lesson
          </Link>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8 text-primary-purple" />
              <span className="badge badge-purple">This week</span>
            </div>
            <p className="text-3xl font-bold mb-1">{upcomingLessons.length}</p>
            <p className="text-neutral-dark text-sm">Upcoming Lessons</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="w-8 h-8 text-primary-blue" />
              <span className="badge badge-blue">Total</span>
            </div>
            <p className="text-3xl font-bold mb-1">{upcomingLessons.reduce((sum, l) => sum + l.students, 0)}</p>
            <p className="text-neutral-dark text-sm">Students Enrolled</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-primary-pink" />
              <span className="badge badge-pink">Hours</span>
            </div>
            <p className="text-3xl font-bold mb-1">
              {upcomingLessons.reduce((sum, l) => sum + l.duration, 0) / 60}
            </p>
            <p className="text-neutral-dark text-sm">Teaching Hours</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-primary-purple" />
              <span className="badge badge-purple">Avg</span>
            </div>
            <p className="text-3xl font-bold mb-1">
              {pastLessons.length > 0
                ? Math.round((pastLessons.reduce((sum, l) => sum + (l.attended || 0), 0) / pastLessons.reduce((sum, l) => sum + l.students, 0)) * 100)
                : 0}%
            </p>
            <p className="text-neutral-dark text-sm">Attendance Rate</p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === "list"
                  ? 'bg-primary-purple text-white'
                  : 'bg-white text-neutral-dark hover:bg-neutral-light'
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setViewMode("calendar")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === "calendar"
                  ? 'bg-primary-purple text-white'
                  : 'bg-white text-neutral-dark hover:bg-neutral-light'
              }`}
            >
              Calendar View
            </button>
          </div>
          <button className="btn btn-secondary">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>

        {/* Upcoming Lessons */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6">Upcoming Lessons</h3>
          <div className="space-y-4">
            {upcomingLessons.map((lesson) => (
              <div key={lesson.id} className="card p-6 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h4 className="text-xl font-semibold">{lesson.title}</h4>
                      <span className="badge badge-purple">{lesson.groupName}</span>
                      <span className="badge badge-blue">{lesson.students} students</span>
                    </div>

                    <div className="flex items-center gap-6 text-neutral-dark mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{lesson.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{lesson.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{lesson.students} enrolled</span>
                      </div>
                    </div>

                    {lesson.materials && lesson.materials.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-medium mb-2">Materials:</p>
                        <div className="flex flex-wrap gap-2">
                          {lesson.materials.map((material, idx) => (
                            <span key={idx} className="badge badge-purple">
                              {material}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Link
                        href={`/teacher/lessons/${lesson.id}`}
                        className="text-sm text-primary-purple hover:text-primary-blue transition-colors font-medium"
                      >
                        View Details
                      </Link>
                      <Link
                        href={`/teacher/lessons/${lesson.id}/edit`}
                        className="text-sm text-primary-blue hover:text-primary-purple transition-colors font-medium"
                      >
                        Edit
                      </Link>
                      {lesson.date === "Today" && (
                        <Link
                          href={`/teacher/attendance/${lesson.id}`}
                          className="text-sm text-primary-pink hover:text-primary-purple transition-colors font-medium"
                        >
                          Mark Attendance
                        </Link>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className={`badge ${
                      lesson.status === 'scheduled' ? 'badge-blue' : 'badge-pink'
                    }`}>
                      {lesson.status}
                    </span>
                    {!lesson.attendanceMarked && lesson.date === "Today" && (
                      <span className="text-xs text-primary-pink font-medium">
                        Attendance needed
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Lessons */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold">Past Lessons</h3>
            <Link href="/teacher/lessons/history" className="text-primary-purple hover:text-primary-blue transition-colors">
              View All History →
            </Link>
          </div>
          <div className="card">
            <div className="divide-y divide-neutral-dark/10">
              {pastLessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="p-6 hover:bg-neutral-light transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">{lesson.title}</h4>
                        <span className="badge badge-purple">{lesson.groupName}</span>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-neutral-dark">
                        <span>{lesson.date} • {lesson.time}</span>
                        <span>Attendance: {lesson.attended}/{lesson.students}</span>
                        <span>
                          {lesson.attended && Math.round((lesson.attended / lesson.students) * 100)}% present
                        </span>
                      </div>
                    </div>
                    <Link
                      href={`/teacher/lessons/${lesson.id}`}
                      className="text-sm text-primary-purple hover:text-primary-blue transition-colors font-medium"
                    >
                      View Details →
                    </Link>
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
