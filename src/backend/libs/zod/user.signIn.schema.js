import { z } from "zod";

export const userSignInZodSchema = z.object({
  password: z
    .string()
    .min(7, { message: "Пароль має містити мінімум 7 символів" }),
  email: z.string().email({ message: "Невірний email" }),
});
