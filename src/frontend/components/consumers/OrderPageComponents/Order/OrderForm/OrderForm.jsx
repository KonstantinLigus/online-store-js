"use client";
import React, { useEffect, useState } from "react";
import styles from "./OrderForm.module.scss";
import Fieldset from "./Fieldset/Fieldset";
import Comment from "./Comment/Comment";
import Phone from "../../../Fields/Phone";
import Email from "../../../Fields/Email";
import Name from "../../../Fields/Name";
import DeliveryFields from "../../../Fields/DeliveryFields";
import PaymentChecker from "../../../Fields/PaymentChecker";
import DeliveryType from "../../../Fields/DeliveryType";
import { isObjectFieldEqualsToValue } from "@/frontend/helpers";
import deliveryTypes from "../../../Fields/deliveryTypes";

const [postOfficeDelivery, courierDelivery, storeDelivery] = deliveryTypes;

const userInitValues = {
  firstName: "",
  surname: "",
  deliveryType: "Нова Пошта - Відділення",
  region: { name: "", ref: "" },
  city: { name: "", ref: "" },
  postOffice: { name: "", ref: "" },
  street: "",
  house: "",
  flat: "",
  customerPhone: "",
  email: "",
  paymentMethod: "card",
  comment: "",
};

const OrderForm = props => {
  const { user, cart, setIsOrderCreated, removeCart, setPaymentData } = props;
  const [consumer, setConsumer] = useState(user || userInitValues);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (consumer.deliveryType === postOfficeDelivery) {
      delete consumer.street;
      delete consumer.house;
      delete consumer.flat;
    }
    if (consumer.deliveryType === courierDelivery) {
      delete consumer.postOffice;
    }

    !consumer.comment && delete consumer.comment;
    delete consumer.birthday;
    delete consumer.image;

    const isEmpty = isObjectFieldEqualsToValue(consumer, "");
    setIsDisabled(isEmpty);
  }, [consumer]);

  const validateData = async e => {
    let orderedProducts = cart.map(i => ({
      _id: i._id,
      productName: i.title,
      quantity: i.quantity,
      value: i.prices[i.measure].value + " " + i.prices[i.measure].unit,
      price: i.prices[i.measure].actionPrice
        ? i.prices[i.measure].actionPrice
        : i.prices[i.measure].price,
    }));
    consumer._id && delete consumer._id;
    consumer.birthday && delete consumer.birthday;
    consumer.image && delete consumer.image;

    consumer.paymentMethod = "card";

    let orderForSending = { deliveryInfo: consumer, products: orderedProducts };
    const res = await fetch("/api/order/create", {
      method: "POST",
      body: JSON.stringify(orderForSending),
    });
    if (res.status === 201) {
      setIsOrderCreated(true);
      removeCart();
      const { liqPayEncodedData } = await res.json();
      setPaymentData(liqPayEncodedData);
    }
  };

  return (
    <form action="GET" className={styles.form}>
      <Fieldset number={1} title={"Особисті дані"}>
        <Phone initValue={consumer.customerPhone} setState={setConsumer} />
        <Email initValue={consumer.email} setState={setConsumer} />
        <Name
          name="surname"
          initValue={consumer.surname}
          setState={setConsumer}
        />
        <Name
          name="firstName"
          initValue={consumer.firstName}
          setState={setConsumer}
        />
      </Fieldset>
      <Fieldset number={2} title={"Доставка"}>
        <DeliveryType
          initValue={consumer.deliveryType}
          setConsumer={setConsumer}
        />
        <DeliveryFields consumer={consumer} setConsumer={setConsumer} />
      </Fieldset>
      <Fieldset number={3} title={"Оплата"}>
        <PaymentChecker consumer={consumer} setConsumer={setConsumer} />
        <Comment consumer={consumer} setConsumer={setConsumer} />
      </Fieldset>
      <div className={styles.btnOrderWrapper}>
        <input
          type="button"
          value="Оформити замовлення"
          className={styles.btnOrder}
          onClick={e => validateData(e)}
          disabled={isDisabled}
        />
      </div>
    </form>
  );
};
export default OrderForm;
