"use client";
import React, { useState } from "react";
import styles from "../ConsumerData.module.scss";

const PostOffice = ({
  consumer,
  changeData,
  city,
  setPostOfficeIsValid,
  postOfficeError,
  setPostOfficeError,
}) => {
  const [offices, setOffices] = useState([]);

  const handleOffice = e => {
    if (postOfficeError) setPostOfficeError(false);
    const fetchData = async () => {
      const res = await fetch(`api/novaPoshta/getPostOffices?cityRef=${city}`);
      const { data } = await res.json();
      setOffices(data);
      if (data.map(o => o.description).includes(e.target.value)) {
        setPostOfficeIsValid(true);
      } else {
        setPostOfficeIsValid(false);
      }
    };
    fetchData();

    changeData(prev => ({
      ...prev,
      postOffice: e.target.value,
      street: "",
      house: "",
      flat: "",
    }));
  };

  const handleKeyDown = e => {
    if (e.key === "Backspace") {
      changeData(prev => ({
        ...prev,
        postOffice: "",
      }));
    }
  };

  return (
    <>
      <label htmlFor="office" className={styles.labelSelect}>
        Відділення:&nbsp;
        <span
          className={styles.invalidData}
          style={postOfficeError ? { display: "initial" } : { display: "none" }}
        >
          Виберіть відділення з випадаючого списку
        </span>
      </label>
      <input
        list="office"
        name="office"
        className={styles.select}
        value={consumer.postOffice}
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
