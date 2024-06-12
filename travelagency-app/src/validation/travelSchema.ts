import { z } from "zod";

export const travelSchema = z.object({
  name: z.string().min(1, "Name of destination is required.").max(255),
  description: z.string().max(65535),
  price: z
    .string()
    .refine((val) => /^\d+$/.test(val), {
      message: "Price must be a positive number.",
    })
    .refine((val) => parseInt(val, 10) > 0, {
      message: "Price must be greater than 0.",
    }),
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format.",
    })
    .refine((val) => new Date(val) > new Date(), {
      message: "Date must be in the future.",
    }),
  endDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format.",
    })
    .refine((val) => new Date(val) > new Date(), {
      message: "Date must be in the future.",
    }),
  category: z.string().min(1, { message: "Category is required" }),
});
