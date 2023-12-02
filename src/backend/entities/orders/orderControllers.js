import { orderServices } from "./orderServices";

export const orderControllers = Object.freeze({
  getOrderByField,
  createOrder,
  updateOrder,
});

async function getOrderByField(objQuery) {
  const order = await orderServices.getOrderByField(objQuery);
  return { order, status: 200 };
}

async function createOrder(orderObj) {
  const order = await orderServices.createOrder(orderObj);
  return { order, status: 201 };
}

async function updateOrder({ _id, updatedFields }) {
  const updatedOrder = await orderServices.updateOrder({ _id, updatedFields });
  if (!updatedOrder) {
    const error = new Error("Wrong id!");
    error.status = 400;
    throw error;
  }
  return { updatedOrder, status: 200 };
}
