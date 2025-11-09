"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GraduationCap, CheckCircle, XCircle, Clock, Calendar, Users, Loader2, Save } from "lucide-react";

type AttendanceStatus = "present" | "absent" | "late" | null;

interface Student {
  id: number;
  name: string;
  email: string;
  status: AttendanceStatus;
}

export default function MarkAttendancePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  // Sample lesson data
  const lesson = {
    id: params.id,
    title: "Grammar Essentials",
    groupName: "Beginner Group A",
    date: "Today",
    time: "10:00 AM - 11:30 AM",
    duration: 90,
  };

  // Sample students with attendance status
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: "Alice Johnson", email: "alice@example.com", status: null },
    { id: 2, name: "Bob Smith", email: "bob@example.com", status: null },
    { id: 3, name: "Carol White", email: "carol@example.com", status: null },
    { id: 4, name: "David Brown", email: "david@example.com", status: null },
    { id: 5, name: "Emma Davis", email: "emma@example.com", status: null },
    { id: 6, name: "Frank Miller", email: "frank@example.com", status: null },
    { id: 7, name: "Grace Wilson", email: "grace@example.com", status: null },
    { id: 8, name: "Henry Taylor", email: "henry@example.com", status: null },
    { id: 9, name: "Iris Anderson", email: "iris@example.com", status: null },
    { id: 10, name: "Jack Thomas", email: "jack@example.com", status: null },
    { id: 11, name: "Karen Martinez", email: "karen@example.com", status: null },
    { id: 12, name: "Leo Garcia", email: "leo@example.com", status: null },
    { id: 13, name: "Maria Rodriguez", email: "maria@example.com", status: null },
    { id: 14, name: "Nathan Lee", email: "nathan@example.com", status: null },
    { id: 15, name: "Olivia Harris", email: "olivia@example.com", status: null },
  ]);

  const updateStatus = (studentId: number, status: AttendanceStatus) => {
    setStudents(students.map(s =>
      s.id === studentId ? { ...s, status } : s
    ));
  };

  const markAllPresent = () => {
    setStudents(students.map(s => ({ ...s, status: "present" })));
  };

  const markAllAbsent = () => {
    setStudents(students.map(s => ({ ...s, status: "absent" })));
  };

  const clearAll = () => {
    setStudents(students.map(s => ({ ...s, status: null })));
  };

  const handleSave = async () => {
    const unmarked = students.filter(s => s.status === null).length;
    if (unmarked > 0) {
      if (!confirm(`${unmarked} student(s) are unmarked. Save anyway?`)) {
        return;
      }
    }

    setIsSaving(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In real app, this would save to Convex
    alert("Attendance saved successfully!");
    router.push("/teacher/attendance");
  };

  const stats = {
    present: students.filter(s => s.status === "present").length,
    absent: students.filter(s => s.status === "absent").length,
    late: students.filter(s => s.status === "late").length,
    unmarked: students.filter(s => s.status === null).length,
  };

  const attendanceRate = students.length > 0
    ? Math.round((stats.present / students.length) * 100)
    : 0;

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
              <Link href="/teacher/attendance" className="btn btn-secondary">
                Cancel
              </Link>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="btn btn-primary"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Attendance
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="card p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">{lesson.title}</h2>
              <div className="flex items-center gap-6 text-neutral-dark">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{lesson.groupName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{lesson.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{lesson.time}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-primary-purple mb-1">
                {attendanceRate}%
              </div>
              <p className="text-sm text-neutral-dark">Attendance Rate</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-3">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <span className="badge bg-green-100 text-green-600">Present</span>
            </div>
            <p className="text-3xl font-bold">{stats.present}</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-3">
              <XCircle className="w-8 h-8 text-red-500" />
              <span className="badge bg-red-100 text-red-600">Absent</span>
            </div>
            <p className="text-3xl font-bold">{stats.absent}</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-3">
              <Clock className="w-8 h-8 text-orange-500" />
              <span className="badge bg-orange-100 text-orange-600">Late</span>
            </div>
            <p className="text-3xl font-bold">{stats.late}</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-3">
              <Users className="w-8 h-8 text-neutral-dark" />
              <span className="badge badge-purple">Unmarked</span>
            </div>
            <p className="text-3xl font-bold">{stats.unmarked}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3 mb-6">
          <button onClick={markAllPresent} className="btn btn-secondary">
            <CheckCircle className="w-4 h-4 mr-2" />
            Mark All Present
          </button>
          <button onClick={markAllAbsent} className="btn btn-secondary">
            <XCircle className="w-4 h-4 mr-2" />
            Mark All Absent
          </button>
          <button onClick={clearAll} className="btn btn-secondary">
            Clear All
          </button>
        </div>

        {/* Student List */}
        <div className="card">
          <div className="divide-y divide-neutral-dark/10">
            {students.map((student) => (
              <div
                key={student.id}
                className="p-6 hover:bg-neutral-light transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-1">{student.name}</h4>
                    <p className="text-sm text-neutral-dark">{student.email}</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => updateStatus(student.id, "present")}
                      className={`px-6 py-3 rounded-xl font-medium transition-all ${
                        student.status === "present"
                          ? "bg-green-500 text-white shadow-lg"
                          : "bg-green-50 text-green-600 hover:bg-green-100"
                      }`}
                    >
                      <CheckCircle className="w-5 h-5 inline mr-2" />
                      Present
                    </button>

                    <button
                      onClick={() => updateStatus(student.id, "late")}
                      className={`px-6 py-3 rounded-xl font-medium transition-all ${
                        student.status === "late"
                          ? "bg-orange-500 text-white shadow-lg"
                          : "bg-orange-50 text-orange-600 hover:bg-orange-100"
                      }`}
                    >
                      <Clock className="w-5 h-5 inline mr-2" />
                      Late
                    </button>

                    <button
                      onClick={() => updateStatus(student.id, "absent")}
                      className={`px-6 py-3 rounded-xl font-medium transition-all ${
                        student.status === "absent"
                          ? "bg-red-500 text-white shadow-lg"
                          : "bg-red-50 text-red-600 hover:bg-red-100"
                      }`}
                    >
                      <XCircle className="w-5 h-5 inline mr-2" />
                      Absent
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button Footer */}
        <div className="mt-8 flex justify-end gap-4">
          <Link href="/teacher/attendance" className="btn btn-secondary">
            Cancel
          </Link>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="btn btn-primary"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Attendance ({stats.present + stats.absent + stats.late} / {students.length} marked)
              </>
            )}
          </button>
        </div>
      </main>
    </div>
  );
}
