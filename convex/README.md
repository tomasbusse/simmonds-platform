# Convex Backend

This directory contains your Convex backend functions.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run Convex development server:
   ```bash
   npx convex dev
   ```

3. The Convex URL will be automatically added to `.env.local`

## Structure

- `schema.ts` - Database schema definitions
- `messages.ts` - Message-related queries and mutations
- `analytics.ts` - Analytics tracking and queries
- `_generated/` - Auto-generated TypeScript types (do not edit)
