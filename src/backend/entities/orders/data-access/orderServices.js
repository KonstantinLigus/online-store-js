import "@/backend/db/connectDB";
import { Order } from "./order.schema";

export const orderServices = Object.freeze({
  getOrderByField,
  createOrder,
  updateOrder,
  getOrdersByField,
});

async function getOrderByField(objQuery) {
  const order = await Order.findOne(objQuery);
  return order;
}

async function createOrder(orderObj) {
  const order = await Order.create(orderObj);
  return order;
}

async function updateOrder({ _id, updatedFields }) {
  const updatedOrder = await Order.findByIdAndUpdate(_id, updatedFields, {
    new: true,
  });
  return updatedOrder;
}

async function getOrdersByField(objQuery) {
  const order = await Order.find(objQuery);
  return order;
}
