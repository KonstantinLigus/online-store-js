import { useEffect, useState } from "react";
import styles from "./Field.module.scss";
import deliveryTypes from "../../../../deliveryTypes";
import Image from "next/image";
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
      <div className={styles.selectWrapper}>
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
        <Image
          src="/assets/icon/icon-angle-down.svg"
          alt="arrow"
          width={16}
          height={16}
        />
      </div>
    </>
  );
};

export default DeliveryType;
