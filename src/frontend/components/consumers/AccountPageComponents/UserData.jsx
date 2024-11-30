"use client";
import React, { useState } from "react";
import styles from "./UserData.module.scss";
import Contacts from "./UserData/Contacts";
import Address from "./UserData/Address";
import Orders from "./UserData/Orders";
import Liked from "./UserData/Liked";
import Password from "./UserData/Password";

const UserData = ({ user }) => {
  const [cuttentTab, setCuttentTab] = useState(1);

  return (
    <div className={styles.data}>
      <input
        type="radio"
        name="tabs"
        id="tab1"
        checked={cuttentTab === 1}
        onChange={() => setCuttentTab(1)}
        className={styles.data__input}
      />
      <label htmlFor="tab1" className={styles.data__label}>
        Контактна інформація
      </label>
      {cuttentTab === 1 && <Contacts user={user} />}

      <input
        type="radio"
        name="tabs"
        id="tab2"
        checked={cuttentTab === 2}
        onChange={() => setCuttentTab(2)}
        className={styles.data__input}
      />
      <label htmlFor="tab2" className={styles.data__label}>
        Адреса доставки
      </label>
      {cuttentTab === 2 && <Address user={user} />}

      <input
        type="radio"
        name="tabs"
        id="tab3"
        checked={cuttentTab === 3}
        onChange={() => setCuttentTab(3)}
        className={styles.data__input}
      />
      <label htmlFor="tab3" className={styles.data__label}>
        Історія замовлень
      </label>
      {cuttentTab === 3 && <Orders />}

      <input
        type="radio"
        name="tabs"
        id="tab4"
        checked={cuttentTab === 4}
        onChange={() => setCuttentTab(4)}
        className={styles.data__input}
      />
      <label htmlFor="tab4" className={styles.data__label}>
        Список бажань
      </label>
      {cuttentTab === 4 && <Liked />}

      <input
        type="radio"
        name="tabs"
        id="tab5"
        checked={cuttentTab === 5}
        onChange={() => setCuttentTab(5)}
        className={styles.data__input}
      />
      <label htmlFor="tab5" className={styles.data__label}>
        Зміна паролю
      </label>
      {cuttentTab === 5 && <Password />}

      <button className={styles.data__exit}>Вийти</button>
    </div>
  );
};
export default UserData;
