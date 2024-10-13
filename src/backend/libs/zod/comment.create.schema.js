import { z } from "zod";

export const commentCreateZodSchema = z.object({
  comment: z.string({ message: "Empty comment field" }),
  score: z.number({ message: "Empty score field" }),
  itemId: z.string({ message: "Empty item id field" }),
});
