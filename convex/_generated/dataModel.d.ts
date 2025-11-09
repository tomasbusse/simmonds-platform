/* eslint-disable */
/**
 * Generated data model types.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import { AnyDataModel } from "convex/server";
import type { GenericId } from "convex/values";

/**
 * No `DataModel` override is specified in your Convex schema,
 * so the default `DataModel` is used.
 *
 * You can customize the `DataModel` by defining a schema.
 */
export type DataModel = AnyDataModel;

export type Id<TableName extends string> = GenericId<TableName>;
