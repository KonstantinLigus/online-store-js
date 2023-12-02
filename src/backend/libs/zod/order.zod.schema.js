import { z } from "zod";

export const orderZodSchema = z.object({
  products: z
    .array(
      z.object({
        _id: z.string(),
        quantity: z.number(),
        value: z.string(),
        price: z.number(),
      }),
    )
    .nonempty({
      message: "Can't be empty!",
    }),
  deliveryInfo: z.object({
    firstName: z.string().regex(/^[A-ZА-ЯІЇ][a-zа-яії'-]+$/g, {
      message:
        "First name must contain 1 word without leading or trailing spaces. Word must start with a capital letter.",
    }),
    secondName: z
      .string()
      .regex(/^[A-ZА-ЯІЇ][a-zа-яії'-]+$/g, {
        message:
          "Second name must contain 1 word without leading or trailing spaces. Word must start with a capital letter.",
      })
      .optional(),
    surname: z.string().regex(/^[A-ZА-ЯІЇ][a-zа-яії'-]+$/g, {
      message:
        "Surname must contain 1 word without leading or trailing spaces. Word must start with a capital letter.",
    }),
    region: z.string(),
    city: z.string(),
    deliveryType: z.enum(["Нова пошта"]),
    postOffice: z.number(),
    customerPhone: z
      .string()
      .length(13, { message: "Must be exactly 13 characters long" })
      .regex(/^\+380\d{9}$/, { message: "Must begin with +380" }),
    email: z.string().email({ message: "Invalid email address" }),
    paymentMethod: z.enum(["card", "cash"]),
    comment: z.string().optional(),
  }),
});