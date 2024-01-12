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
const dataValidation = {
  firstName: true,
  secondName: true,
  surname: true,
  customerPhone: true,
  email: true,
  birthday: true,
  deliveryType: true,
  region: true,
  city: true,
  postOffice: true,
  street: true,
  house: true,
  flat: true,
};

const ConsumerData = props => {
  //const [consumer, setConsumer] = useState({ ...props.consumer }); - consumerData
  const [consumerData, setConsumerData] = useState({ ...props.consumer });
  const [consumerDataChanges, setConsumerDataChanges] = useState({
    ...props.consumer,
  });
  const [dataWasChanged, setDataWasChanged] = useState({ ...dataChanging });
  const [dataIsValid, setDataIsValid] = useState({ ...dataValidation });

  const [saveChangesDisabled, setSaveChangesDisabled] = useState(true);
  const [undoChangesDisabled, setUndoChangesDisabled] = useState(true);

  const checkChanges = () => {
    let wasChanged = false;
    if (Object.values(dataWasChanged).some(i => i === true)) {
      wasChanged = true;
      setUndoChangesDisabled(false);
    } else {
      setUndoChangesDisabled(true);
    }
    if (Object.values(dataIsValid).some(i => i === false)) wasChanged = false;
    wasChanged ? setSaveChangesDisabled(false) : setSaveChangesDisabled(true);
  };

  useEffect(() => {
    checkChanges();
  }, [dataWasChanged, dataIsValid]);

  const validateData = e => {
    e.preventDefault();
    let checked = true;
    /*
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
*/
    if (checked) sendOrder();
  };

  const sendOrder = () => {
    alert("Ваше замовлення прийнято!");
  };

  const undoChanges = e => {
    setConsumerDataChanges({ ...consumerData });
    setDataWasChanged({ ...dataChanging });
    setDataIsValid({ ...dataValidation });
  };

  return (
    <form action="GET" className={styles.form}>
      <Details title={"Контактна інформація"}>
        <Phone
          consumerData={consumerData}
          consumerDataChanges={consumerDataChanges}
          setConsumerDataChanges={setConsumerDataChanges}
          setDataWasChanged={setDataWasChanged}
          dataIsValid={dataIsValid}
          setDataIsValid={setDataIsValid}
        />

        <Email
          consumerData={consumerData}
          consumerDataChanges={consumerDataChanges}
          setConsumerDataChanges={setConsumerDataChanges}
          setDataWasChanged={setDataWasChanged}
          dataIsValid={dataIsValid}
          setDataIsValid={setDataIsValid}
        />

        <Surname
          consumerData={consumerData}
          consumerDataChanges={consumerDataChanges}
          setConsumerDataChanges={setConsumerDataChanges}
          setDataWasChanged={setDataWasChanged}
          dataIsValid={dataIsValid}
          setDataIsValid={setDataIsValid}
        />

        <FirstName
          consumerData={consumerData}
          consumerDataChanges={consumerDataChanges}
          setConsumerDataChanges={setConsumerDataChanges}
          setDataWasChanged={setDataWasChanged}
          dataIsValid={dataIsValid}
          setDataIsValid={setDataIsValid}
        />

        <SecondName
          consumerData={consumerData}
          consumerDataChanges={consumerDataChanges}
          setConsumerDataChanges={setConsumerDataChanges}
          setDataWasChanged={setDataWasChanged}
        />

        <Birthday
          consumerData={consumerData}
          consumerDataChanges={consumerDataChanges}
          setConsumerDataChanges={setConsumerDataChanges}
          setDataWasChanged={setDataWasChanged}
        />
      </Details>

      <Details title={"Адреса доставки"}>
        <DeliveryType
          consumerData={consumerData}
          consumerDataChanges={consumerDataChanges}
          setConsumerDataChanges={setConsumerDataChanges}
          setDataWasChanged={setDataWasChanged}
          dataIsValid={dataIsValid}
          setDataIsValid={setDataIsValid}
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
          onClick={e => validateData(e)}
        />

        <input
          disabled={undoChangesDisabled}
          type="button"
          value="Скасувати зміни"
          className={styles.formButton}
          onClick={e => undoChanges(e)}
        />
      </div>
    </form>
  );
};
export default ConsumerData;
