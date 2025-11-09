"use client";

import Link from "next/link";
import { GraduationCap, FileText, Plus, Search, Filter, MoreVertical, Users, Clock } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function TestsManagementPage() {
  // Fetch real test data from Convex
  const tests = useQuery(api.tests.getAllTests) || [];

  // Calculate stats
  const activeTests = tests.filter(t => t.isActive);
  const totalCompletions = tests.reduce((sum, t) => sum + (t.completions || 0), 0);
  const avgScore = tests.length > 0
    ? Math.round(tests.reduce((sum, t) => sum + (t.averageScore || 0), 0) / tests.length)
    : 0;

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-neutral-dark/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-12 h-12 gradient-blue rounded-xl flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary-blue">Simmonds</h1>
                <p className="text-xs text-neutral-dark">Admin Portal</p>
              </div>
            </Link>
            <div className="flex gap-4">
              <Link href="/admin" className="text-neutral-dark hover:text-primary-blue transition-colors">
                Dashboard
              </Link>
              <Link href="/admin/companies" className="text-neutral-dark hover:text-primary-blue transition-colors">
                Companies
              </Link>
              <Link href="/admin/users" className="text-neutral-dark hover:text-primary-blue transition-colors">
                Users
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold mb-2">Test Management</h2>
            <p className="text-xl text-neutral-dark">
              Create and manage AI-generated assessments
            </p>
          </div>
          <Link href="/admin/tests/create" className="btn btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Create Test
          </Link>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <FileText className="w-8 h-8 text-primary-blue" />
              <span className="badge badge-blue">Active</span>
            </div>
            <p className="text-3xl font-bold mb-1">{activeTests.length}</p>
            <p className="text-neutral-dark text-sm">Active Tests</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-primary-purple" />
              <span className="badge badge-purple">Total</span>
            </div>
            <p className="text-3xl font-bold mb-1">{totalCompletions}</p>
            <p className="text-neutral-dark text-sm">Completions</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <FileText className="w-8 h-8 text-primary-pink" />
              <span className="badge badge-pink">Avg</span>
            </div>
            <p className="text-3xl font-bold mb-1">{avgScore || 0}%</p>
            <p className="text-neutral-dark text-sm">Average Score</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-primary-blue" />
              <span className="badge badge-blue">Total</span>
            </div>
            <p className="text-3xl font-bold mb-1">{tests.length}</p>
            <p className="text-neutral-dark text-sm">All Tests</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="card p-4 mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-neutral-dark absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search tests..."
                className="input w-full pl-10"
              />
            </div>
            <button className="btn btn-secondary">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
          </div>
        </div>

        {/* Tests List */}
        <div className="card">
          <div className="divide-y divide-neutral-dark/10">
            {tests.map((test) => (
              <div
                key={test._id}
                className="p-6 hover:bg-neutral-light transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{test.title}</h3>
                      <span className={`badge ${
                        test.isActive ? 'badge-blue' : 'badge-pink'
                      }`}>
                        {test.isActive ? 'active' : 'inactive'}
                      </span>
                      <span className="badge badge-purple">
                        {test.level || 'intermediate'}
                      </span>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-neutral-dark mb-3">
                      <span>{test.questionCount || 0} questions</span>
                      <span>•</span>
                      <span>{test.completions || 0} completions</span>
                      <span>•</span>
                      <span>Avg: {test.averageScore || 0}%</span>
                      <span>•</span>
                      <span>Created {formatDate(test.createdAt)}</span>
                    </div>

                    <div className="flex gap-3">
                      <Link
                        href={`/admin/tests/${test._id}`}
                        className="text-sm text-primary-blue hover:text-primary-purple transition-colors font-medium"
                      >
                        View Details
                      </Link>
                      <Link
                        href={`/admin/tests/${test._id}/edit`}
                        className="text-sm text-primary-purple hover:text-primary-blue transition-colors font-medium"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/admin/tests/${test._id}/results`}
                        className="text-sm text-primary-pink hover:text-primary-purple transition-colors font-medium"
                      >
                        View Results
                      </Link>
                    </div>
                  </div>

                  <button className="p-2 hover:bg-neutral-light rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5 text-neutral-dark" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State for when no tests exist */}
        {tests.length === 0 && (
          <div className="card p-12 text-center">
            <div className="w-20 h-20 bg-primary-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-primary-blue" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">No Tests Yet</h3>
            <p className="text-neutral-dark mb-6">
              Create your first AI-generated test to get started.
            </p>
            <Link href="/admin/tests/create" className="btn btn-primary inline-flex">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Test
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
