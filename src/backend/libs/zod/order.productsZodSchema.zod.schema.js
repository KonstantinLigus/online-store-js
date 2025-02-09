import { z } from "zod";

export const productsZodSchema = z.object({
  products: z
    .array(
      z.object({
        productName: z.string(),
        quantity: z.number(),
        value: z.number(),
        unit: z.string(),
        price: z.number(),
        _id: z.string(),
        mainImage: z.string(),
      }),
    )
    .nonempty({
      message: "Can't be empty!",
    }),
});
