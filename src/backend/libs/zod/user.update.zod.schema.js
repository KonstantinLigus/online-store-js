import { z } from "zod";

const nameRegExp = new RegExp(process.env.NEXT_PUBLIC_NAME_PATTERN);

export const updateUserSchema = z
  .object({
    firstName: z.string().regex(nameRegExp, {
      message:
        "First name must contain 1 word without leading or trailing spaces. Word must start with a capital letter.",
    }),
    secondName: z.string().regex(nameRegExp, {
      message:
        "Second name must contain 1 word without leading or trailing spaces. Word must start with a capital letter.",
    }),
    surname: z.string().regex(nameRegExp, {
      message:
        "Surname must contain 1 word without leading or trailing spaces. Word must start with a capital letter.",
    }),
    customerPhone: z
      .string()
      .length(13, { message: "Must be exactly 13 characters long" })
      .regex(/^\+380\d{9}$/, { message: "Must begin with +380" }),
    email: z.string().email({ message: "Invalid email address" }),
    birthday: z.coerce.date(),
    deliveryType: z.enum([
      "Нова Пошта - Відділення",
      "Нова Пошта - доставка кур’єром",
      "Самовивіз з магазину в Києві: вул. І.Мазепи, 37",
    ]),
    region: z.string(),
    city: z.object({ areaRef: z.string(), name: z.string() }),
    street: z.string(),
    house: z.string(),
    flat: z.string(),
    postOffice: z.object({ cityRef: z.string(), name: z.string() }),
    paymentMethod: z.enum(["card", "cash"]),
    password: z.string(),
  })
  .partial();
