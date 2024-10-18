import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  ES_HOST: z.string().min(1, "ES_HOST must be a non-empty string."),
  ES_API_KEY: z.string().min(1, "ES_API_KEY must be a non-empty string."),
  RPC_NODE: z.string().min(1, "RPC_NODE must be a non-empty string."),
  SMART_CONTRACT: z
    .string()
    .min(1, "SMART_CONTRACT must be a non-empty string."),
});

let env: z.infer<typeof envSchema>;

try {
  env = envSchema.parse(process.env);
} catch (err) {
  if (err instanceof z.ZodError) {
    console.error("Error loading environment variables:", err.errors);
    console.error("Please set up the required environment variables.");
    process.exit(1);
  }
}

export { env };
