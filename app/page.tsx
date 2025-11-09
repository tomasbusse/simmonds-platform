"use client";

import Link from "next/link";
import { GraduationCap, Users, BarChart3, Sparkles, BookOpen, Award } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-neutral-dark/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 gradient-blue rounded-xl flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary-blue">
                  Simmonds
                </h1>
                <p className="text-xs text-neutral-dark">English Learning Platform</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Link href="/admin" className="btn btn-secondary">
                Admin
              </Link>
              <Link href="/teacher" className="btn btn-primary">
                Teacher
              </Link>
              <Link href="/student" className="btn btn-success">
                Student
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main>
        <div className="gradient-soft py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-6xl font-bold mb-6 text-primary-blue">
                Transform Corporate English Learning
              </h2>
              <p className="text-2xl text-neutral-dark mb-8 leading-relaxed">
                AI-powered assessments, personalized learning paths, and comprehensive
                management tools for modern companies.
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/admin/demo" className="btn btn-primary text-lg px-8 py-4">
                  Start Free Trial
                </Link>
                <Link href="#features" className="btn btn-secondary text-lg px-8 py-4">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">Everything You Need</h3>
            <p className="text-xl text-neutral-dark">
              Complete solution for corporate English training
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card p-8">
              <div className="w-16 h-16 bg-primary-blue/10 rounded-2xl flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-primary-blue" />
              </div>
              <h4 className="text-2xl font-semibold mb-3">AI-Generated Tests</h4>
              <p className="text-neutral-dark leading-relaxed">
                Automatically create Cambridge-aligned assessments with GPT-4 and Claude.
                Save hours of content creation time.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card p-8">
              <div className="w-16 h-16 bg-primary-purple/10 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-primary-purple" />
              </div>
              <h4 className="text-2xl font-semibold mb-3">Smart Group Allocation</h4>
              <p className="text-neutral-dark leading-relaxed">
                Automatically assign employees to beginner, intermediate, or advanced groups
                based on assessment results.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card p-8">
              <div className="w-16 h-16 bg-primary-pink/10 rounded-2xl flex items-center justify-center mb-6">
                <BarChart3 className="w-8 h-8 text-primary-pink" />
              </div>
              <h4 className="text-2xl font-semibold mb-3">Real-Time Progress</h4>
              <p className="text-neutral-dark leading-relaxed">
                Track attendance, test scores, and learning progress with live dashboards
                for admins and teachers.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="card p-8">
              <div className="w-16 h-16 bg-primary-blue/10 rounded-2xl flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8 text-primary-blue" />
              </div>
              <h4 className="text-2xl font-semibold mb-3">Interactive Lessons</h4>
              <p className="text-neutral-dark leading-relaxed">
                Create engaging lessons with audio content powered by ElevenLabs.
                Schedule and manage everything from one place.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="card p-8">
              <div className="w-16 h-16 bg-primary-purple/10 rounded-2xl flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-primary-purple" />
              </div>
              <h4 className="text-2xl font-semibold mb-3">Cambridge Aligned</h4>
              <p className="text-neutral-dark leading-relaxed">
                All assessments follow Cambridge English standards. Prepare employees
                for official certifications.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="card p-8">
              <div className="w-16 h-16 bg-primary-pink/10 rounded-2xl flex items-center justify-center mb-6">
                <GraduationCap className="w-8 h-8 text-primary-pink" />
              </div>
              <h4 className="text-2xl font-semibold mb-3">Positive Experience</h4>
              <p className="text-neutral-dark leading-relaxed">
                Students only see encouraging results. Beautiful, Apple-like interface
                makes learning enjoyable.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="gradient-blue py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Team's English Skills?
            </h3>
            <p className="text-xl text-white/90 mb-8">
              Join forward-thinking companies using Simmonds to upskill their workforce.
            </p>
            <Link href="/admin/demo" className="btn bg-white text-primary-blue hover:bg-white/90 text-lg px-10 py-5">
              Get Started Today
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-dark/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 gradient-blue rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-primary-blue">Simmonds</p>
                <p className="text-xs text-neutral-dark">Powered by AI</p>
              </div>
            </div>
            <p className="text-neutral-dark text-sm">
              © 2024 Simmonds. Built with Next.js, Convex & AI.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
