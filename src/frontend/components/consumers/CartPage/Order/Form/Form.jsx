"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Form.module.scss";
import Fieldset from "./Fieldset/Fieldset";
import Phone from "./Phone/Phone";
import Email from "./Email/Email";
import Name from "./Name/Name";
import Delivery from "./Delivery/Delivery";
import Payment from "./Payment/Payment";
import Comment from "./Comment/Comment";

import { useCart } from "@/hooks/useCart";

const Form = props => {
  const [consumer, setConsumer] = useState({ ...props.consumer });
  const { cart } = useCart();

  useEffect(() => {
    let orderedProducts = cart.map(i => i.title);
    setConsumer(prev => ({
      ...prev,
      orderedProducts,
    }));
  }, [cart]);

  const sendOrder = e => {
    e.preventDefault();
    props.closeOrder(false);
    alert("Ваше замовлення прийнято!" + Object.entries(consumer));
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

      <input
        type="submit"
        value="Оформити замовлення"
        className={styles.btnOrder}
      />
    </form>
  );
};
export default Form;
