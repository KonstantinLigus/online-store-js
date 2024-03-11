"use client";
import { useEffect, useState } from "react";
import styles from "./Field.module.scss";

const NEXT_PUBLIC_EMAIL_PATTERN = process.env.NEXT_PUBLIC_EMAIL_PATTERN;
const emailRegExp = new RegExp(NEXT_PUBLIC_EMAIL_PATTERN);

const Email = ({ initValue, setState }) => {
  const [email, setEmail] = useState(initValue || "");

  useEffect(() => {
    setEmail(initValue);
  }, [initValue]);

  const handleInputChange = e => {
    const { value } = e.target;

    setEmail(value);

    if (emailRegExp.test(value)) {
      setState(prev => ({
        ...prev,
        email: value,
      }));
    }
  };

  return (
    <>
      <label
        htmlFor="email"
        className={`${styles.Field__label_marginBottom} ${styles.Field__label}`}
      >
        Email:
      </label>
      <input
        type="email"
        id="email"
        name="email"
        pattern={NEXT_PUBLIC_EMAIL_PATTERN}
        className={styles.Field__input}
        value={email}
        onChange={handleInputChange}
      />
      <p className={styles.Field__errorMsg}>Невірний формат email</p>
    </>
  );
};

export default Email;
