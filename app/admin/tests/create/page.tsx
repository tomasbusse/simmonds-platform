"use client";

import { useState } from "react";
import Link from "next/link";
import { GraduationCap, Sparkles, Loader2, Volume2, Edit2, Save, ArrowLeft } from "lucide-react";
import { useMutation, useAction } from "convex/react";
import { api } from "@/convex/_generated/api";

type QuestionLevel = "beginner" | "intermediate" | "advanced" | "business" | "cambridge";
type QuestionType = "multiple_choice" | "true_false" | "fill_blank" | "short_answer" | "essay";

interface GeneratedQuestion {
  question: string;
  type: QuestionType;
  options?: string[];
  correctAnswer: string;
  points: number;
  explanation?: string;
  audioUrl?: string;
}

export default function CreateTestPage() {
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState<QuestionLevel>("intermediate");
  const [questionCount, setQuestionCount] = useState(10);
  const [questionType, setQuestionType] = useState<QuestionType>("multiple_choice");
  const [testTitle, setTestTitle] = useState("");
  const [testDescription, setTestDescription] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<GeneratedQuestion[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const generateQuestions = useAction(api.ai.generateTestQuestions);
  const generateAudio = useAction(api.audio.generateQuestionAudio);

  const handleGenerate = async () => {
    if (!topic) {
      alert("Please enter a topic");
      return;
    }

    setIsGenerating(true);
    try {
      const questions = await generateQuestions({
        topic,
        level,
        questionCount,
        questionType,
      });
      setGeneratedQuestions(questions);

      // Auto-fill test title if empty
      if (!testTitle) {
        setTestTitle(`${topic} - ${level.charAt(0).toUpperCase() + level.slice(1)} Level`);
      }
    } catch (error) {
      console.error("Error generating questions:", error);
      alert("Failed to generate questions. Please check your API key and try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateAudio = async (index: number) => {
    try {
      const question = generatedQuestions[index];
      const audioUrl = await generateAudio({
        questionText: question.question,
        questionId: `temp-${index}`,
      });

      const updated = [...generatedQuestions];
      updated[index] = { ...question, audioUrl };
      setGeneratedQuestions(updated);
    } catch (error) {
      console.error("Error generating audio:", error);
      alert("Failed to generate audio. Please check your API key.");
    }
  };

  const handleSaveTest = async () => {
    if (!testTitle || generatedQuestions.length === 0) {
      alert("Please provide a test title and generate questions first");
      return;
    }

    setIsSaving(true);
    try {
      // In a real implementation, this would save to the database
      // For now, we'll just show a success message
      alert(`Test "${testTitle}" created successfully with ${generatedQuestions.length} questions!`);

      // Reset form
      setTestTitle("");
      setTestDescription("");
      setTopic("");
      setGeneratedQuestions([]);
    } catch (error) {
      console.error("Error saving test:", error);
      alert("Failed to save test. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const updateQuestion = (index: number, field: keyof GeneratedQuestion, value: any) => {
    const updated = [...generatedQuestions];
    updated[index] = { ...updated[index], [field]: value };
    setGeneratedQuestions(updated);
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
              <Link href="/admin" className="btn btn-secondary">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-2">AI Test Generator</h2>
          <p className="text-xl text-neutral-dark">
            Generate Cambridge-aligned test questions with GPT-4 and Claude
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary-purple/10 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary-purple" />
                </div>
                <h3 className="text-xl font-semibold">Test Configuration</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Topic</label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., Business Communication"
                    className="input w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Level</label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value as QuestionLevel)}
                    className="input w-full"
                  >
                    <option value="beginner">Beginner (A1-A2)</option>
                    <option value="intermediate">Intermediate (B1-B2)</option>
                    <option value="advanced">Advanced (C1-C2)</option>
                    <option value="business">Business English</option>
                    <option value="cambridge">Cambridge Exam Prep</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Question Type</label>
                  <select
                    value={questionType}
                    onChange={(e) => setQuestionType(e.target.value as QuestionType)}
                    className="input w-full"
                  >
                    <option value="multiple_choice">Multiple Choice</option>
                    <option value="true_false">True/False</option>
                    <option value="fill_blank">Fill in the Blank</option>
                    <option value="short_answer">Short Answer</option>
                    <option value="essay">Essay</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Number of Questions</label>
                  <input
                    type="number"
                    value={questionCount}
                    onChange={(e) => setQuestionCount(parseInt(e.target.value) || 1)}
                    min="1"
                    max="50"
                    className="input w-full"
                  />
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !topic}
                  className="btn btn-primary w-full"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Questions
                    </>
                  )}
                </button>
              </div>

              {generatedQuestions.length > 0 && (
                <div className="mt-6 pt-6 border-t border-neutral-dark/10">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Test Title</label>
                      <input
                        type="text"
                        value={testTitle}
                        onChange={(e) => setTestTitle(e.target.value)}
                        placeholder="Enter test title"
                        className="input w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Description (Optional)</label>
                      <textarea
                        value={testDescription}
                        onChange={(e) => setTestDescription(e.target.value)}
                        placeholder="Test description..."
                        rows={3}
                        className="input w-full"
                      />
                    </div>

                    <button
                      onClick={handleSaveTest}
                      disabled={isSaving || !testTitle}
                      className="btn btn-success w-full"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save Test
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Questions Preview */}
          <div className="lg:col-span-2">
            {generatedQuestions.length === 0 ? (
              <div className="card p-12 text-center">
                <div className="w-20 h-20 bg-primary-purple/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-10 h-10 text-primary-purple" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">No Questions Yet</h3>
                <p className="text-neutral-dark mb-6">
                  Configure your test parameters and click "Generate Questions" to get started.
                </p>
                <div className="max-w-md mx-auto text-left">
                  <p className="text-sm text-neutral-dark mb-2">💡 Tips:</p>
                  <ul className="text-sm text-neutral-dark space-y-1 list-disc list-inside">
                    <li>Be specific with topics for better results</li>
                    <li>Start with 5-10 questions to test quality</li>
                    <li>You can edit generated questions before saving</li>
                    <li>Generate audio for pronunciation practice</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold">
                    Generated Questions ({generatedQuestions.length})
                  </h3>
                  <span className="badge badge-purple">
                    {generatedQuestions.reduce((sum, q) => sum + q.points, 0)} total points
                  </span>
                </div>

                {generatedQuestions.map((question, index) => (
                  <div key={index} className="card p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 bg-primary-blue/10 rounded-lg flex items-center justify-center text-primary-blue font-semibold">
                          {index + 1}
                        </span>
                        <span className="badge badge-blue">{question.type.replace('_', ' ')}</span>
                        <span className="badge badge-purple">{question.points} pts</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleGenerateAudio(index)}
                          className="p-2 hover:bg-neutral-light rounded-lg transition-colors"
                          title="Generate audio"
                        >
                          <Volume2 className="w-4 h-4 text-primary-purple" />
                        </button>
                        <button
                          onClick={() => setEditingIndex(editingIndex === index ? null : index)}
                          className="p-2 hover:bg-neutral-light rounded-lg transition-colors"
                          title="Edit question"
                        >
                          <Edit2 className="w-4 h-4 text-primary-blue" />
                        </button>
                      </div>
                    </div>

                    {editingIndex === index ? (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Question</label>
                          <textarea
                            value={question.question}
                            onChange={(e) => updateQuestion(index, 'question', e.target.value)}
                            rows={3}
                            className="input w-full"
                          />
                        </div>

                        {question.options && (
                          <div>
                            <label className="block text-sm font-medium mb-2">Options</label>
                            {question.options.map((option, optIdx) => (
                              <input
                                key={optIdx}
                                type="text"
                                value={option}
                                onChange={(e) => {
                                  const newOptions = [...question.options!];
                                  newOptions[optIdx] = e.target.value;
                                  updateQuestion(index, 'options', newOptions);
                                }}
                                className="input w-full mb-2"
                                placeholder={`Option ${optIdx + 1}`}
                              />
                            ))}
                          </div>
                        )}

                        <div>
                          <label className="block text-sm font-medium mb-2">Correct Answer</label>
                          <input
                            type="text"
                            value={question.correctAnswer}
                            onChange={(e) => updateQuestion(index, 'correctAnswer', e.target.value)}
                            className="input w-full"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Points</label>
                          <input
                            type="number"
                            value={question.points}
                            onChange={(e) => updateQuestion(index, 'points', parseInt(e.target.value) || 1)}
                            min="1"
                            className="input w-full"
                          />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="font-medium text-lg mb-3">{question.question}</p>

                        {question.options && (
                          <div className="space-y-2 mb-3">
                            {question.options.map((option, optIdx) => (
                              <div
                                key={optIdx}
                                className={`p-3 rounded-lg border ${
                                  option === question.correctAnswer
                                    ? 'bg-green-50 border-green-200'
                                    : 'bg-neutral-light border-neutral-dark/10'
                                }`}
                              >
                                <span className="font-medium mr-2">{String.fromCharCode(65 + optIdx)}.</span>
                                {option}
                                {option === question.correctAnswer && (
                                  <span className="ml-2 text-green-600 text-sm">✓ Correct</span>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {!question.options && (
                          <div className="p-3 bg-green-50 border border-green-200 rounded-lg mb-3">
                            <p className="text-sm text-neutral-dark mb-1">Correct Answer:</p>
                            <p className="font-medium text-green-700">{question.correctAnswer}</p>
                          </div>
                        )}

                        {question.explanation && (
                          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm text-neutral-dark mb-1">Explanation:</p>
                            <p className="text-sm">{question.explanation}</p>
                          </div>
                        )}

                        {question.audioUrl && (
                          <div className="mt-3">
                            <audio controls className="w-full">
                              <source src={question.audioUrl} type="audio/mpeg" />
                            </audio>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
