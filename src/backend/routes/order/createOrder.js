import { getServerSession } from "next-auth";
import mongoose from "mongoose";
import authOptions from "@/backend/libs/next-auth/authOptions";
import orderControllers from "@/backend/entities/orders";
import userControllers from "@/backend/entities/users";
import { countTotalPrice } from "@/backend/helpers";
import { createDataAndSignatureObj } from "@/backend/libs/liqPay/liqPay";
import { getTryCatchWrapper } from "@/backend/helpers/tryCatchWrapper";
import { orderZodSchema } from "@/backend/libs/zod/order.zod.schema";

async function createOrder(req) {
  const session = await getServerSession(authOptions);
  let userId = null;
  if (session) {
    const { user } = userControllers.getUserByField({
      _id: session.user._id.toString(),
    });
    userId = user ? user._id.toString() : null;
  }
  const order = await req.json();

  orderZodSchema.parse(order);

  let {
    deliveryInfo: { comment },
  } = order;
  comment = comment ? comment : "";
  order.deliveryInfo.comment = comment;
  order.owner = userId;
  order.dateOfCreation = Date.now();
  order._id = new mongoose.mongo.ObjectId();

  const totalPrice = countTotalPrice(order.products);
  const liqPayEncodedData = createDataAndSignatureObj({
    amount: totalPrice,
    description: comment,
    order_id: order._id.toString(),
  });

  order.liqPayEncodedData = liqPayEncodedData;
  const data = await orderControllers.createOrder(order);
  return data;
}

export default getTryCatchWrapper(createOrder);
