import { getServerSession } from "next-auth";
import mongoose from "mongoose";
import authOptions from "@/backend/libs/authOptions";
import orderControllers from "@/backend/entities/orders";
import getUserController from "@/backend/entities/users";
import { countTotalPrice } from "@/backend/helpers";
import { createDataAndSignatureObj } from "@/backend/libs/liqPay";
import { getTryCatchWrapper } from "@/backend/helpers/tryCatchWrapper";
import { orderZodSchema } from "@/backend/libs/validators.zod";

async function createOrder(req) {
  const session = await getServerSession(authOptions);
  let userId = null;
  if (session) {
    const getUserById = getUserController("GET_USER_BY_ID");
    const { user } = getUserById(session.user._id.toString());
    userId = user ? user._id.toString() : null;
  }
  const order = await req.json();

  orderZodSchema.parse(order);

  order.isCompleted = false;
  let {
    deliveryInfo: { comment },
  } = order;
  comment = comment ? comment : "";
  order.deliveryInfo.comment = comment;
  order.owner = userId;
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

const wrappedCreateOrder = getTryCatchWrapper(createOrder);

export default wrappedCreateOrder;
