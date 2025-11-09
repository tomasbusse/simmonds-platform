"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GraduationCap, Clock, ChevronLeft, ChevronRight, Volume2, Loader2 } from "lucide-react";

export default function TakeTestPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes in seconds

  // Sample test data
  const test = {
    id: params.id,
    title: "Business Communication - Intermediate",
    description: "Test your business English communication skills",
    level: "intermediate",
    duration: 30,
    questions: [
      {
        id: 1,
        type: "multiple_choice",
        question: "Which sentence is grammatically correct for a formal business email?",
        options: [
          "I am writing to inform you about the meeting.",
          "I'm gonna tell you about the meeting.",
          "Let me tell ya about the meeting.",
          "Meeting is happening, FYI.",
        ],
        correctAnswer: "I am writing to inform you about the meeting.",
        points: 5,
        hasAudio: true,
      },
      {
        id: 2,
        type: "multiple_choice",
        question: "What is the appropriate closing for a formal business letter?",
        options: [
          "Sincerely,",
          "Cheers,",
          "Later,",
          "TTYL,",
        ],
        correctAnswer: "Sincerely,",
        points: 5,
        hasAudio: false,
      },
      {
        id: 3,
        type: "fill_blank",
        question: "Please ____ this matter at your earliest convenience.",
        placeholder: "address",
        correctAnswer: "address",
        points: 5,
        hasAudio: true,
      },
      {
        id: 4,
        type: "multiple_choice",
        question: "Which phrase is most professional for declining a meeting invitation?",
        options: [
          "I regret that I am unable to attend due to a prior commitment.",
          "Nah, I'm busy that day.",
          "Can't make it, sorry.",
          "Not gonna happen.",
        ],
        correctAnswer: "I regret that I am unable to attend due to a prior commitment.",
        points: 5,
        hasAudio: false,
      },
      {
        id: 5,
        type: "true_false",
        question: "It is appropriate to use emojis in formal business correspondence.",
        options: ["True", "False"],
        correctAnswer: "False",
        points: 5,
        hasAudio: false,
      },
    ],
  };

  const progress = ((currentQuestion + 1) / test.questions.length) * 100;
  const isLastQuestion = currentQuestion === test.questions.length - 1;
  const isFirstQuestion = currentQuestion === 0;

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
  };

  const handleNext = () => {
    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < test.questions.length) {
      const unanswered = test.questions.length - Object.keys(answers).length;
      if (!confirm(`You have ${unanswered} unanswered question(s). Submit anyway?`)) {
        return;
      }
    }

    setIsSubmitting(true);

    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In real app, this would call the Convex mutation to submit test results
    // For now, redirect to results page
    router.push(`/student/tests/result/${params.id}`);
  };

  const currentQ = test.questions[currentQuestion];
  const currentAnswer = answers[currentQuestion];

  // Format time remaining
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-neutral-dark/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link href="/student" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-pink rounded-xl flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary-blue">Simmonds</h1>
                <p className="text-xs text-neutral-dark">Assessment in Progress</p>
              </div>
            </Link>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary-pink" />
                <span className="text-lg font-semibold text-primary-pink">
                  {minutes}:{seconds.toString().padStart(2, '0')}
                </span>
              </div>
              <Link href="/student/tests" className="text-neutral-dark hover:text-primary-pink transition-colors">
                Exit Test
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Test Header */}
        <div className="card p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-1">{test.title}</h2>
              <p className="text-neutral-dark">{test.description}</p>
            </div>
            <span className="badge badge-pink">{test.level}</span>
          </div>

          {/* Progress Bar */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                Question {currentQuestion + 1} of {test.questions.length}
              </span>
              <span className="text-sm text-neutral-dark">{Math.round(progress)}% Complete</span>
            </div>
            <div className="h-2 bg-neutral-light rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-pink transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Navigation Dots */}
          <div className="flex gap-2 flex-wrap">
            {test.questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentQuestion(idx)}
                className={`w-8 h-8 rounded-lg font-medium text-sm transition-all ${
                  idx === currentQuestion
                    ? 'bg-primary-pink text-white'
                    : answers[idx]
                    ? 'bg-primary-purple/20 text-primary-purple'
                    : 'bg-neutral-light text-neutral-dark hover:bg-neutral-light/50'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Question Card */}
        <div className="card p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="badge badge-purple">{currentQ.type.replace('_', ' ')}</span>
                <span className="badge badge-blue">{currentQ.points} points</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4">{currentQ.question}</h3>
            </div>
            {currentQ.hasAudio && (
              <button className="p-3 bg-primary-purple/10 rounded-xl hover:bg-primary-purple/20 transition-colors">
                <Volume2 className="w-6 h-6 text-primary-purple" />
              </button>
            )}
          </div>

          {/* Answer Options */}
          <div className="space-y-3">
            {currentQ.type === "multiple_choice" || currentQ.type === "true_false" ? (
              currentQ.options?.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    currentAnswer === option
                      ? 'border-primary-pink bg-primary-pink/10'
                      : 'border-neutral-dark/10 hover:border-primary-pink/50 hover:bg-neutral-light'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        currentAnswer === option
                          ? 'border-primary-pink bg-primary-pink'
                          : 'border-neutral-dark/30'
                      }`}
                    >
                      {currentAnswer === option && (
                        <div className="w-3 h-3 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="font-medium">{String.fromCharCode(65 + idx)}.</span>
                    <span className="flex-1">{option}</span>
                  </div>
                </button>
              ))
            ) : currentQ.type === "fill_blank" ? (
              <div>
                <input
                  type="text"
                  value={currentAnswer || ''}
                  onChange={(e) => handleAnswer(e.target.value)}
                  placeholder={currentQ.placeholder || "Type your answer here..."}
                  className="input w-full text-lg"
                />
                <p className="text-sm text-neutral-dark mt-2">
                  Enter your answer in the box above
                </p>
              </div>
            ) : currentQ.type === "short_answer" ? (
              <div>
                <textarea
                  value={currentAnswer || ''}
                  onChange={(e) => handleAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  rows={4}
                  className="input w-full"
                />
                <p className="text-sm text-neutral-dark mt-2">
                  Write your response in 1-2 sentences
                </p>
              </div>
            ) : null}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={isFirstQuestion}
            className="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </button>

          <div className="text-sm text-neutral-dark">
            {Object.keys(answers).length} of {test.questions.length} answered
          </div>

          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn btn-primary"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Test'
              )}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="btn btn-primary"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </button>
          )}
        </div>

        {/* Help Card */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <p className="text-sm text-neutral-dark">
            💡 <strong>Tip:</strong> You can navigate between questions using the numbered buttons at the top.
            Make sure to answer all questions before submitting!
          </p>
        </div>
      </main>
    </div>
  );
}
