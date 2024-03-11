"use client";
import { useState } from "react";
import styles from "./Field.module.scss";

const Password = ({ initValue, setState, name }) => {
  const [password, setPassword] = useState(initValue || "");
  const [pswdTypeToggle, setPswdTypeToggle] = useState(false);

  const handleInputChange = e => {
    let { value } = e.target;

    setPassword(value);

    setState(prev => ({
      ...prev,
      [name]: "",
    }));

    if (value.length >= 7) {
      setState(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const getName = () =>
    (name === "password" && "Пароль") ||
    (name === "passwordRepeat" && "Повторити пароль");

  const getIconStyle = () =>
    pswdTypeToggle
      ? styles.Field__pswdShowIcon_visible
      : styles.Field__pswdShowIcon_hidden;

  return (
    <>
      <label
        htmlFor={name}
        className={`${styles.Field__label_marginBottom} ${styles.Field__label}`}
      >
        {getName()}:
      </label>
      <div className={styles.Field__inputWrapper}>
        <input
          type={pswdTypeToggle ? "text" : "password"}
          id={name}
          name={name}
          className={styles.Field__input}
          value={password}
          onChange={handleInputChange}
          minLength={7}
        />
        <button
          className={styles.Field__pswdShowBtn}
          type="button"
          onClick={() => setPswdTypeToggle(!pswdTypeToggle)}
        >
          <svg className={`${styles.Field__pswdShowIcon} ${getIconStyle()}`}>
            <use href="assets/icon/icon-eye.svg#eye" />
          </svg>
        </button>
      </div>
      <p className={styles.Field__errorMsg}>
        Пароль повинен складатися мінімум з 7 символів
      </p>
    </>
  );
};

export default Password;
