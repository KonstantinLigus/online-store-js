import { z } from "zod";

export const productsZodSchema = z.object({
  products: z
    .array(
      z.object({
        productName: z.string(),
        quantity: z.number(),
        value: z.string(),
        price: z.number(),
        _id: z.string(),
      }),
    )
    .nonempty({
      message: "Can't be empty!",
    }),
});
