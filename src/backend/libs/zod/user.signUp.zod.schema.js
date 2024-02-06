import { z } from "zod";

export const userSignUpZodSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "Ім'я повинне складатись мінімум з 1 символа" }),
  secondName: z.string().min(1, {
    message: "По-батькові повинне складатися мінімум з 1 символа",
  }),
  surname: z.string().min(1, {
    message: "Прізвище повинне складатися мінімум з 1 символа",
  }),
  password: z
    .string()
    .min(7, { message: "Пароль повинен складатися мінімум з 7 символів" }),
  passwordRepeat: z
    .string()
    .min(7, { message: "Пароль повинен складатися мінімум з 7 символів" }),
  email: z.string().email({ message: "Невірний формат email" }),
  customerPhone: z
    .string()
    .length(13, { message: "Номер повинен складатися з 13 цифр. " })
    .regex(/^\+380\d{9}$/, { message: "Повинен починатися з +380" }),
});
