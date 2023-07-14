import { inferAsyncReturnType, initTRPC, TRPCError } from "@trpc/server";
import { companyData } from "./db";

import { appContext } from "./context";

const axios = require("axios");
const https = require("https");

export const t = initTRPC
  .context<inferAsyncReturnType<typeof appContext>>()
  .create();

export const adminMiddleware = t.middleware((params) => {
  if (!params.ctx.isAdmin) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return params.next({ ctx: params.ctx.isAdmin });
});

export const ticketMiddleware = t.middleware((params) => {
  const ticketData = {
    data: {},
  };

  async function getData() {
    const data = await axios.get(
      "https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo",
      {
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      }
    );
    return data;
  }
  ticketData.data = getData();

  return params.next({ ctx: ticketData });
});
