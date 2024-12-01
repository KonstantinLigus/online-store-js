"use client";
import React, { useState } from "react";
import styles from "./Contacts.module.scss";
import Phone from "../../Fields/Phone";
import Email from "../../Fields/Email";
import Name from "../../Fields/Name";
import Button from "../../Button/Button";

const Contacts = ({ user }) => {
  const [consumerData, setConsumerData] = useState(user);

  return (
    <div className={styles.container}>
      <form action="GET" className={styles.form}>
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
      </form>

      <Button title="Зберегти зміни" />
    </div>
  );
};
export default Contacts;
