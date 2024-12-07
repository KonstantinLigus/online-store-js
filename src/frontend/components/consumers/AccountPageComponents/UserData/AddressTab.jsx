"use client";
import React, { useState } from "react";
import styles from "./Tab.module.scss";
import DeliveryType from "../../Fields/DeliveryType";
import DeliveryFields from "../../Fields/DeliveryFields";
import deliveryTypes from "../../Fields/deliveryTypes";
import Button from "../../Button/Button";

const [postOfficeDelivery, courierDelivery, storeDelivery] = deliveryTypes;

const AddressTab = ({ user }) => {
  const [consumerData, setConsumerData] = useState(user);

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

        <Button title="Зберегти зміни" />
      </div>
    </div>
  );
};
export default AddressTab;