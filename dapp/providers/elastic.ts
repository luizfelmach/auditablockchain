import { Client } from "@elastic/elasticsearch";
import { env } from "../config/env";

export const elastic = new Client({
  node: env.ES_HOST,
  auth: { apiKey: env.ES_API_KEY },
});
