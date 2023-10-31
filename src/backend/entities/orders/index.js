import { getOrderControllers } from "./getOrderControllers";
import { getTryCatchWrapper } from "./helpers";

export default async function getOrderController(method) {
  const orderControllers = await getOrderControllers();
  switch (method) {
    case "GET_ORDER_BY_FIELD":
      return await getTryCatchWrapper(orderControllers.getOrderByField);
    case "GET_ORDER_BY_ID":
      return await getTryCatchWrapper(orderControllers.getOrderById);
    case "CREATE_ORDER":
      return await getTryCatchWrapper(orderControllers.createOrder);
  }
}
