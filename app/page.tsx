"use client";

import Link from "next/link";
import { Activity, BarChart3, Home, Settings } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <nav className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <Activity className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Simmonds Platform
              </h1>
            </div>
            <div className="flex gap-6">
              <Link
                href="/"
                className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <BarChart3 className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/analytics"
                className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Settings className="w-5 h-5" />
                <span>Analytics</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Welcome to Simmonds Platform
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A Next.js 14 + Convex-powered platform with real-time analytics and dashboard features
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow">
            <div className="bg-blue-100 dark:bg-blue-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Home className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Modern Stack
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Built with Next.js 14, React 18, and TypeScript for type-safe development
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow">
            <div className="bg-green-100 dark:bg-green-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Activity className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Real-time Updates
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Powered by Convex for seamless real-time data synchronization
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow">
            <div className="bg-purple-100 dark:bg-purple-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Analytics Dashboard
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Comprehensive analytics and insights at your fingertips
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-colors"
          >
            <BarChart3 className="w-5 h-5" />
            <span>Go to Dashboard</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
