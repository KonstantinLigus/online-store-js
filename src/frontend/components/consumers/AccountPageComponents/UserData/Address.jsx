"use client";
import React, { useState } from "react";
import styles from "./Address.module.scss";
import DeliveryType from "../../Fields/DeliveryType";
import DeliveryFields from "../../Fields/DeliveryFields";
import deliveryTypes from "../../Fields/deliveryTypes";
import Button from "../../Button/Button";

const [postOfficeDelivery, courierDelivery, storeDelivery] = deliveryTypes;

const Address = ({ user }) => {
  const [consumerData, setConsumerData] = useState(user);

  return (
    <div className={styles.container}>
      <form action="GET" className={styles.form}>
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
      </form>

      <Button title="Зберегти зміни" />
    </div>
  );
};
export default Address;
