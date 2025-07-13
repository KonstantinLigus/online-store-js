"use client";
import React, { useState } from "react";
import styles from "./Tab.module.scss";
import DeliveryType from "../../Fields/DeliveryType";
import DeliveryFields from "../../Fields/DeliveryFields";
import deliveryTypes from "../../../../../deliveryTypes";
import Button from "../../Button/Button";
import { useRouter } from "next/navigation";

const [postOfficeDelivery, courierDelivery, storeDelivery] = deliveryTypes;

const AddressTab = ({ user }) => {
  const [consumerData, setConsumerData] = useState(user);
  const router = useRouter();

  const buttonClickHandler = async () => {
    await fetch("api/auth/updateUser", {
      method: "POST",
      body: JSON.stringify(consumerData),
    });

    router.refresh();
  };

  return (
    <div className={styles.tab}>
      <div className={styles.tab__inner}>
        <p className={styles.tab__title}>Адреса доставки</p>
        <form action="GET" className={styles.form}>
          <fieldset className={styles.form__fieldset}>
            <DeliveryType
              initValue={consumerData.deliveryType}
              setConsumer={setConsumerData}
            />
            {consumerData.deliveryType !== storeDelivery && (
              <DeliveryFields
                consumer={consumerData}
                setConsumer={setConsumerData}
              />
            )}
          </fieldset>
        </form>

        <Button title="Зберегти зміни" onClick={buttonClickHandler} />
      </div>
    </div>
  );
};
export default AddressTab;
