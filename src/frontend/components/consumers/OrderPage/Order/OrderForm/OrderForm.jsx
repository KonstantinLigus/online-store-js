"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./OrderForm.module.scss";
import Fieldset from "./Fieldset/Fieldset";
import Phone from "./Phone/Phone";
import Email from "./Email/Email";
import Name from "./Name/Name";
import Delivery from "./Delivery/Delivery";
import Payment from "./Payment/Payment";
import Comment from "./Comment/Comment";

const OrderForm = props => {
  const [consumer, setConsumer] = useState({ ...props.consumer });

  let productsInCart = props.productsInCart;

  const sendOrder = e => {
    e.preventDefault();
    alert(
      "Ваше замовлення прийнято!" + Object.entries(consumer) + productsInCart,
    );
  };

  return (
    <form action="GET" className={styles.form} onSubmit={e => sendOrder(e)}>
      <Fieldset number={1} title={"Особисті дані"}>
        <Phone consumer={consumer} changeData={setConsumer} />
        <Email consumer={consumer} changeData={setConsumer} />
        <Name consumer={consumer} changeData={setConsumer} />
      </Fieldset>

      <Fieldset number={2} title={"Доставка"}>
        <Delivery consumer={consumer} changeData={setConsumer} />
      </Fieldset>

      <Fieldset number={3} title={"Оплата"}>
        <Payment consumer={consumer} changeData={setConsumer} />
        <Comment consumer={consumer} changeData={setConsumer} />
      </Fieldset>

      <div className={styles.btnOrderWrapper}>
        <input
          type="submit"
          value="Оформити замовлення"
          className={styles.btnOrder}
        />
      </div>
    </form>
  );
};
export default OrderForm;
