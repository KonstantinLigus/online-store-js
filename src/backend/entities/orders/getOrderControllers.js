import { getOrderServices } from "./getOrderServices";
import { orderZodSchema } from "./libs/validators.zod";

export async function getOrderControllers() {
  const orderServices = await getOrderServices();

  return Object.freeze({ getOrderById, getOrderByField, createOrder });

  async function getOrderByField(objQuery) {
    const order = await orderServices.getOrderByField(objQuery);
    return { order, status: 200 };
  }

  async function getOrderById(id) {
    const order = await orderServices.getOrderById(id);
    return { order, status: 200 };
  }

  async function createOrder(orderObj) {
    orderZodSchema.parse(orderObj);
    const order = await orderServices.createOrder(orderObj);
    return { order, status: 200 };
  }
}
