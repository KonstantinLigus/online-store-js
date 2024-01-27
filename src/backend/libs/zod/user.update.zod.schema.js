import { z } from "zod";

export const updateUserSchema = z
  .object({
    customerPhone: z
      .string()
      .length(13, { message: "Must be exactly 13 characters long" })
      .regex(/^\+380\d{9}$/, { message: "Must begin with +380" }),
    email: z.string().email({ message: "Invalid email address" }),
    surname: z.string().regex(/^[A-ZА-ЯІЇ][a-zа-яії'-]+$/g, {
      message:
        "Surname must contain 1 word without leading or trailing spaces. Word must start with a capital letter.",
    }),
    firstName: z.string().regex(/^[A-ZА-ЯІЇ][a-zа-яії'-]+$/g, {
      message:
        "First name must contain 1 word without leading or trailing spaces. Word must start with a capital letter.",
    }),
    secondName: z.string().regex(/^[A-ZА-ЯІЇ][a-zа-яії'-]+$/g, {
      message:
        "Second name must contain 1 word without leading or trailing spaces. Word must start with a capital letter.",
    }),
    birthday: z.coerce.date(),
    deliveryType: z.enum([
      "Нова Пошта - Відділення",
      "Нова Пошта - доставка кур’єром",
      "Самовивіз з магазину в Києві: вул. І.Мазепи, 37",
    ]),
    region: z.string(),
    city: z.string(),
    street: z.string(),
    house: z.string(),
    flat: z.string(),
    postOffice: z.string(),
    password: z.string(),
  })
  .partial();
