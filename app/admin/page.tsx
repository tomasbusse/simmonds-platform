"use client";

import Link from "next/link";
import { GraduationCap, Building2, Users, FileText, BarChart3, Settings } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-neutral-dark/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 gradient-blue rounded-xl flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary-blue">Simmonds</h1>
                <p className="text-xs text-neutral-dark">Admin Portal</p>
              </div>
            </Link>
            <div className="flex gap-4">
              <Link href="/teacher" className="text-neutral-dark hover:text-primary-purple transition-colors">
                Teacher View
              </Link>
              <Link href="/student" className="text-neutral-dark hover:text-primary-pink transition-colors">
                Student View
              </Link>
              <div className="w-10 h-10 bg-primary-blue/10 rounded-xl flex items-center justify-center">
                <span className="text-primary-blue font-semibold">A</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-2">Admin Dashboard</h2>
          <p className="text-xl text-neutral-dark">
            Manage companies, users, and tests
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <Building2 className="w-8 h-8 text-primary-blue" />
              <span className="badge badge-blue">Active</span>
            </div>
            <p className="text-3xl font-bold mb-1">12</p>
            <p className="text-neutral-dark text-sm">Companies</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-primary-purple" />
              <span className="badge badge-purple">+8 today</span>
            </div>
            <p className="text-3xl font-bold mb-1">847</p>
            <p className="text-neutral-dark text-sm">Total Users</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <FileText className="w-8 h-8 text-primary-pink" />
              <span className="badge badge-pink">Live</span>
            </div>
            <p className="text-3xl font-bold mb-1">24</p>
            <p className="text-neutral-dark text-sm">Active Tests</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <BarChart3 className="w-8 h-8 text-primary-blue" />
              <span className="badge badge-blue">92%</span>
            </div>
            <p className="text-3xl font-bold mb-1">3,291</p>
            <p className="text-neutral-dark text-sm">Completions</p>
          </div>
        </div>

        {/* Main Actions */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Management */}
          <Link href="/admin/companies" className="card p-8 group hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-primary-blue/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Building2 className="w-8 h-8 text-primary-blue" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Company Management</h3>
            <p className="text-neutral-dark leading-relaxed">
              Create and manage company accounts. View company analytics and settings.
            </p>
          </Link>

          {/* User Management */}
          <Link href="/admin/users" className="card p-8 group hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-primary-purple/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users className="w-8 h-8 text-primary-purple" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">User Management</h3>
            <p className="text-neutral-dark leading-relaxed">
              Manage admins, teachers, and students. Assign roles and permissions.
            </p>
          </Link>

          {/* Test Creation */}
          <Link href="/admin/tests" className="card p-8 group hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-primary-pink/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FileText className="w-8 h-8 text-primary-pink" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Test Creation</h3>
            <p className="text-neutral-dark leading-relaxed">
              Create Cambridge-aligned tests with AI. Manage questions and assessments.
            </p>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-6">Recent Activity</h3>
          <div className="card">
            <div className="divide-y divide-neutral-dark/10">
              {[
                { company: "TechCorp", action: "New company created", time: "2 hours ago", type: "company" },
                { company: "GlobalTech", action: "15 new students added", time: "3 hours ago", type: "user" },
                { company: "StartupXYZ", action: "Placement test completed", time: "5 hours ago", type: "test" },
                { company: "MegaCorp", action: "Teacher assigned to Advanced group", time: "1 day ago", type: "group" },
              ].map((activity, idx) => (
                <div key={idx} className="p-6 flex items-center justify-between hover:bg-neutral-light transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${
                      activity.type === 'company' ? 'bg-primary-blue/10' :
                      activity.type === 'user' ? 'bg-primary-purple/10' :
                      activity.type === 'test' ? 'bg-primary-pink/10' :
                      'bg-neutral-dark/10'
                    } rounded-xl flex items-center justify-center`}>
                      {activity.type === 'company' && <Building2 className="w-6 h-6 text-primary-blue" />}
                      {activity.type === 'user' && <Users className="w-6 h-6 text-primary-purple" />}
                      {activity.type === 'test' && <FileText className="w-6 h-6 text-primary-pink" />}
                      {activity.type === 'group' && <Users className="w-6 h-6 text-neutral-dark" />}
                    </div>
                    <div>
                      <p className="font-semibold">{activity.action}</p>
                      <p className="text-sm text-neutral-dark">{activity.company}</p>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-dark">{activity.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}