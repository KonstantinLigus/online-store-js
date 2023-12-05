import { default as orderControllers } from "@/backend/entities/orders";
import { getTryCatchWrapper } from "@/backend/helpers/tryCatchWrapper";

async function updateOrder(req) {
  const _id = req.nextUrl.searchParams.get("id");
  const updatedFields = await req.json();
  if (!_id || !updatedFields) {
    const error = new Error("Empty order id or updated fields!");
    error.status = 400;
    throw error;
  }
  updatedFields.liqPayEncodedData = null;
  const updatedOrder = await orderControllers.updateOrder({
    _id,
    updatedFields,
  });
  return updatedOrder;
}

export default getTryCatchWrapper(updateOrder);
