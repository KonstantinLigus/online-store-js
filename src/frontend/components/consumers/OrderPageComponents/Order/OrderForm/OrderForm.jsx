"use client";
import React, { useState } from "react";
import styles from "./OrderForm.module.scss";
import Fieldset from "./Fieldset/Fieldset";
import Phone from "./Phone/Phone";
import Email from "./Email/Email";
import FirstName from "./FirstName/FirstName";
import SecondName from "./SecondName/SecondName";
import Surname from "./Surname/Surname";
import DeliveryType from "./Delivery/DeliveryType";
import Payment from "./Payment/Payment";
import Comment from "./Comment/Comment";

const OrderForm = props => {
  const { productsInCart, setIsOrderCreated, removeCart, setPaymentData } =
    props;
  const [consumer, setConsumer] = useState(props.consumer);

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

  const validateData = async e => {
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

    if (checked) await sendOrder();
  };

  const sendOrder = async () => {
    let orderedProducts = productsInCart.map(i => ({
      _id: i._id,
      productName: i.title,
      quantity: i.quantity,
      value: i.prices[i.measure].value + " " + i.prices[i.measure].unit,
      price: i.prices[i.measure].actionPrice
        ? i.prices[i.measure].actionPrice
        : i.prices[i.measure].price,
    }));
    // backend code for order rsending
    consumer.customerPhone = consumer.customerPhone.replace(/\s+/g, "");
    let orderForSending = { deliveryInfo: consumer, products: orderedProducts };
    const res = await fetch("/api/order/create", {
      method: "POST",
      body: JSON.stringify(orderForSending),
    });
    if (res.status === 201) {
      setIsOrderCreated(true);
      removeCart();
      const {
        order: { liqPayEncodedData },
      } = await res.json();
      setPaymentData(liqPayEncodedData);
    }
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
