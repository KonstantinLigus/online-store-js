"use client";
import { useEffect, useState } from "react";
import styles from "./Field.module.scss";

const NEXT_PUBLIC_PHONE_PATTERN = process.env.NEXT_PUBLIC_PHONE_PATTERN;
const phoneRegExp = new RegExp(NEXT_PUBLIC_PHONE_PATTERN);

const Phone = ({ initValue, setState }) => {
  const [phone, setPhone] = useState(initValue || "");

  useEffect(() => {
    setPhone(initValue);
  }, [initValue]);

  const handleInputChange = e => {
    let { value } = e.target;
    const { length } = value;

    if (length === 1 && /\d/.test(value)) {
      setPhone(`+380${value}`);
      return;
    }

    if (length === 3) {
      setPhone("");
      return;
    }

    if (length <= 13 && /^\+\d+$/.test(value)) {
      setPhone(value);
    }

    if (phoneRegExp.test(value)) {
      setState(prev => ({
        ...prev,
        customerPhone: value,
      }));
    }
  };

  const handleInputClick = e => {
    setPhone("+380" + e.target.value.slice(4));
  };

  return (
    <>
      <label
        htmlFor="tel"
        className={`${styles.Field__label_marginBottom} ${styles.Field__label}`}
      >
        Номер телефону:
      </label>
      <input
        type="tel"
        id="tel"
        name="customerPhone"
        pattern={NEXT_PUBLIC_PHONE_PATTERN}
        className={styles.Field__input}
        value={phone}
        onChange={handleInputChange}
        onClick={handleInputClick}
      />
      <p className={styles.Field__errorMsg}>
        Телефон повинен складатися з 13 цифр символів
      </p>
    </>
  );
};

export default Phone;
