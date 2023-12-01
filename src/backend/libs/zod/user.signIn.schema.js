import { z } from "zod";

export const userSignInZodSchema = z.object({
  password: z
    .string()
    .min(7, { message: "The password must contain at least 7 characters!" }),
  email: z.string().email({ message: "Invalid email address" }),
});
