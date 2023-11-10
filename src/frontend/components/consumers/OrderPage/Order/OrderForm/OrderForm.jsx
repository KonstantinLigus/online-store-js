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

  const [nameIsValid, setNameIsValid] = useState(true);
  const [phoneIsValid, setPhoneIsValid] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(true);

  const validateData = e => {
    e.preventDefault();
    if (
      !/(^[A-ZА-Я][a-zа-яії'-]+ [A-ZА-Я][a-zа-яії'-]+$)|(^[A-ZА-Я][a-zа-яії'-]+ [A-ZА-Я][a-zа-яії'-]+ [A-ZА-Я][a-zа-яії'-]+$)/g.test(
        consumer.name,
      )
    ) {
      setNameIsValid(false);
    } else if (!/^\+380\d{9}$/.test(consumer.phoneNumber)) {
      setPhoneIsValid(false);
    } else if (!/^\S+@\S+\.\S+$/.test(consumer.email)) {
      setEmailIsValid(false);
    } else {
      sendOrder();
    }
  };

  const sendOrder = () => {
    alert(
      "Ваше замовлення прийнято!" + Object.entries(consumer) + productsInCart,
    );
  };

  return (
    <form action="GET" className={styles.form}>
      <Fieldset number={1} title={"Особисті дані"}>
        <Phone
          consumer={consumer}
          changeData={setConsumer}
          phoneIsValid={phoneIsValid}
          setPhoneIsValid={setPhoneIsValid}
        />
        <Email
          consumer={consumer}
          changeData={setConsumer}
          emailIsValid={emailIsValid}
          setEmailIsValid={setEmailIsValid}
        />
        <Name
          consumer={consumer}
          changeData={setConsumer}
          nameIsValid={nameIsValid}
          setNameIsValid={setNameIsValid}
        />
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
          type="button"
          value="Оформити замовлення"
          className={styles.btnOrder}
          onClick={e => validateData(e)}
        />
      </div>
    </form>
  );
};
export default OrderForm;
