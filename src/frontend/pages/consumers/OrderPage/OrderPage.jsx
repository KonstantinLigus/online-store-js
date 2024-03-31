import { getUserAction } from "@/backend/entities/users/entry-points";
import OrderPageClient from "@/frontend/components/consumers/OrderPageСlient/OrderPageСlient";

const OrderPage = async () => {
  const user = await getUserAction();

  return <OrderPageClient user={user} />;
};

export default OrderPage;
