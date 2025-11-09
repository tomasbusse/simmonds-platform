import { action } from "./_generated/server";
import { v } from "convex/values";

// Generate test questions using OpenRouter AI
export const generateTestQuestions = action({
  args: {
    topic: v.string(),
    level: v.union(
      v.literal("beginner"),
      v.literal("intermediate"),
      v.literal("advanced")
    ),
    questionCount: v.number(),
    questionType: v.union(
      v.literal("multiple_choice"),
      v.literal("true_false"),
      v.literal("fill_blank")
    ),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      throw new Error("OpenRouter API key not configured");
    }

    const prompt = `Generate ${args.questionCount} ${args.questionType} English language test questions for ${args.level} level students on the topic of "${args.topic}".

For each question, provide:
1. The question text
2. ${args.questionType === "multiple_choice" ? "4 answer options (A, B, C, D)" : ""}
3. The correct answer
4. A brief explanation

Format the response as JSON array with this structure:
[
  {
    "question": "question text",
    ${args.questionType === "multiple_choice" ? '"options": ["A. option1", "B. option2", "C. option3", "D. option4"],' : ''}
    "correctAnswer": "correct answer",
    "explanation": "why this is correct"
  }
]

Make sure questions follow Cambridge English exam standards and are appropriate for ${args.level} level.`;

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://simmonds.online",
          "X-Title": "Simmonds English Learning Platform",
        },
        body: JSON.stringify({
          model: "openai/gpt-4-turbo",
          messages: [
            {
              role: "system",
              content: "You are an expert English language test creator. Generate high-quality, educational questions following Cambridge English standards."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenRouter API error: ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;

      // Parse JSON from response
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error("Could not parse questions from AI response");
      }

      const questions = JSON.parse(jsonMatch[0]);
      return questions;
    } catch (error) {
      console.error("Error generating questions:", error);
      throw new Error(`Failed to generate questions: ${error}`);
    }
  },
});

// Generate quiz with AI
export const generateQuiz = action({
  args: {
    topic: v.string(),
    level: v.union(
      v.literal("beginner"),
      v.literal("intermediate"),
      v.literal("advanced")
    ),
    duration: v.number(), // in minutes
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      throw new Error("OpenRouter API key not configured");
    }

    const questionCount = Math.floor(args.duration / 2); // ~2 minutes per question

    const prompt = `Create a comprehensive English language quiz on "${args.topic}" for ${args.level} level students.

Generate ${questionCount} questions with a mix of:
- Multiple choice (60%)
- True/False (20%)
- Fill in the blank (20%)

Return as JSON:
{
  "title": "quiz title",
  "description": "brief description",
  "questions": [
    {
      "type": "multiple_choice" | "true_false" | "fill_blank",
      "question": "question text",
      "options": ["option1", "option2", ...] // only for multiple_choice
      "correctAnswer": "answer",
      "explanation": "explanation",
      "points": 10
    }
  ]
}`;

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://simmonds.online",
        },
        body: JSON.stringify({
          model: "anthropic/claude-3-sonnet",
          messages: [
            {
              role: "user",
              content: prompt
            }
          ],
        }),
      });

      const data = await response.json();
      const content = data.choices[0].message.content;

      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("Could not parse quiz from AI response");
      }

      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      console.error("Error generating quiz:", error);
      throw new Error(`Failed to generate quiz: ${error}`);
    }
  },
});