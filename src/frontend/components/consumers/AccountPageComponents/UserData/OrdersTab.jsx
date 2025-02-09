"use client";
import OrderHistoryList from "../../OrderHistoryList/OrderHistoryList";
import styles from "./Tab.module.scss";

const OrdersTab = ({ user }) => {
  return (
    <div className={styles.tab}>
      <p className={styles.tab__title}>Історія замовлень</p>
      <OrderHistoryList owner={user} />
    </div>
  );
};
export default OrdersTab;
