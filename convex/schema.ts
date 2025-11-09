import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  messages: defineTable({
    author: v.string(),
    body: v.string(),
    timestamp: v.number(),
  }),
  analytics_events: defineTable({
    type: v.string(),
    userId: v.string(),
    page: v.string(),
    duration: v.optional(v.number()),
    timestamp: v.number(),
  }),
});
