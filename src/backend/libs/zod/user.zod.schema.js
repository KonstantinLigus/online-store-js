import { z } from "zod";

export const userZodSchema = z.object({
  name: z
    .string()
    .min(1, { message: "The name must contain at least 1 character!" }),
  password: z
    .string()
    .min(7, { message: "The password must contain at least 7 characters!" }),
  email: z.string().email({ message: "Invalid email address" }),
});
