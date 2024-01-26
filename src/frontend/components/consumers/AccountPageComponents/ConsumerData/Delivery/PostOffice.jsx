"use client";
import React, { useState, useEffect } from "react";
import styles from "../ConsumerData.module.scss";

const PostOffice = ({
  consumerData,
  setConsumerData,
  dataWasChanged,
  setDataWasChanged,
  city,
  typeOfDelivery,
}) => {
  const [offices, setOffices] = useState([]);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (
      consumerData.region === "" ||
      consumerData.city === "" ||
      dataWasChanged.city === null
    ) {
      setIsValid(false);
      document
        .querySelector("input[name='office']")
        .setCustomValidity("Invalid field.");
    }
  }, [typeOfDelivery, consumerData.city, dataWasChanged.city]);

  const handleOffice = e => {
    const fetchData = async () => {
      const res = await fetch(
        `api/novaPoshta/getPostOffices?cityRef=${city[0].cityRef}`,
      );
      const { data } = await res.json();
      setOffices(data);
      if (data.map(o => o.description).includes(e.target.value)) {
        setIsValid(true);
        e.target.setCustomValidity("");
        setDataWasChanged(prev => ({
          ...prev,
          postOffice: true,
        }));
      } else {
        setIsValid(false);
        e.target.setCustomValidity("Invalid field.");
        setDataWasChanged(prev => ({
          ...prev,
          postOffice: null,
        }));
      }
    };
    fetchData();

    setConsumerData(prev => ({
      ...prev,
      postOffice: e.target.value,
    }));
  };

  const handleKeyDown = e => {
    if (e.key === "Backspace") {
      e.target.setCustomValidity("Invalid field.");
      setDataWasChanged(prev => ({
        ...prev,
        postOffice: null,
      }));
      setConsumerData(prev => ({
        ...prev,
        postOffice: "",
      }));
    }
  };

  return (
    <>
      <label
        htmlFor="office"
        className={isValid ? styles.labelValid : styles.labelInvalid}
      >
        Відділення:
      </label>
      <input
        list="office"
        name="office"
        className={styles.select}
        value={consumerData.postOffice}
        onChange={handleOffice}
        onKeyDown={handleKeyDown}
      />
      <datalist id="office">
        {offices.map(o => (
          <option key={o.number} value={o.description}>
            {o.description}
          </option>
        ))}
      </datalist>
    </>
  );
};

export default PostOffice;
