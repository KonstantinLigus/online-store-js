"use server";

import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import authOptions from "@/backend/libs/next-auth/authOptions";
import { userServices } from "../data-access/userServices";
import { getCookie } from "@/backend/libs/next";
import { verifyToken } from "@/backend/libs/jwt";
import { countTotalPrice } from "@/backend/helpers";
import { createDataAndSignatureObj } from "@/backend/libs/liqPay/liqPay";
import { orderServices } from "../data-access/orderServices";
import { createNewOrderMessage, sendEmail } from "@/backend/libs/send-grid";

export async function createOrderCase(order) {
  let userId = null;
  const session = await getServerSession(authOptions);
  if (session) {
    const user = await userServices.getUserByField({
      _id: session.user._id.toString(),
    });
    userId = user ? user._id.toString() : null;
  }
  const token = await getCookie("token");
  if (!session && token) {
    userId = verifyToken(token.value)._id;
  }
  let {
    deliveryInfo: { comment, email },
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
  const createdOrder = await orderServices.createOrder(order);
  const newOrderMsg = createNewOrderMessage({
    email,
    orderId: order._id.toString(),
  });
  await sendEmail(newOrderMsg);
  return createdOrder;
}
