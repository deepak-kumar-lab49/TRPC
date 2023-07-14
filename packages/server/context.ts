import { CreateExpressContextOptions } from "@trpc/server/adapters/express";

/**
 * Context is useful for authentication and authorisation.
 * TRPC provides the generic contextOptions type along with the adapers, just like CreateExpressContextOptions here with createExpressMiddleware express adapter.
 */
export function appContext(opts: CreateExpressContextOptions) {
  return {
    isAdmin: true,
  };
}
