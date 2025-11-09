"use client";

import { ReactNode } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

// Check if Convex URL is properly configured
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || "";
const isConvexConfigured = convexUrl && !convexUrl.includes("your-deployment");

const convex = isConvexConfigured
  ? new ConvexReactClient(convexUrl)
  : new ConvexReactClient("https://happy-panda-123.convex.cloud"); // Dummy URL for development

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {!isConvexConfigured && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-700 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-start gap-3">
            <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div className="flex-1">
              <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                Convex is not configured yet
              </p>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                To enable real-time features, run: <code className="bg-yellow-100 dark:bg-yellow-900 px-2 py-0.5 rounded">npx convex dev</code>
              </p>
            </div>
          </div>
        </div>
      )}
      <ConvexProvider client={convex}>{children}</ConvexProvider>
    </>
  );
}
