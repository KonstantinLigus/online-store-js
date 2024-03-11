"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./Field.module.scss";
import { debounce } from "@/frontend/helpers";

const DeliveryInputOptions = ({ initValue, setState, type }) => {
  const [defaultValue, setDefaultValue] = useState(initValue);
  const [optionsList, setOptionsList] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    setDefaultValue(initValue);
  }, [initValue]);

  const handleInputChange = async e => {
    const { value } = e.target;

    const res = await fetch("api/novaPoshta/getAreas");
    const { data } = await res.json();

    const filteredData = data.filter(option =>
      option.description.toLowerCase().includes(value.toLowerCase()),
    );
    setOptionsList(filteredData);
    value.length === 0 && setOptionsList([]);
  };

  const handleOptionClick = e => {
    setOptionsList([]);
    setState &&
      setState(prev => ({
        ...prev,
        [getOptionRef()]: e.target.getAttribute("data-ref"),
      }));
    inputRef.current.value = e.target.innerHTML;
  };

  const getName = () =>
    (type === "region" && "Область") ||
    (type === "city" && "Місто") ||
    (type === "postOffice" && "Відділення");

  const getOptionRef = () =>
    (type === "region" && "areaRef") || (type === "city" && "cityRef");

  return (
    <>
      <label
        htmlFor={type}
        className={`${styles.Field__label_marginBottom} ${styles.Field__label}`}
      >
        {getName()}
      </label>
      <div className={styles.Field__inputWrapper}>
        <input
          name={type}
          id={type}
          type="text"
          pattern={"^[А-ЯЄІЇа-яєії']+$"}
          autoComplete="off"
          defaultValue={defaultValue || ""}
          className={styles.Field__input}
          onChange={debounce(handleInputChange, 1000)}
          ref={inputRef}
        />
        <p className={styles.Field__errorMsg}>
          Оберіть область з випадаючого списку
        </p>
        {setOptionsList.length > 0 && (
          <ul className={styles.Field__optionList}>
            {optionsList.map(option => (
              <li
                key={option[getOptionRef()]}
                data-ref={option[getOptionRef()]}
                onClick={handleOptionClick}
              >
                {option.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default DeliveryInputOptions;
