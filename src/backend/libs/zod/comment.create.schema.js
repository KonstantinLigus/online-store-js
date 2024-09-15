import { z } from "zod";

export const commentCreateZodSchema = z.object({
  name: z.string({ message: "Empty name field" }),
  email: z.string().email({ message: "Invalid email address" }),
  comment: z.string({ message: "Empty comment field" }),
  score: z.string({ message: "Empty score field" }),
  date: z.string({ message: "Empty date field" }),
});
