"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./ConsumerData.module.scss";
import Details from "./Details/Details";
import Phone from "./Phone/Phone";
import Email from "./Email/Email";
import FirstName from "./FirstName/FirstName";
import SecondName from "./SecondName/SecondName";
import Surname from "./Surname/Surname";
import Birthday from "./Birthday/Birthday";
import DeliveryType from "./Delivery/DeliveryType";
import Password from "./Password/Password";

const OrderForm = props => {
  const [consumer, setConsumer] = useState({ ...props.consumer });

  const [firstNameIsValid, setFirstNameIsValid] = useState(true);
  const [surnameIsValid, setSurnameIsValid] = useState(true);
  const [phoneIsValid, setPhoneIsValid] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(true);

  const [regionIsValid, setRegionIsValid] = useState(false);
  const [regionError, setRegionError] = useState(false);

  const [cityIsValid, setCityIsValid] = useState(false);
  const [cityError, setCityError] = useState(false);

  const [postOfficeIsValid, setPostOfficeIsValid] = useState(false);
  const [postOfficeError, setPostOfficeError] = useState(false);

  const [streetIsValid, setStreetIsValid] = useState(true);
  const [houseIsValid, setHouseIsValid] = useState(true);

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
    if (consumer.customerPhone.length < 17) {
      checked = false;
      setPhoneIsValid(false);
    }
    if (!/^\S+@\S+\.\S+$/.test(consumer.email)) {
      checked = false;
      setEmailIsValid(false);
    }

    if (
      consumer.deliveryType !==
      "Самовивіз з магазину в Києві: вул. І.Мазепи, 37"
    ) {
      if (!regionIsValid) {
        checked = false;
        setRegionError(true);
      }
      if (!cityIsValid) {
        checked = false;
        setCityError(true);
      } else {
        if (consumer.deliveryType === "Нова Пошта - Відділення") {
          if (!postOfficeIsValid || !consumer.postOffice) {
            checked = false;
            setPostOfficeError(true);
          }
        } else {
          if (consumer.street.length < 3) {
            checked = false;
            setStreetIsValid(false);
          }
          if (!consumer.house) {
            checked = false;
            setHouseIsValid(false);
          }
        }
      }
    }

    if (checked) sendOrder();
  };

  const sendOrder = () => {
    // backend code for order rsending
    // let orderForSending = {deliveryInfo: consumer, products: orderedProducts}
    alert(
      "Ваше замовлення прийнято!",
      /*
      +
        Object.entries(consumer) +
        Object.entries(orderedProducts) +
        sendingTime,
        */
    );
  };

  return (
    <form action="GET" className={styles.form}>
      <Details title={"Контактна інформація"}>
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
        <Birthday consumer={consumer} changeData={setConsumer} />
      </Details>

      <Details title={"Адреса доставки"}>
        <DeliveryType
          consumer={consumer}
          changeData={setConsumer}
          regionIsValid={regionIsValid}
          setRegionIsValid={setRegionIsValid}
          regionError={regionError}
          setRegionError={setRegionError}
          cityIsValid={cityIsValid}
          setCityIsValid={setCityIsValid}
          cityError={cityError}
          setCityError={setCityError}
          postOfficeIsValid={postOfficeIsValid}
          setPostOfficeIsValid={setPostOfficeIsValid}
          postOfficeError={postOfficeError}
          setPostOfficeError={setPostOfficeError}
          streetIsValid={streetIsValid}
          setStreetIsValid={setStreetIsValid}
          houseIsValid={houseIsValid}
          setHouseIsValid={setHouseIsValid}
        />
      </Details>

      <Details title={"Зміна паролю"}>
        <Password placeholder="**********" />
        <Password placeholder="Створіть новий пароль*" />
        <Password placeholder="Повторно введіть новий пароль*" />
      </Details>

      <div className={styles.btnOrderWrapper}>
        <input
          type="button"
          value="Зберегти зміни"
          className={styles.btnOrder}
          onClick={e => validateData(e)}
        />
      </div>
    </form>
  );
};
export default OrderForm;
