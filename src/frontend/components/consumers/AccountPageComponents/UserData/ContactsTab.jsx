"use client";
import React, { useState } from "react";
import styles from "./Tab.module.scss";
import Phone from "../../Fields/Phone";
import Email from "../../Fields/Email";
import Name from "../../Fields/Name";
import Button from "../../Button/Button";
import Birthday from "../../Fields/Bithday";

const ContactsTab = ({ user }) => {
  const [consumerData, setConsumerData] = useState(user);

  return (
    <div className={styles.tab}>
      <div className={styles.tab__inner}>
        <p className={styles.tab__title}>Контактна інформація</p>
        <form action="GET" className={styles.form}>
          <fieldset className={styles.form__fieldset}>
            <Name
              name="firstName"
              initValue={consumerData.firstName}
              setState={setConsumerData}
            />
            <Name
              name="surname"
              initValue={consumerData.surname}
              setState={setConsumerData}
            />
            <Name
              name="secondName"
              //initValue={consumerData.surname}
              //setState={setConsumerData}
            />
          </fieldset>
          <fieldset className={styles.form__fieldset}>
            <Email initValue={consumerData.email} setState={setConsumerData} />
            <Phone
              initValue={consumerData.customerPhone}
              setState={setConsumerData}
            />
            <Birthday />
          </fieldset>
        </form>
        <Button title="Зберегти зміни" />
      </div>
    </div>
  );
};
export default ContactsTab;
