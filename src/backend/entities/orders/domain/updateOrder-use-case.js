import { WrongIdError } from "@/backend/helpers/errors";
import { orderServices } from "../data-access/orderServices";

export async function updateOrderCase(dataForUpdate) {
  const updatedOrder = await orderServices.updateOrder(dataForUpdate);
  if (!updatedOrder) throw new WrongIdError();
  return updatedOrder;
}
