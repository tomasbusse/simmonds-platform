import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Core User Management
  users: defineTable({
    email: v.string(),
    name: v.string(),
    role: v.union(v.literal("admin"), v.literal("teacher"), v.literal("student")),
    companyId: v.optional(v.id("companies")),
    avatarUrl: v.optional(v.string()),
    createdAt: v.number(),
    lastActive: v.optional(v.number()),
  })
    .index("by_email", ["email"])
    .index("by_company", ["companyId"])
    .index("by_role", ["role"]),

  // Company Management
  companies: defineTable({
    name: v.string(),
    domain: v.optional(v.string()),
    logo: v.optional(v.string()),
    adminId: v.id("users"),
    settings: v.optional(v.object({
      allowSelfRegistration: v.boolean(),
      defaultTestId: v.optional(v.id("tests")),
    })),
    createdAt: v.number(),
  })
    .index("by_admin", ["adminId"]),

  // Learning Groups
  groups: defineTable({
    name: v.string(),
    level: v.union(
      v.literal("beginner"),
      v.literal("intermediate"),
      v.literal("advanced")
    ),
    companyId: v.id("companies"),
    teacherId: v.optional(v.id("users")),
    description: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_company", ["companyId"])
    .index("by_teacher", ["teacherId"]),

  // Group Memberships
  group_members: defineTable({
    groupId: v.id("groups"),
    studentId: v.id("users"),
    joinedAt: v.number(),
  })
    .index("by_group", ["groupId"])
    .index("by_student", ["studentId"]),

  // Tests & Assessments
  tests: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    type: v.union(
      v.literal("placement"),
      v.literal("progress"),
      v.literal("cambridge")
    ),
    level: v.optional(v.union(
      v.literal("beginner"),
      v.literal("intermediate"),
      v.literal("advanced")
    )),
    duration: v.number(), // in minutes
    passingScore: v.optional(v.number()),
    createdBy: v.id("users"),
    companyId: v.optional(v.id("companies")),
    isActive: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_company", ["companyId"])
    .index("by_creator", ["createdBy"])
    .index("by_type", ["type"]),

  // Test Questions
  questions: defineTable({
    testId: v.id("tests"),
    type: v.union(
      v.literal("multiple_choice"),
      v.literal("true_false"),
      v.literal("fill_blank"),
      v.literal("essay")
    ),
    question: v.string(),
    options: v.optional(v.array(v.string())),
    correctAnswer: v.string(),
    points: v.number(),
    explanation: v.optional(v.string()),
    audioUrl: v.optional(v.string()),
    order: v.number(),
    generatedByAI: v.optional(v.boolean()),
  })
    .index("by_test", ["testId"]),

  // Test Results
  test_results: defineTable({
    testId: v.id("tests"),
    studentId: v.id("users"),
    score: v.number(),
    totalPoints: v.number(),
    percentageScore: v.number(),
    passed: v.boolean(),
    answers: v.array(v.object({
      questionId: v.id("questions"),
      answer: v.string(),
      isCorrect: v.boolean(),
      points: v.number(),
    })),
    startedAt: v.number(),
    completedAt: v.number(),
    duration: v.number(), // in seconds
  })
    .index("by_test", ["testId"])
    .index("by_student", ["studentId"]),

  // Lessons
  lessons: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    groupId: v.id("groups"),
    teacherId: v.id("users"),
    scheduledAt: v.number(),
    duration: v.number(), // in minutes
    content: v.optional(v.string()),
    materials: v.optional(v.array(v.object({
      type: v.union(v.literal("document"), v.literal("audio"), v.literal("video")),
      url: v.string(),
      title: v.string(),
    }))),
    status: v.union(
      v.literal("scheduled"),
      v.literal("in_progress"),
      v.literal("completed"),
      v.literal("cancelled")
    ),
    createdAt: v.number(),
  })
    .index("by_group", ["groupId"])
    .index("by_teacher", ["teacherId"])
    .index("by_scheduled_time", ["scheduledAt"]),

  // Attendance
  attendance: defineTable({
    lessonId: v.id("lessons"),
    studentId: v.id("users"),
    status: v.union(
      v.literal("present"),
      v.literal("absent"),
      v.literal("late")
    ),
    checkedInAt: v.optional(v.number()),
    notes: v.optional(v.string()),
  })
    .index("by_lesson", ["lessonId"])
    .index("by_student", ["studentId"]),

  // Progress Tracking
  progress: defineTable({
    studentId: v.id("users"),
    groupId: v.optional(v.id("groups")),
    currentLevel: v.union(
      v.literal("beginner"),
      v.literal("intermediate"),
      v.literal("advanced")
    ),
    metrics: v.object({
      lessonsAttended: v.number(),
      testsCompleted: v.number(),
      averageScore: v.number(),
      hoursStudied: v.number(),
    }),
    lastUpdated: v.number(),
  })
    .index("by_student", ["studentId"])
    .index("by_group", ["groupId"]),

  // Audio Content (ElevenLabs)
  audio_content: defineTable({
    text: v.string(),
    audioUrl: v.string(),
    voiceId: v.string(),
    duration: v.optional(v.number()),
    generatedAt: v.number(),
    usedIn: v.optional(v.union(
      v.object({ type: v.literal("question"), id: v.id("questions") }),
      v.object({ type: v.literal("lesson"), id: v.id("lessons") })
    )),
  }),

  // Email Communication (Resend)
  emails: defineTable({
    to: v.string(),
    from: v.string(),
    subject: v.string(),
    type: v.union(
      v.literal("test_invitation"),
      v.literal("results"),
      v.literal("reminder"),
      v.literal("welcome")
    ),
    sentAt: v.number(),
    status: v.union(
      v.literal("sent"),
      v.literal("delivered"),
      v.literal("failed")
    ),
    metadata: v.optional(v.any()),
  })
    .index("by_recipient", ["to"])
    .index("by_type", ["type"]),

  // Notifications
  notifications: defineTable({
    userId: v.id("users"),
    title: v.string(),
    message: v.string(),
    type: v.union(
      v.literal("info"),
      v.literal("success"),
      v.literal("warning"),
      v.literal("error")
    ),
    read: v.boolean(),
    actionUrl: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_read_status", ["userId", "read"]),
});
