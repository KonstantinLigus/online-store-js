"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./OrderForm.module.scss";
import Fieldset from "./Fieldset/Fieldset";
import Phone from "./Phone/Phone";
import Email from "./Email/Email";
import FirstName from "./FirstName/FirstName";
import SecondName from "./SecondName/SecondName";
import Surname from "./Surname/Surname";
import Delivery from "./Delivery/Delivery";
import Payment from "./Payment/Payment";
import Comment from "./Comment/Comment";

const OrderForm = props => {
  const [consumer, setConsumer] = useState({ ...props.consumer });

  let productsInCart = props.productsInCart;
  let allProductsPrice = props.allProductsPrice;

  const [firstNameIsValid, setFirstNameIsValid] = useState(true);
  const [surnameIsValid, setSurnameIsValid] = useState(true);
  const [phoneIsValid, setPhoneIsValid] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [checkRegion, setCheckRegion] = useState(true);
  const [regionIsValid, setRegionIsValid] = useState(true);
  const [checkCity, setCheckCity] = useState(true);
  const [cityIsValid, setCityIsValid] = useState(true);
  const [checkOffice, setCheckOffice] = useState(true);
  const [officeIsValid, setOfficeIsValid] = useState(true);

  const validateData = e => {
    e.preventDefault();
    let checked = true;

    if (!/(^[A-ZА-ЯІЇ][a-zа-яії'-]+$)/g.test(consumer.firstName)) {
      checked = false;
      setFirstNameIsValid(false);
    }
    if (!/(^[A-ZА-ЯІЇ][a-zа-яії'-]+$)/g.test(consumer.surname)) {
      checked = false;
      setSurnameIsValid(false);
    }
    if (consumer.phoneNumber.length < 17) {
      checked = false;
      setPhoneIsValid(false);
    }
    if (!/^\S+@\S+\.\S+$/.test(consumer.email)) {
      checked = false;
      setEmailIsValid(false);
    }

    if (
      consumer.deliveryType === "Нова Пошта - Відділення" ||
      consumer.deliveryType === "Нова Пошта - доставка кур’єром"
    ) {
      if (!checkRegion || consumer.region === "") {
        checked = false;
        setRegionIsValid(false);
      } else {
        if (!checkCity || consumer.city === "") {
          checked = false;
          setCityIsValid(false);
        } else {
          if (consumer.deliveryType === "Нова Пошта - Відділення") {
            if (!checkOffice || consumer.office === "") {
              checked = false;
              setOfficeIsValid(false);
            }
          } else if (
            consumer.deliveryType === "Нова Пошта - доставка кур’єром"
          ) {
            if (consumer.office === "") {
              checked = false;
              setOfficeIsValid(false);
            }
          }
        }
      }
    }

    if (checked === true) {
      sendOrder();
    }
  };

  const sendOrder = () => {
    const date = new Date();
    let sendingTime = {
      day: date.getDate(),
      mounth: date.getMonth(),
      year: date.getFullYear(),
      hour: date.getHours(),
      minutes: date.getMinutes(),
    };
    // backend code for order rsending
    // const order = {...consumer, ordered=productsInCart, totalPrice=allProductsPrice, sendingTime}
    alert(
      "Ваше замовлення прийнято!",
      /*+
        Object.entries(consumer) +
        productsInCart +
        allProductsPrice +
        sendingTime,
        */
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
        <Surname
          consumer={consumer}
          changeData={setConsumer}
          surnameIsValid={surnameIsValid}
          setSurnameIsValid={setSurnameIsValid}
        />
        <FirstName
          consumer={consumer}
          changeData={setConsumer}
          firstNameIsValid={firstNameIsValid}
          setFirstNameIsValid={setFirstNameIsValid}
        />
        <SecondName consumer={consumer} changeData={setConsumer} />
      </Fieldset>

      <Fieldset number={2} title={"Доставка"}>
        <Delivery
          consumer={consumer}
          changeData={setConsumer}
          checkRegion={checkRegion}
          setCheckRegion={setCheckRegion}
          regionIsValid={regionIsValid}
          setRegionIsValid={setRegionIsValid}
          checkCity={checkCity}
          setCheckCity={setCheckCity}
          cityIsValid={cityIsValid}
          setCityIsValid={setCityIsValid}
          checkOffice={checkOffice}
          setCheckOffice={setCheckOffice}
          officeIsValid={officeIsValid}
          setOfficeIsValid={setOfficeIsValid}
        />
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
