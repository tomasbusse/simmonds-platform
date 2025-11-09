/* eslint-disable */
/**
 * Generated utilities for implementing server-side Convex query and mutation functions.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import {
  actionGeneric,
  httpActionGeneric,
  queryGeneric,
  mutationGeneric,
  internalActionGeneric,
  internalMutationGeneric,
  internalQueryGeneric,
} from "convex/server";
import type { DataModel } from "./dataModel.js";

/**
 * Define a query in this Convex app's public API.
 *
 * This function will be allowed to read your Convex database and will be accessible from the client.
 *
 * @param func - The query function. It receives a `QueryCtx` as its first argument.
 * @returns The wrapped query. Include this as an `export` to name it and make it accessible.
 */
export const query = queryGeneric as typeof queryGeneric<DataModel>;

/**
 * Define a mutation in this Convex app's public API.
 *
 * This function will be allowed to modify your Convex database and will be accessible from the client.
 *
 * @param func - The mutation function. It receives a `MutationCtx` as its first argument.
 * @returns The wrapped mutation. Include this as an `export` to name it and make it accessible.
 */
export const mutation = mutationGeneric as typeof mutationGeneric<DataModel>;

/**
 * Define an action in this Convex app's public API.
 *
 * An action is a function which can execute any JavaScript code, including non-deterministic
 * code and code with side-effects. Actions are often used to call into third-party services.
 *
 * @param func - The action function. It receives an `ActionCtx` as its first argument.
 * @returns The wrapped action. Include this as an `export` to name it and make it accessible.
 */
export const action = actionGeneric as typeof actionGeneric<DataModel>;

/**
 * Define an HTTP action.
 *
 * This function will be used to respond to HTTP requests received by a Convex
 * deployment if the requests matches the path and method where this action
 * is routed.
 *
 * @param func - The function. It receives an `ActionCtx` as its first argument, and a `Request` object as its second.
 * @returns The wrapped action. Route a URL path and HTTP method to this action in `convex/http.js`.
 */
export const httpAction = httpActionGeneric as typeof httpActionGeneric<DataModel>;

/**
 * Define a query that is only accessible from other Convex functions (but not from the client).
 *
 * This function will be allowed to read from your Convex database. It will not be accessible from the client.
 *
 * @param func - The query function. It receives a `QueryCtx` as its first argument.
 * @returns The wrapped query. Include this as an `export` to name it and make it accessible.
 */
export const internalQuery = internalQueryGeneric as typeof internalQueryGeneric<DataModel>;

/**
 * Define a mutation that is only accessible from other Convex functions (but not from the client).
 *
 * This function will be allowed to modify your Convex database. It will not be accessible from the client.
 *
 * @param func - The mutation function. It receives a `MutationCtx` as its first argument.
 * @returns The wrapped mutation. Include this as an `export` to name it and make it accessible.
 */
export const internalMutation =
  internalMutationGeneric as typeof internalMutationGeneric<DataModel>;

/**
 * Define an action that is only accessible from other Convex functions (but not from the client).
 *
 * @param func - The action function. It receives an `ActionCtx` as its first argument.
 * @returns The wrapped action. Include this as an `export` to name it and make it accessible.
 */
export const internalAction =
  internalActionGeneric as typeof internalActionGeneric<DataModel>;
