"use client";
import styles from "./Tab.module.scss";

const OrdersTab = () => {
  return (
    <div className={styles.tab}>
      <p className={styles.tab__title}>Історія замовлень</p>
      <p>
        <i>Історія замовлень</i>
      </p>
    </div>
  );
};
export default OrdersTab;
