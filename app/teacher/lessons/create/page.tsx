"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GraduationCap, Calendar, Clock, Users, BookOpen, Plus, X, Loader2 } from "lucide-react";

export default function CreateLessonPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [groupId, setGroupId] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [materials, setMaterials] = useState<string[]>([]);
  const [newMaterial, setNewMaterial] = useState("");
  const [objectives, setObjectives] = useState<string[]>([]);
  const [newObjective, setNewObjective] = useState("");

  // Sample groups data
  const groups = [
    { id: 1, name: "Beginner Group A", students: 15, level: "beginner" },
    { id: 2, name: "Intermediate Group B", students: 18, level: "intermediate" },
    { id: 3, name: "Advanced Group C", students: 9, level: "advanced" },
  ];

  const addMaterial = () => {
    if (newMaterial.trim()) {
      setMaterials([...materials, newMaterial.trim()]);
      setNewMaterial("");
    }
  };

  const removeMaterial = (index: number) => {
    setMaterials(materials.filter((_, idx) => idx !== index));
  };

  const addObjective = () => {
    if (newObjective.trim()) {
      setObjectives([...objectives, newObjective.trim()]);
      setNewObjective("");
    }
  };

  const removeObjective = (index: number) => {
    setObjectives(objectives.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !groupId || !date || !startTime || !endTime) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In real app, this would save to Convex
    alert("Lesson scheduled successfully!");
    router.push("/teacher/lessons");
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
              <Link href="/teacher/lessons" className="btn btn-secondary">
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-2">Schedule New Lesson</h2>
          <p className="text-xl text-neutral-dark">
            Plan and schedule a lesson for your students
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="card p-8">
              <h3 className="text-2xl font-semibold mb-6">Basic Information</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Lesson Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Grammar Essentials"
                    className="input w-full"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief description of the lesson content..."
                    rows={3}
                    className="input w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Select Group <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={groupId}
                    onChange={(e) => setGroupId(e.target.value)}
                    className="input w-full"
                    required
                  >
                    <option value="">Choose a group...</option>
                    {groups.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.name} ({group.students} students) - {group.level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div className="card p-8">
              <h3 className="text-2xl font-semibold mb-6">Schedule</h3>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="input w-full"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Start Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="input w-full"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    End Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="input w-full"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Materials */}
            <div className="card p-8">
              <h3 className="text-2xl font-semibold mb-6">Learning Materials</h3>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMaterial}
                    onChange={(e) => setNewMaterial(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addMaterial())}
                    placeholder="Add a material (e.g., Grammar Workbook - Unit 5)"
                    className="input flex-1"
                  />
                  <button
                    type="button"
                    onClick={addMaterial}
                    className="btn btn-secondary"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {materials.length > 0 && (
                  <div className="space-y-2">
                    {materials.map((material, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 bg-neutral-light rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <BookOpen className="w-4 h-4 text-primary-purple" />
                          <span>{material}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeMaterial(idx)}
                          className="p-1 hover:bg-red-50 rounded transition-colors"
                        >
                          <X className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="card p-8">
              <h3 className="text-2xl font-semibold mb-6">Learning Objectives</h3>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newObjective}
                    onChange={(e) => setNewObjective(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addObjective())}
                    placeholder="Add a learning objective"
                    className="input flex-1"
                  />
                  <button
                    type="button"
                    onClick={addObjective}
                    className="btn btn-secondary"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {objectives.length > 0 && (
                  <div className="space-y-2">
                    {objectives.map((objective, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 bg-neutral-light rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-primary-purple font-medium">{idx + 1}.</span>
                          <span>{objective}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeObjective(idx)}
                          className="p-1 hover:bg-red-50 rounded transition-colors"
                        >
                          <X className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 justify-end">
              <Link href="/teacher/lessons" className="btn btn-secondary">
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Scheduling...
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Lesson
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
