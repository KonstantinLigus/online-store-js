"use client";
import { useEffect, useMemo, useState } from "react";
import styles from "./Field.module.scss";
import { debounce } from "@/frontend/helpers";

const DeliveryInputOptions = ({
  name,
  deliveryData,
  setDeliveryData,
  fetchAndSetData,
  type,
}) => {
  const [optionsList, setOptionsList] = useState([]);

  const debouncedFetch = useMemo(
    () => debounce(fetchAndSetData(setOptionsList), 1000),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleInputChange = async e => {
    const { value } = e.target;

    setDeliveryData(prev => ({ ...prev, [type]: { name: value, ref: "" } }));
    debouncedFetch(value);
  };

  const handleOptionClick = (e, ref) => {
    const { textContent } = e.target;

    setDeliveryData(prev => ({
      ...prev,
      [type]: { name: textContent, ref: ref },
    }));
    setOptionsList([]);
  };

  return (
    <>
      <label
        htmlFor={type}
        className={`${styles.Field__label_marginBottom} ${styles.Field__label}`}
      >
        {name}
      </label>
      <div className={styles.Field__inputWrapper}>
        <input
          name={type}
          id={type}
          type="text"
          pattern={"^[^A-Za-z]+$"}
          autoComplete="off"
          value={deliveryData[type].name || ""}
          onChange={handleInputChange}
          className={styles.Field__input}
        />
        <p className={styles.Field__errorMsg}>
          Оберіть {name} з випадаючого списку
        </p>
        {optionsList?.length > 0 && (
          <ul className={styles.Field__optionList}>
            {optionsList.map(option => (
              <li
                key={option.ref}
                onClick={e => handleOptionClick(e, option.ref)}
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
