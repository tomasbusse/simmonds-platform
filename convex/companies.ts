import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get company by ID
export const getCompany = query({
  args: { companyId: v.id("companies") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.companyId);
  },
});

// Get all companies
export const getAllCompanies = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("companies").collect();
  },
});

// Get companies by admin
export const getCompaniesByAdmin = query({
  args: { adminId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("companies")
      .withIndex("by_admin", (q) => q.eq("adminId", args.adminId))
      .collect();
  },
});

// Create new company
export const createCompany = mutation({
  args: {
    name: v.string(),
    adminId: v.id("users"),
    domain: v.optional(v.string()),
    logo: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const companyId = await ctx.db.insert("companies", {
      ...args,
      createdAt: Date.now(),
      settings: {
        allowSelfRegistration: false,
      },
    });

    // Update admin user to link to company
    await ctx.db.patch(args.adminId, {
      companyId: companyId,
    });

    return companyId;
  },
});

// Update company
export const updateCompany = mutation({
  args: {
    companyId: v.id("companies"),
    name: v.optional(v.string()),
    domain: v.optional(v.string()),
    logo: v.optional(v.string()),
    settings: v.optional(v.object({
      allowSelfRegistration: v.boolean(),
      defaultTestId: v.optional(v.id("tests")),
    })),
  },
  handler: async (ctx, args) => {
    const { companyId, ...updates } = args;

    await ctx.db.patch(companyId, updates);

    return companyId;
  },
});

// Delete company
export const deleteCompany = mutation({
  args: { companyId: v.id("companies") },
  handler: async (ctx, args) => {
    // Note: In production, you'd want to handle cascading deletes
    // or prevent deletion if there are associated users/groups
    await ctx.db.delete(args.companyId);
  },
});