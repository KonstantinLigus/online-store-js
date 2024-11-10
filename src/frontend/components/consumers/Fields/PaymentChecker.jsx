"use client";
import styles from "./Field.module.scss";

const PaymentChecker = ({ consumer, setConsumer }) => {
  const handleChange = e => {
    setConsumer(prev => ({
      ...prev,
      paymentMethod: e.target.value,
    }));
  };

  return (
    <>
      <label htmlFor="receipt" className={styles.labelRadioBtn}>
        <input
          type="radio"
          name="payment"
          id="receipt"
          value="receipt"
          className={styles.radioBtn}
          checked={consumer.paymentMethod === "receipt"}
          onChange={handleChange}
        />
        Оплата при отриманні
      </label>

      <label htmlFor="card" className={styles.labelRadioBtn}>
        <input
          type="radio"
          name="payment"
          id="card"
          value="card"
          className={styles.radioBtn}
          checked={consumer.paymentMethod === "card"}
          onChange={handleChange}
        />
        Оплата карткою
      </label>
    </>
  );
};

export default PaymentChecker;
