"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Order.module.scss";
import PhoneNumber from "./PhoneNumber/PhoneNumber";
import Email from "./Email/Email";
import Name from "./Name/Name";
import Delivery from "./Delivery/Delivery";
import Payment from "./Payment/Payment";
import ConsumerComment from "./ConsumerComment/ConsumerComment";
import Fieldset from "./Fieldset/Fieldset";

const Order = props => {
  const closeOrder = () => {
    props.closeOrder(false);
  };

  const [consumer, setConsumer] = useState({
    phoneNumber: "",
    email: "",
    name: "",
    deliveryType: "Нова Пошта - Відділення",
    city: "Київ",
    office: "Відділення №1",
    payment: "receipt",
    comment: "",
  });

  let ordered = JSON.parse(localStorage.getItem("cart"));
  ordered = ordered.map(i => i.title);

  useEffect(() => {
    setConsumer(prev => ({
      ...prev,
      ordered,
    }));
  }, []);

  const sendOrder = e => {
    e.preventDefault();
    props.setOrder(false);
    alert("Ваше замовлення прийнято!" + Object.entries(consumer));
  };

  return (
    <div className={styles.wrapper}>
      <button onClick={closeOrder} className={styles.btnClose}>
        &#x2715;
      </button>
      <form action="GET" className={styles.form} onSubmit={e => sendOrder(e)}>
        <Fieldset number={1} title={"Особисті дані"}>
          <PhoneNumber consumer={consumer} changeData={setConsumer} />
          <Email consumer={consumer} changeData={setConsumer} />
          <Name consumer={consumer} changeData={setConsumer} />
        </Fieldset>

        <Fieldset number={2} title={"Доставка"}>
          <Delivery consumer={consumer} changeData={setConsumer} />
        </Fieldset>

        <Fieldset number={3} title={"Оплата"}>
          <Payment consumer={consumer} changeData={setConsumer} />
          <ConsumerComment consumer={consumer} changeData={setConsumer} />
        </Fieldset>

        <input
          type="submit"
          value="Оформити замовлення"
          className={styles.btnOrder}
        />
      </form>
    </div>
  );
};
export default Order;
