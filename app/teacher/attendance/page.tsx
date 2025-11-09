"use client";

import { useState } from "react";
import Link from "next/link";
import { GraduationCap, Users, CheckCircle, XCircle, Calendar, Search, TrendingUp } from "lucide-react";

export default function AttendanceManagementPage() {
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data
  const groups = [
    { id: 1, name: "Beginner Group A", students: 15 },
    { id: 2, name: "Intermediate Group B", students: 18 },
    { id: 3, name: "Advanced Group C", students: 9 },
  ];

  const todayLessons = [
    {
      id: 1,
      title: "Grammar Essentials",
      groupName: "Beginner Group A",
      groupId: 1,
      time: "10:00 AM - 11:30 AM",
      students: 15,
      markedAttendance: false,
      status: "upcoming",
    },
    {
      id: 2,
      title: "Business English",
      groupName: "Advanced Group C",
      groupId: 3,
      time: "2:00 PM - 3:30 PM",
      students: 9,
      markedAttendance: false,
      status: "upcoming",
    },
  ];

  const recentAttendance = [
    {
      lessonId: 4,
      lessonTitle: "Pronunciation Workshop",
      groupName: "Beginner Group A",
      date: "Yesterday",
      totalStudents: 15,
      present: 14,
      absent: 1,
      attendanceRate: 93,
    },
    {
      lessonId: 5,
      lessonTitle: "Writing Skills",
      groupName: "Intermediate Group B",
      date: "2 days ago",
      totalStudents: 18,
      present: 17,
      absent: 1,
      attendanceRate: 94,
    },
    {
      lessonId: 6,
      lessonTitle: "Conversation Practice",
      groupName: "Advanced Group C",
      date: "3 days ago",
      totalStudents: 9,
      present: 8,
      absent: 1,
      attendanceRate: 89,
    },
  ];

  const overallStats = {
    totalLessons: 12,
    averageAttendance: 92,
    totalStudents: 42,
    topGroup: "Intermediate Group B",
  };

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
              <Link href="/teacher/lessons" className="text-neutral-dark hover:text-primary-purple transition-colors">
                Lessons
              </Link>
              <Link href="/teacher/groups" className="text-neutral-dark hover:text-primary-purple transition-colors">
                Groups
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-2">Attendance Tracking</h2>
          <p className="text-xl text-neutral-dark">
            Mark and monitor student attendance
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8 text-primary-purple" />
              <span className="badge badge-purple">Total</span>
            </div>
            <p className="text-3xl font-bold mb-1">{overallStats.totalLessons}</p>
            <p className="text-neutral-dark text-sm">Lessons This Month</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-primary-blue" />
              <span className="badge badge-blue">Average</span>
            </div>
            <p className="text-3xl font-bold mb-1">{overallStats.averageAttendance}%</p>
            <p className="text-neutral-dark text-sm">Attendance Rate</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-primary-pink" />
              <span className="badge badge-pink">Total</span>
            </div>
            <p className="text-3xl font-bold mb-1">{overallStats.totalStudents}</p>
            <p className="text-neutral-dark text-sm">Active Students</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-8 h-8 text-primary-purple" />
              <span className="badge badge-purple">Top</span>
            </div>
            <p className="text-lg font-bold mb-1">{overallStats.topGroup}</p>
            <p className="text-neutral-dark text-sm">Best Attendance</p>
          </div>
        </div>

        {/* Today's Lessons - Mark Attendance */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6">Mark Attendance Today</h3>
          {todayLessons.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {todayLessons.map((lesson) => (
                <div key={lesson.id} className="card p-6 hover:shadow-xl transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-semibold mb-2">{lesson.title}</h4>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="badge badge-purple">{lesson.groupName}</span>
                        <span className="badge badge-blue">{lesson.students} students</span>
                      </div>
                    </div>
                    {lesson.markedAttendance ? (
                      <span className="badge badge-pink">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Marked
                      </span>
                    ) : (
                      <span className="badge bg-orange-100 text-orange-600">Pending</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-neutral-dark mb-4">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{lesson.time}</span>
                  </div>

                  <Link
                    href={`/teacher/attendance/${lesson.id}`}
                    className="btn btn-primary w-full"
                  >
                    Mark Attendance
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="card p-12 text-center">
              <div className="w-20 h-20 bg-primary-purple/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-primary-purple" />
              </div>
              <h4 className="text-2xl font-semibold mb-3">No Lessons Today</h4>
              <p className="text-neutral-dark">
                You don't have any lessons scheduled for today.
              </p>
            </div>
          )}
        </div>

        {/* Recent Attendance Records */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold">Recent Attendance</h3>
            <div className="flex gap-4">
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="input"
              >
                <option value="all">All Groups</option>
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="card">
            <div className="divide-y divide-neutral-dark/10">
              {recentAttendance.map((record) => (
                <div
                  key={record.lessonId}
                  className="p-6 hover:bg-neutral-light transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-lg">{record.lessonTitle}</h4>
                        <span className="badge badge-purple">{record.groupName}</span>
                      </div>
                      <p className="text-sm text-neutral-dark mb-3">{record.date}</p>

                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-sm">
                            <strong>{record.present}</strong> Present
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <XCircle className="w-5 h-5 text-red-500" />
                          <span className="text-sm">
                            <strong>{record.absent}</strong> Absent
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-primary-purple" />
                          <span className="text-sm">
                            <strong>{record.totalStudents}</strong> Total
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary-purple mb-1">
                        {record.attendanceRate}%
                      </div>
                      <p className="text-xs text-neutral-dark">Attendance Rate</p>
                      <Link
                        href={`/teacher/attendance/${record.lessonId}`}
                        className="text-sm text-primary-purple hover:text-primary-blue transition-colors font-medium mt-2 inline-block"
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
