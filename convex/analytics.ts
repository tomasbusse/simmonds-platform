import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getMetrics = query({
  args: {},
  handler: async (ctx) => {
    const events = await ctx.db.query("analytics_events").order("desc").take(1000);

    const totalViews = events.filter(e => e.type === "page_view").length;
    const uniqueVisitors = new Set(events.map(e => e.userId)).size;
    const avgSessionDuration = events.reduce((acc, e) => acc + (e.duration || 0), 0) / events.length;

    return {
      totalViews,
      uniqueVisitors,
      avgSessionDuration: Math.round(avgSessionDuration),
      recentEvents: events.slice(0, 10),
    };
  },
});

export const trackEvent = mutation({
  args: {
    type: v.string(),
    userId: v.string(),
    page: v.string(),
    duration: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("analytics_events", {
      ...args,
      timestamp: Date.now(),
    });
  },
});
