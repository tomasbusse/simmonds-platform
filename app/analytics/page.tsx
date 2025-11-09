"use client";

import Link from "next/link";
import { ArrowLeft, Activity, Users, Clock, TrendingUp } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function AnalyticsPage() {
  const metrics = useQuery(api.analytics.getMetrics);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <nav className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <Activity className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Analytics
              </h1>
            </div>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Analytics Overview
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Real-time insights powered by Convex
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 dark:bg-blue-900 w-12 h-12 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              {metrics?.totalViews || 0}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Total Page Views</p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 dark:bg-green-900 w-12 h-12 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              {metrics?.uniqueVisitors || 0}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Unique Visitors</p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 dark:bg-purple-900 w-12 h-12 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              {metrics?.avgSessionDuration || 0}s
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Avg. Session</p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 dark:bg-orange-900 w-12 h-12 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              98.5%
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Uptime</p>
          </div>
        </div>

        {/* Recent Events */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
            Recent Events
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-900 dark:text-white">
                    Event Type
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-900 dark:text-white">
                    Page
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-900 dark:text-white">
                    User ID
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-900 dark:text-white">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {metrics?.recentEvents?.map((event: any) => (
                  <tr
                    key={event._id}
                    className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                  >
                    <td className="py-3 px-4 text-sm text-slate-900 dark:text-white">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                        {event.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                      {event.page}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400 font-mono">
                      {event.userId.slice(0, 12)}...
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </td>
                  </tr>
                )) || (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-500 dark:text-slate-400">
                      No events tracked yet. Visit the dashboard to generate events!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-6">
          <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            Real-time Updates
          </h4>
          <p className="text-blue-800 dark:text-blue-200 text-sm">
            All analytics data is powered by Convex and updates in real-time. Visit different pages
            to see the metrics update automatically!
          </p>
        </div>
      </main>
    </div>
  );
}
