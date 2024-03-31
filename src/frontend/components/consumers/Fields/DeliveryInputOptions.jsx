"use client";
import { useCallback, useEffect, useState } from "react";
import styles from "./Field.module.scss";
import { debounce } from "@/frontend/helpers";

const DeliveryInputOptions = ({
  name,
  initValue,
  setDeliveryData,
  fetchAndSetData,
  type,
}) => {
  const [optionsList, setOptionsList] = useState([]);
  const [value, setValue] = useState(initValue || "");

  useEffect(() => {
    setValue(initValue || "");
  }, [initValue]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetch = useCallback(
    debounce(fetchAndSetData(setOptionsList), 1000),
    [],
  );

  const handleInputChange = async e => {
    const { value } = e.target;

    setValue(value);
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
          value={value}
          onChange={handleInputChange}
          className={styles.Field__input}
        />
        <p className={styles.Field__errorMsg}>
          Оберіть {name} з випадаючого списку
        </p>
        {optionsList?.length > 0 && (
          <ul className={styles.Field__optionList}>
            {optionsList.map(({ description, ref }) => (
              <li key={ref} onClick={e => handleOptionClick(e, ref)}>
                {description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default DeliveryInputOptions;
