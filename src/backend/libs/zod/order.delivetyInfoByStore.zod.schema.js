import { z } from "zod";
import { productsZodSchema } from "./order.productsZodSchema.zod.schema";
import deliveryTypes from "@/deliveryTypes";

const [, , storeDelivery] = deliveryTypes;

export const orderDeliveryInfoByStoreSchema = productsZodSchema.extend({
  deliveryInfo: z.object({
    firstName: z.string().regex(/^[A-ZА-ЯІЇ][a-zа-яії'-]+$/g, {
      message:
        "First name must contain 1 word without leading or trailing spaces. Word must start with a capital letter.",
    }),
    surname: z.string().regex(/^[A-ZА-ЯІЇ][a-zа-яії'-]+$/g, {
      message:
        "Surname must contain 1 word without leading or trailing spaces. Word must start with a capital letter.",
    }),
    deliveryType: z.enum([storeDelivery]),
    customerPhone: z
      .string()
      .length(13, { message: "Must be exactly 13 characters long" })
      .regex(/^\+380\d{9}$/, { message: "Must begin with +380" }),
    email: z.string().email({ message: "Invalid email address" }),
    paymentMethod: z.enum(["card", "cash"]),
    comment: z.string().optional(),
  }),
});
