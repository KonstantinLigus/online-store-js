"use client";
import React, { useState, useEffect } from "react";
import styles from "../ConsumerData.module.scss";

const ConsumerAddress = ({
  consumerData,
  setConsumerData,
  setDataWasChanged,
  typeOfDelivery,
}) => {
  const [streetIsValid, setStreetIsValid] = useState(true);
  const [houseIsValid, setHouseIsValid] = useState(true);

  useEffect(() => {
    if (consumerData.region === "") {
      setStreetIsValid(false);
      setHouseIsValid(false);
      document
        .querySelector("input[name='street']")
        .setCustomValidity("Invalid field.");
      document
        .querySelector("input[name='house']")
        .setCustomValidity("Invalid field.");
    }
  }, [typeOfDelivery]);

  const handleStreet = e => {
    if (e.target.value.length < 3) {
      setStreetIsValid(false);
      e.target.setCustomValidity("Invalid field.");
      setDataWasChanged(prev => ({
        ...prev,
        street: null,
      }));
    } else {
      {
        setStreetIsValid(true);
        e.target.setCustomValidity("");
        setDataWasChanged(prev => ({
          ...prev,
          street: true,
        }));
      }
    }

    setConsumerData(prev => ({
      ...prev,
      street: e.target.value,
      house: "",
      flat: "",
    }));
  };

  const handleHouse = e => {
    if (e.target.value.length < 1) {
      setHouseIsValid(false);
      e.target.setCustomValidity("Invalid field.");
      setDataWasChanged(prev => ({
        ...prev,
        house: null,
      }));
    } else {
      {
        setHouseIsValid(true);
        e.target.setCustomValidity("");
        setDataWasChanged(prev => ({
          ...prev,
          house: true,
        }));
      }
    }

    setConsumerData(prev => ({
      ...prev,
      house: e.target.value,
      flat: "",
    }));
  };

  const handleFlat = e => {
    setDataWasChanged(prev => ({
      ...prev,
      flat: true,
    }));

    setConsumerData(prev => ({
      ...prev,
      flat: e.target.value,
    }));
  };

  return (
    <>
      <label
        htmlFor="street"
        className={streetIsValid ? styles.labelValid : styles.labelInvalid}
      >
        Вулиця:
      </label>
      <input
        type="text"
        name="street"
        id="street"
        className={styles.inputText}
        value={consumerData.street}
        onChange={handleStreet}
      />

      <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
        <div>
          <label
            htmlFor="house"
            className={houseIsValid ? styles.labelValid : styles.labelInvalid}
          >
            Будинок:
          </label>
          <input
            type="text"
            name="house"
            id="house"
            className={styles.inputText}
            value={consumerData.house}
            onChange={handleHouse}
          />
        </div>

        <div>
          <label htmlFor="flat" className={styles.labelValid}>
            Квартира:
          </label>
          <input
            type="text"
            name="flat"
            id="flat"
            className={styles.inputText}
            value={consumerData.flat}
            onChange={handleFlat}
          />
        </div>
      </div>
    </>
  );
};

export default ConsumerAddress;
