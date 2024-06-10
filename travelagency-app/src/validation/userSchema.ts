import { z } from "zod";

export const userSchema = z.object({
  username: z.string().min(3, "Username is required.").max(255),
  email: z.string().min(3, "E-mail is required.").max(255),
  password: z
    .string()
    .min(6, "Password must have at least 6 characters.")
    .max(255)
    .optional()
    .or(z.literal("")),
  role: z.string().min(3, "Role is required.").max(10),
});
