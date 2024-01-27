import { z } from "zod";

export const userSignUpZodSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "The name must contain at least 1 character!" }),
  secondName: z
    .string()
    .min(1, { message: "The name must contain at least 1 character!" }),
  surname: z
    .string()
    .min(1, { message: "The surname must contain at least 1 character!" }),
  password: z
    .string()
    .min(7, { message: "The password must contain at least 7 characters!" }),
  passwordRepeat: z
    .string()
    .min(7, { message: "The password must contain at least 7 characters!" }),
  email: z.string().email({ message: "Invalid email address" }),
  customerPhone: z
    .string()
    .length(13, { message: "Must be exactly 13 characters long. " })
    .regex(/^\+380\d{9}$/, { message: "Must begin with +380" }),
});
