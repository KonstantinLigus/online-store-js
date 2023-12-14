import { z } from "zod";

export const userPasswordRecoverZodSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});
