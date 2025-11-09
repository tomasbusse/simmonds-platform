import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get group by ID
export const getGroup = query({
  args: { groupId: v.id("groups") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.groupId);
  },
});

// Get groups by company
export const getGroupsByCompany = query({
  args: { companyId: v.id("companies") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("groups")
      .withIndex("by_company", (q) => q.eq("companyId", args.companyId))
      .collect();
  },
});

// Get groups by teacher
export const getGroupsByTeacher = query({
  args: { teacherId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("groups")
      .withIndex("by_teacher", (q) => q.eq("teacherId", args.teacherId))
      .collect();
  },
});

// Get students in a group
export const getGroupStudents = query({
  args: { groupId: v.id("groups") },
  handler: async (ctx, args) => {
    const memberships = await ctx.db
      .query("group_members")
      .withIndex("by_group", (q) => q.eq("groupId", args.groupId))
      .collect();

    const students = await Promise.all(
      memberships.map(async (m) => {
        const student = await ctx.db.get(m.studentId);
        return { ...student, joinedAt: m.joinedAt };
      })
    );

    return students.filter(s => s !== null);
  },
});

// Create new group
export const createGroup = mutation({
  args: {
    name: v.string(),
    level: v.union(
      v.literal("beginner"),
      v.literal("intermediate"),
      v.literal("advanced")
    ),
    companyId: v.id("companies"),
    teacherId: v.optional(v.id("users")),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const groupId = await ctx.db.insert("groups", {
      ...args,
      createdAt: Date.now(),
    });

    return groupId;
  },
});

// Add student to group
export const addStudentToGroup = mutation({
  args: {
    groupId: v.id("groups"),
    studentId: v.id("users"),
  },
  handler: async (ctx, args) => {
    // Check if student is already in group
    const existing = await ctx.db
      .query("group_members")
      .withIndex("by_group", (q) => q.eq("groupId", args.groupId))
      .collect();

    const alreadyMember = existing.some(m => m.studentId === args.studentId);

    if (alreadyMember) {
      throw new Error("Student is already in this group");
    }

    const membershipId = await ctx.db.insert("group_members", {
      ...args,
      joinedAt: Date.now(),
    });

    return membershipId;
  },
});

// Remove student from group
export const removeStudentFromGroup = mutation({
  args: {
    groupId: v.id("groups"),
    studentId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const membership = await ctx.db
      .query("group_members")
      .withIndex("by_group", (q) => q.eq("groupId", args.groupId))
      .filter((q) => q.eq(q.field("studentId"), args.studentId))
      .first();

    if (membership) {
      await ctx.db.delete(membership._id);
    }
  },
});

// Update group
export const updateGroup = mutation({
  args: {
    groupId: v.id("groups"),
    name: v.optional(v.string()),
    level: v.optional(v.union(
      v.literal("beginner"),
      v.literal("intermediate"),
      v.literal("advanced")
    )),
    teacherId: v.optional(v.id("users")),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { groupId, ...updates } = args;

    await ctx.db.patch(groupId, updates);

    return groupId;
  },
});