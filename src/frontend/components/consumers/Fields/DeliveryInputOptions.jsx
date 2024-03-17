"use client";
import { useEffect, useMemo, useState } from "react";
import styles from "./Field.module.scss";
import { debounce } from "@/frontend/helpers";

const DeliveryInputOptions = ({
  initValue,
  setState,
  type,
  dataRef,
  setRef,
}) => {
  const [value, setValue] = useState(initValue);
  const [optionsList, setOptionsList] = useState([]);

  const debouncedRegionsFetch = useMemo(
    () =>
      debounce(async value => {
        const res = await fetch("api/novaPoshta/getAreas");
        const { data } = await res.json();

        const filteredData = data.filter(option =>
          option.description.toLowerCase().includes(value.toLowerCase()),
        );
        setOptionsList(filteredData);

        value.length === 0 && setOptionsList([]);
      }, 1000),
    [],
  );

  const debouncedCityFetch = useMemo(
    () =>
      debounce(async value => {
        const res = await fetch(
          `api/novaPoshta/getCities?areaRef=${dataRef}&cityName=${value}`,
        );
        const { data } = await res.json();

        data && setOptionsList(data);

        value.length === 0 && setOptionsList([]);
      }, 1000),
    [dataRef],
  );

  const debouncedPostOfficesFetch = useMemo(
    () =>
      debounce(async value => {
        const res = await fetch(
          `api/novaPoshta/getPostOffices?cityRef=${dataRef}`,
        );
        const { data } = await res.json();

        data && setOptionsList(data);

        value.length === 0 && setOptionsList([]);
      }, 1000),
    [dataRef],
  );

  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

  const handleInputChange = async e => {
    const { value } = e.target;

    setValue(value);

    if (initValue) {
      setState(prev => ({ ...prev, region: "", city: "", postOffice: "" }));
      setRef && setRef({});
    }

    if (type === "region") debouncedRegionsFetch(value);
    if (type === "city") debouncedCityFetch(value);
    if (type === "postOffice") debouncedPostOfficesFetch(value);
  };

  const handleOptionClick = e => {
    const { textContent } = e.target;

    setOptionsList([]);

    setState &&
      setState(prev => ({
        ...prev,
        [type]: textContent,
      }));

    setValue(textContent);

    setRef &&
      setRef(prev => ({
        ...prev,
        [type]: e.target.dataset.refs,
      }));
  };

  const getName = () =>
    (type === "region" && "Область") ||
    (type === "city" && "Місто") ||
    (type === "postOffice" && "Відділення");

  const getOptionRef = () =>
    (type === "region" && "areaRef") ||
    (type === "city" && "cityRef") ||
    (type === "postOffice" && "number");

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
          pattern={"^[^A-Za-z]+$"}
          autoComplete="off"
          value={value || ""}
          onChange={handleInputChange}
          className={styles.Field__input}
        />
        <p className={styles.Field__errorMsg}>
          Оберіть {getName()} з випадаючого списку
        </p>
        {optionsList?.length > 0 && (
          <ul className={styles.Field__optionList}>
            {optionsList.map(option => (
              <li
                key={option[getOptionRef()]}
                data-refs={option[getOptionRef()]}
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
