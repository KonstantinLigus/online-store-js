"use client";
import { useEffect, useState } from "react";
import styles from "./Field.module.scss";

const NEXT_PUBLIC_NAME_PATTERN = process.env.NEXT_PUBLIC_NAME_PATTERN;
const nameRegExp = RegExp(NEXT_PUBLIC_NAME_PATTERN);

const Name = ({ initValue, setState, name }) => {
  const [nameState, setNameState] = useState(initValue || "");

  useEffect(() => {
    setNameState(initValue || "");
  }, [initValue]);

  const handleInputChange = e => {
    let { value } = e.target;
    const { length } = value;

    if (length === 0) {
      setNameState(value);
      return;
    }

    if (length === 1 && /[a-zа-яії']/i.test(value)) {
      setNameState(value.toUpperCase());
      return;
    }

    if (nameRegExp.test(value)) {
      setNameState(value);
      setState(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const getName = () =>
    (name === "firstName" && "І'мя") ||
    (name === "secondName" && "По-батькові") ||
    (name === "surname" && "Прізвище");

  return (
    <>
      <label
        htmlFor={name}
        className={`${styles.Field__label_marginBottom} ${styles.Field__label}`}
      >
        {getName()}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        pattern={NEXT_PUBLIC_NAME_PATTERN}
        value={nameState}
        className={styles.Field__input}
        onChange={handleInputChange}
      />
      <p className={styles.Field__errorMsg}>
        {getName()} повинне складатись мінімум з 2 символів. Може містити тільки
        букви та(або) цифри.
      </p>
    </>
  );
};

export default Name;
