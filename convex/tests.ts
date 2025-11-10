import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get test by ID with questions
export const getTest = query({
  args: { testId: v.id("tests") },
  handler: async (ctx, args) => {
    const test = await ctx.db.get(args.testId);
    if (!test) return null;

    const questions = await ctx.db
      .query("questions")
      .withIndex("by_test", (q) => q.eq("testId", args.testId))
      .collect();

    return {
      ...test,
      questions: questions.sort((a, b) => a.order - b.order),
    };
  },
});

// Get all tests
export const getAllTests = query({
  args: {
    companyId: v.optional(v.id("companies")),
    type: v.optional(v.union(
      v.literal("placement"),
      v.literal("progress"),
      v.literal("cambridge")
    )),
  },
  handler: async (ctx, args) => {
    let query = ctx.db.query("tests");

    if (args.companyId) {
      const tests = await query.collect();
      return tests.filter(t => t.companyId === args.companyId);
    }

    if (args.type !== undefined) {
      return await query
        .withIndex("by_type", (q) => q.eq("type", args.type!))
        .collect();
    }

    return await query.collect();
  },
});

// Create new test
export const createTest = mutation({
  args: {
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
    duration: v.number(),
    passingScore: v.optional(v.number()),
    createdBy: v.id("users"),
    companyId: v.optional(v.id("companies")),
  },
  handler: async (ctx, args) => {
    const testId = await ctx.db.insert("tests", {
      ...args,
      isActive: true,
      createdAt: Date.now(),
    });

    return testId;
  },
});

// Add question to test
export const addQuestion = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const questionId = await ctx.db.insert("questions", args);
    return questionId;
  },
});

// Submit test results
export const submitTestResults = mutation({
  args: {
    testId: v.id("tests"),
    studentId: v.id("users"),
    answers: v.array(v.object({
      questionId: v.id("questions"),
      answer: v.string(),
    })),
    startedAt: v.number(),
  },
  handler: async (ctx, args) => {
    // Get all questions for the test
    const questions = await ctx.db
      .query("questions")
      .withIndex("by_test", (q) => q.eq("testId", args.testId))
      .collect();

    // Grade the answers
    let score = 0;
    let totalPoints = 0;

    const gradedAnswers = args.answers.map((answer) => {
      const question = questions.find(q => q._id === answer.questionId);
      if (!question) {
        return {
          questionId: answer.questionId,
          answer: answer.answer,
          isCorrect: false,
          points: 0,
        };
      }

      totalPoints += question.points;
      const isCorrect = answer.answer.toLowerCase().trim() ===
                       question.correctAnswer.toLowerCase().trim();

      if (isCorrect) {
        score += question.points;
      }

      return {
        questionId: answer.questionId,
        answer: answer.answer,
        isCorrect,
        points: isCorrect ? question.points : 0,
      };
    });

    const percentageScore = totalPoints > 0 ? (score / totalPoints) * 100 : 0;

    // Get test to check passing score
    const test = await ctx.db.get(args.testId);
    const passed = test?.passingScore ? percentageScore >= test.passingScore : percentageScore >= 70;

    const resultId = await ctx.db.insert("test_results", {
      testId: args.testId,
      studentId: args.studentId,
      score,
      totalPoints,
      percentageScore,
      passed,
      answers: gradedAnswers,
      startedAt: args.startedAt,
      completedAt: Date.now(),
      duration: Math.floor((Date.now() - args.startedAt) / 1000),
    });

    return {
      resultId,
      score,
      totalPoints,
      percentageScore,
      passed,
    };
  },
});

// Get student test results
export const getStudentResults = query({
  args: { studentId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("test_results")
      .withIndex("by_student", (q) => q.eq("studentId", args.studentId))
      .collect();
  },
});