import { z } from "zod";

import { adminMiddleware, t, ticketMiddleware } from "./../trpc";

export const appRouter = t.router({
  login: t.procedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .output(z.object({ status: z.boolean() }))
    .mutation((params) => {
      if (
        params.input.email === "demo@example.com" &&
        params.input.password === "pwd"
      ) {
        params.ctx.isAdmin = true;
      } else {
        params.ctx.isAdmin = false;
      }
      return {
        status: params.ctx.isAdmin,
      };
    }),
  ticket: t.procedure
    .input(z.object({ company: z.string() }))
    .use(adminMiddleware)
    .use(ticketMiddleware)
    .mutation(async (params) => {
      let data = await params.ctx.data;
      return JSON.stringify((data as any).data);
    }),
  create: t.procedure.mutation((prams) => {
    return true;
  }),
});

export type AppRouter = typeof appRouter;
