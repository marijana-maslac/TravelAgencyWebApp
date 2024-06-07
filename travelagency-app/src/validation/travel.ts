import { z } from "zod";

export const travelSchema = z.object({
  name: z.string().min(1, "Name of destination is required.").max(255),
  description: z.string().max(65535),
});
