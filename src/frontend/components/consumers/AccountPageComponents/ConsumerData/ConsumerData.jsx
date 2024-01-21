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
};

const ConsumerData = props => {
  const [consumerData, setConsumerData] = useState({ ...props.consumer });
  const [dataWasChanged, setDataWasChanged] = useState({ ...dataChanging });
  const [saveChangesDisabled, setSaveChangesDisabled] = useState(true);

  const checkChanges = () => {
    let wasChanged = false;
    if (Object.values(dataWasChanged).some(i => i === true)) wasChanged = true;
    if (Object.values(dataWasChanged).some(i => i === null)) wasChanged = false;
    wasChanged ? setSaveChangesDisabled(false) : setSaveChangesDisabled(true);
  };

  useEffect(() => {
    checkChanges();
  }, [dataWasChanged]);

  const saveChanges = e => {
    e.preventDefault();
    alert("Data is changed!");
  };

  return (
    <form action="GET" className={styles.form}>
      <Details title={"Контактна інформація"}>
        <Phone
          consumerData={consumerData}
          setConsumerData={setConsumerData}
          setDataWasChanged={setDataWasChanged}
        />
        <Email
          consumerData={consumerData}
          setConsumerData={setConsumerData}
          setDataWasChanged={setDataWasChanged}
        />
        <Surname
          consumerData={consumerData}
          setConsumerData={setConsumerData}
          setDataWasChanged={setDataWasChanged}
        />
        <FirstName
          consumerData={consumerData}
          setConsumerData={setConsumerData}
          setDataWasChanged={setDataWasChanged}
        />
        <SecondName
          consumerData={consumerData}
          setConsumerData={setConsumerData}
          setDataWasChanged={setDataWasChanged}
        />
        <Birthday
          consumerData={consumerData}
          setConsumerData={setConsumerData}
          setDataWasChanged={setDataWasChanged}
        />
      </Details>

      <Details title={"Адреса доставки"}>
        <DeliveryType
          consumerData={consumerData}
          setConsumerData={setConsumerData}
          setDataWasChanged={setDataWasChanged}
        />
      </Details>

      <Details title={"Зміна паролю"}>
        <Password placeholder="**********" />
        <Password placeholder="Створіть новий пароль*" />
        <Password placeholder="Повторно введіть новий пароль*" />
      </Details>

      <div className={styles.buttonsWrapper}>
        <input
          disabled={saveChangesDisabled}
          type="button"
          value="Зберегти зміни"
          className={styles.formButton}
          onClick={e => saveChanges(e)}
        />
      </div>
    </form>
  );
};
export default ConsumerData;
