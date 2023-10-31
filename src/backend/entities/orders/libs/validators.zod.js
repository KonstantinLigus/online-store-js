import { z } from "zod";

export const orderZodSchema = z.object({
  products: z
    .array(
      z.object({
        productName: z.string(),
        value: z.number(),
        price: z.number(),
        unit: z.string(),
      }),
    )
    .nonempty({
      message: "Can't be empty!",
    }),
  deliveryInfo: z.object({
    custumerFullName: z
      .string()
      .regex(
        /(^[A-ZА-Я][a-zа-яії'-]+ [A-ZА-Я][a-zа-яії'-]+$)|(^[A-ZА-Я][a-zа-яії'-]+ [A-ZА-Я][a-zа-яії'-]+ [A-ZА-Я][a-zа-яії'-]+$)/g,
        {
          message:
            "Must contain 2 or 3 words without leading or trailing spaces. Only one space between words are available. Each word must start with capital letter.",
        },
      ),
    city: z.string(),
    deliveryMethod: z.enum(["Нова пошта"]),
    postOffice: z.number(),
    customerPhone: z
      .string()
      .length(13, { message: "Must be exactly 13 characters long" })
      .regex(/^\+380\d{9}$/, { message: "Must begin with +380" }),
    email: z.string().email({ message: "Invalid email address" }),
    paymentMethod: z.enum(["card", "cash"]),
    comment: z.string().optional(),
  }),
  owner: z.string().nullable(),
  isCompleted: z.boolean(),
});
