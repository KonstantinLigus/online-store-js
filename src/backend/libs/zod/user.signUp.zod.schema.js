import { z } from "zod";

const nameRegExp = new RegExp(process.env.NEXT_PUBLIC_NAME_PATTERN);

export const userSignUpZodSchema = z.object({
  firstName: z.string().regex(nameRegExp, {
    message: "Ім'я повинне складатись мінімум з 2 символів",
  }),
  surname: z.string().regex(nameRegExp, {
    message: "Прізвище повинне складатися мінімум з 2 символів",
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
    .length(13, { message: "Телефон повинен складатися з 13 цифр символів. " })
    .regex(/^\+380\d{9}$/, { message: "Повинен починатися з +380" }),
});
