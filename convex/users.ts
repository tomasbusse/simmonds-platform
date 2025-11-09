import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get user by ID
export const getUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});

// Get user by email
export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
  },
});

// Get all users by company
export const getUsersByCompany = query({
  args: { companyId: v.id("companies") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_company", (q) => q.eq("companyId", args.companyId))
      .collect();
  },
});

// Get users by role
export const getUsersByRole = query({
  args: {
    role: v.union(v.literal("admin"), v.literal("teacher"), v.literal("student")),
    companyId: v.optional(v.id("companies"))
  },
  handler: async (ctx, args) => {
    let users = await ctx.db
      .query("users")
      .withIndex("by_role", (q) => q.eq("role", args.role))
      .collect();

    if (args.companyId) {
      users = users.filter(u => u.companyId === args.companyId);
    }

    return users;
  },
});

// Create new user
export const createUser = mutation({
  args: {
    email: v.string(),
    name: v.string(),
    role: v.union(v.literal("admin"), v.literal("teacher"), v.literal("student")),
    companyId: v.optional(v.id("companies")),
    avatarUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      throw new Error("User with this email already exists");
    }

    const userId = await ctx.db.insert("users", {
      ...args,
      createdAt: Date.now(),
      lastActive: Date.now(),
    });

    return userId;
  },
});

// Update user
export const updateUser = mutation({
  args: {
    userId: v.id("users"),
    name: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
    companyId: v.optional(v.id("companies")),
  },
  handler: async (ctx, args) => {
    const { userId, ...updates } = args;

    await ctx.db.patch(userId, {
      ...updates,
      lastActive: Date.now(),
    });

    return userId;
  },
});

// Update user last active timestamp
export const updateLastActive = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      lastActive: Date.now(),
    });
  },
});

// Delete user
export const deleteUser = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.userId);
  },
});