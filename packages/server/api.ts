import { createExpressMiddleware } from "@trpc/server/adapters/express";
import express from "express";
import cors from "cors";

import { appRouter } from "./routes";
import { appContext } from "./context";

const app = express();

app.use(cors({ origin: "*" }));

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext: appContext,
  })
);

app.listen(3000);
