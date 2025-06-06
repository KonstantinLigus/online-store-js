"use client";
import React, { useState, useEffect, useTransition } from "react";
import styles from "./ConsumerData.module.scss";
import Details from "./Details/Details";
import Modal from "../../Modal";
import Loader from "../../Loader";
import Phone from "../../Fields/Phone";
import { isObjectFieldEqualsToValue } from "@/frontend/helpers";
import Email from "../../Fields/Email";
import Name from "../../Fields/Name";
import DeliveryType from "../../Fields/DeliveryType";
import DeliveryFields from "../../Fields/DeliveryFields";
import deliveryTypes from "../../../../../deliveryTypes";

const dataChanging = {
  firstName: false,
  secondName: false,
  surname: false,
  customerPhone: false,
  email: false,
  birthday: false,
  deliveryType: false,
  region: false,
  city: false,
  postOffice: false,
  street: false,
  house: false,
  flat: false,
  newPassword: false,
  newPasswordRepeat: false,
};

const [postOfficeDelivery, courierDelivery, storeDelivery] = deliveryTypes;

const ConsumerData = ({ user }) => {
  const [consumerData, setConsumerData] = useState(user);
  const [isSaved, setIsSaved] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (consumerData.deliveryType === postOfficeDelivery) {
      delete consumerData.street;
      delete consumerData.house;
      delete consumerData.flat;
    }
    if (consumerData.deliveryType === courierDelivery) {
      delete consumerData.postOffice;
    }
    if (consumerData.deliveryType === storeDelivery) {
      delete consumerData.street;
      delete consumerData.house;
      delete consumerData.flat;
      delete consumerData.postOffice;
      delete consumerData.region;
      delete consumerData.city;
    }
    !consumerData.comment && delete consumerData.comment;
    delete consumerData.birthday;
    delete consumerData.image;

    const isEmpty = isObjectFieldEqualsToValue(consumerData, "");
    setIsDisabled(isEmpty);
  }, [consumerData]);

  const saveChanges = async e => {
    e.preventDefault();
    // consumerData.customerPhone = consumerData.customerPhone.replace(/\s+/g, "");
    const res = await fetch("/api/auth/updateUser", {
      method: "POST",
      body: JSON.stringify(consumerData),
    });
    if (res.ok) setIsSaved(true);
  };

  return (
    <form action="GET" className={styles.form}>
      <Details title={"Контактна інформація"}>
        <Phone
          initValue={consumerData.customerPhone}
          setState={setConsumerData}
        />
        <Email initValue={consumerData.email} setState={setConsumerData} />
        <Name
          name="surname"
          initValue={consumerData.surname}
          setState={setConsumerData}
        />
        <Name
          name="firstName"
          initValue={consumerData.firstName}
          setState={setConsumerData}
        />
      </Details>

      <Details title={"Адреса доставки"}>
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
      </Details>

      {/* <Details title={"Зміна паролю"}>
        <Password
          placeholder="Введіть старий пароль"
          consumerData={consumerData}
          setConsumerData={setConsumerData}
          setDataWasChanged={setDataWasChanged}
          paswdType="oldPassword"
        />
        <Password
          placeholder="Введіть новий пароль"
          consumerData={consumerData}
          setConsumerData={setConsumerData}
          setDataWasChanged={setDataWasChanged}
          paswdType="newPassword"
        />
        <Password
          placeholder="Повторно введіть новий пароль"
          consumerData={consumerData}
          setConsumerData={setConsumerData}
          setDataWasChanged={setDataWasChanged}
          paswdType="newPasswordRepeat"
        />
      </Details> */}

      <Modal isOpen={isSaved} setIsOpen={() => setIsSaved(false)}>
        <p className={styles.messageStatus}>Данні збережено</p>
      </Modal>
      <Modal isOpen={isPending}>
        <Loader />
      </Modal>
      <div className={styles.buttonsWrapper}>
        <input
          disabled={isDisabled}
          type="button"
          value="Зберегти зміни"
          className={styles.formButton}
          onClick={e => startTransition(() => saveChanges(e))}
        />
      </div>
    </form>
  );
};
export default ConsumerData;
