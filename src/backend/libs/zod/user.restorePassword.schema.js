import { z } from "zod";

export const userPasswordRestoreZodSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  oldPassword: z.string(),
  newPassword: z.string(),
});
