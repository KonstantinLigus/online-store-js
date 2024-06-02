"use client";

import { getUserAction } from "@/backend/entities/users/entry-points";
import OrderPageClient from "@/frontend/components/consumers/OrderPageСlient/OrderPageСlient";
import { useEffect, useState } from "react";

const OrderPage = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const userFromDB = await getUserAction();
      setUser(() => setUser(userFromDB));
    };
    fetchUser();
  }, []);

  return <OrderPageClient user={user} />;
};

export default OrderPage;
