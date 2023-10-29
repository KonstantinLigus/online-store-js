import connectDB from "@/backend/db/connectDB";
import { Order } from "./order.schema";

export async function getOrderServices() {
  await connectDB();

  return Object.freeze({ getOrderByField, getOrderById, createOrder });

  async function getOrderByField(objQuery) {
    const order = await Order.findOne(objQuery);
    return order;
  }

  async function getOrderById(id) {
    const order = await Order.findById(id);
    return order;
  }

  async function createOrder(orderObj) {
    const order = await Order.create(orderObj);
    return order;
  }
}
