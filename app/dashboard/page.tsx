"use client";

import Link from "next/link";
import { Activity, ArrowLeft, BarChart3, TrendingUp, Users, Eye } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect } from "react";

export default function DashboardPage() {
  const messages = useQuery(api.messages.list);
  const sendMessage = useMutation(api.messages.send);
  const trackEvent = useMutation(api.analytics.trackEvent);

  useEffect(() => {
    // Track page view
    if (trackEvent) {
      trackEvent({
        type: "page_view",
        userId: "user_" + Math.random().toString(36).slice(2),
        page: "/dashboard",
        duration: 0,
      });
    }
  }, [trackEvent]);

  const handleSendMessage = async () => {
    await sendMessage({
      author: "Dashboard User",
      body: "Test message from dashboard at " + new Date().toLocaleTimeString(),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <nav className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <Activity className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Dashboard
              </h1>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 dark:bg-blue-900 w-12 h-12 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-green-600 text-sm font-semibold">+12.5%</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              2,847
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Total Views</p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 dark:bg-green-900 w-12 h-12 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-green-600 text-sm font-semibold">+8.2%</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              1,249
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Active Users</p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 dark:bg-purple-900 w-12 h-12 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-green-600 text-sm font-semibold">+23.1%</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              89.2%
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Engagement</p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 dark:bg-orange-900 w-12 h-12 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <span className="text-green-600 text-sm font-semibold">+5.4%</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              {messages?.length || 0}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Messages</p>
          </div>
        </div>

        {/* Real-time Messages Section */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {messages?.slice(0, 5).map((msg: any, idx: number) => (
                <div
                  key={msg._id}
                  className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg"
                >
                  <div className="bg-blue-100 dark:bg-blue-900 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">
                      {msg.author.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {msg.author}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {msg.body}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                      {new Date(msg.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              )) || (
                <p className="text-slate-500 dark:text-slate-400 text-center py-8">
                  No messages yet. Click the button below to send a test message!
                </p>
              )}
            </div>
            <button
              onClick={handleSendMessage}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Send Test Message
            </button>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
              Quick Actions
            </h3>
            <div className="space-y-4">
              <Link
                href="/analytics"
                className="block p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg hover:shadow-md transition-shadow border border-blue-200 dark:border-blue-700"
              >
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      View Analytics
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Detailed insights and metrics
                    </p>
                  </div>
                </div>
              </Link>

              <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border border-green-200 dark:border-green-700">
                <div className="flex items-center gap-3">
                  <Activity className="w-6 h-6 text-green-600 dark:text-green-400" />
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      System Status
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      All systems operational
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg border border-purple-200 dark:border-purple-700">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      Performance
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Excellent response time
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
