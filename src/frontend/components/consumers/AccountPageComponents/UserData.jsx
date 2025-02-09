"use client";
import React, { useState } from "react";
import styles from "./UserData.module.scss";
import ContactsTab from "./UserData/ContactsTab";
import AddressTab from "./UserData/AddressTab";
import OrdersTab from "./UserData/OrdersTab";
import LikedProductsTab from "./UserData/LikedProductsTab";
import PasswordTab from "./UserData/PasswordTab";
import UserQuitButton from "../UserQuitButton/UserQuitButton";
import PasswordChangeForm from "../PasswordChangeForm";

const UserData = ({ user, token }) => {
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
      <label
        htmlFor="tab1"
        className={`${styles.data__label} ${styles.data__label_gridRow1}`}
      >
        Контактна інформація
      </label>
      {cuttentTab === 1 && <ContactsTab user={user} />}

      <input
        type="radio"
        name="tabs"
        id="tab2"
        checked={cuttentTab === 2}
        onChange={() => setCuttentTab(2)}
        className={styles.data__input}
      />
      <label
        htmlFor="tab2"
        className={`${styles.data__label} ${styles.data__label_gridRow2}`}
      >
        Адреса доставки
      </label>
      {cuttentTab === 2 && <AddressTab user={user} />}

      <input
        type="radio"
        name="tabs"
        id="tab3"
        checked={cuttentTab === 3}
        onChange={() => setCuttentTab(3)}
        className={styles.data__input}
      />
      <label
        htmlFor="tab3"
        className={`${styles.data__label} ${styles.data__label_gridRow3}`}
      >
        Історія замовлень
      </label>
      {cuttentTab === 3 && <OrdersTab user={user} />}

      <input
        type="radio"
        name="tabs"
        id="tab4"
        checked={cuttentTab === 4}
        onChange={() => setCuttentTab(4)}
        className={styles.data__input}
      />
      <label
        htmlFor="tab4"
        className={`${styles.data__label} ${styles.data__label_gridRow4}`}
      >
        Список бажань
      </label>
      {cuttentTab === 4 && <LikedProductsTab />}

      {token && (
        <>
          <input
            type="radio"
            name="tabs"
            id="tab5"
            checked={cuttentTab === 5}
            onChange={() => setCuttentTab(5)}
            className={styles.data__input}
          />
          <label
            htmlFor="tab5"
            className={`${styles.data__label} ${styles.data__label_gridRow5}`}
          >
            Зміна паролю
          </label>
        </>
      )}
      {token && cuttentTab === 5 && <PasswordChangeForm />}
      <UserQuitButton token={token} className={styles.data__exit} />
    </div>
  );
};
export default UserData;
