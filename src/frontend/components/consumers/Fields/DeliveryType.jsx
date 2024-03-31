import { useEffect, useState } from "react";
import styles from "./Field.module.scss";
import deliveryTypes from "./deliveryTypes";

const [, , storeDelivery] = deliveryTypes;

const DeliveryType = ({ initValue, setConsumer }) => {
  const [deliveryType, setDeliveryType] = useState(initValue || storeDelivery);

  useEffect(() => {
    setDeliveryType(initValue || storeDelivery);
  }, [initValue]);

  const handleDeliveryType = e => {
    setDeliveryType(e.target.value);
    setConsumer(prev => ({
      ...prev,
      deliveryType: e.target.value,
      region: { name: "", ref: "" },
      city: { name: "", ref: "" },
      postOffice: { name: "", ref: "" },
      street: "",
      house: "",
      flat: "",
    }));
  };

  return (
    <>
      <label htmlFor="delivery" className={styles.labelSelect}>
        Спосіб доставки:
      </label>
      <select
        id="delivery"
        className={styles.select}
        value={deliveryType}
        onChange={handleDeliveryType}
      >
        {deliveryTypes.map(i => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>
    </>
  );
};

export default DeliveryType;
