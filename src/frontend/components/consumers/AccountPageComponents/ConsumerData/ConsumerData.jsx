"use client";
import React, { useState, useEffect } from "react";
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
import Loader from "../../Loader";

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

const ConsumerData = props => {
  const [consumerData, setConsumerData] = useState(props.consumer);
  const [dataWasChanged, setDataWasChanged] = useState(dataChanging);
  const [saveChangesDisabled, setSaveChangesDisabled] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const checkChanges = () => {
    let wasChanged = false;
    if (Object.values(dataWasChanged).some(i => i === true)) wasChanged = true;
    if (Object.values(dataWasChanged).some(i => i === null)) wasChanged = false;
    wasChanged ? setSaveChangesDisabled(false) : setSaveChangesDisabled(true);
  };

  useEffect(() => {
    checkChanges();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataWasChanged]);

  const saveChanges = async e => {
    e.preventDefault();
    consumerData.customerPhone = consumerData.customerPhone.replace(/\s+/g, "");
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
          dataWasChanged={dataWasChanged}
          setDataWasChanged={setDataWasChanged}
        />
      </Details>

      <Details title={"Зміна паролю"}>
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
      </Details>

      {isSaved && <p className={styles.messageStatus}>Данні бережено</p>}
      <Loader />
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
