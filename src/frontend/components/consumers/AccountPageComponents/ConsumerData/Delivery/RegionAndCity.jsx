"use client";
import React, { useState, useEffect } from "react";
import styles from "../ConsumerData.module.scss";
import PostOffice from "./PostOffice";
import ConsumerAddress from "./ConsumerAddress";

const RegionAndCity = ({
  consumerData,
  setConsumerData,
  setDataWasChanged,
  dataIsValid,
  setDataIsValid,
  typeOfDelivery,
}) => {
  const [consumerRegion, setConsumerRegion] = useState(consumerData.region);
  const [regions, setRegions] = useState([]);
  const [region, setRegion] = useState(consumerData.region);

  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("api/novaPoshta/getAreas");
      const { data } = await res.json();
      setRegions(data);
    };
    fetchData();
  }, []);

  const handleRegion = e => {
    setConsumerData(prev => ({
      ...prev,
      region: e.target.value,
      city: "",
      postOffice: "",
      street: "",
      house: "",
      flat: "",
    }));
  };

  const handleCity = e => {
    setConsumerData(prev => ({
      ...prev,
      city: e.target.value,
      postOffice: "",
      street: "",
      house: "",
      flat: "",
    }));
  };

  return (
    <>
      <label htmlFor="region" className={styles.labelSelect}>
        Область:&nbsp;
        <span
          className={styles.invalidData}
          style={
            dataIsValid.region ? { display: "none" } : { display: "initial" }
          }
        >
          Виберіть область з випадаючого списку
        </span>
      </label>
      <input
        list="region"
        name="region"
        className={styles.select}
        value={consumerData.region}
        onChange={handleRegion}
      />
      <datalist id="region">
        {regions.map(r => (
          <option key={r.areaRef} value={r.description}>
            {r.description}
          </option>
        ))}
      </datalist>

      <label htmlFor="city" className={styles.labelSelect}>
        Місто:&nbsp;
        <span
          className={styles.invalidData}
          style={
            dataIsValid.city ? { display: "none" } : { display: "initial" }
          }
        >
          Виберіть місто з випадаючого списку
        </span>
      </label>
      <input
        list="city"
        name="city"
        className={styles.select}
        value={consumerData.city}
        onChange={handleCity}
      />
      {cities && (
        <datalist id="city">
          {cities.map(c => (
            <option key={c.cityRef} value={c.description}>
              {c.description}
            </option>
          ))}
        </datalist>
      )}

      {typeOfDelivery === "office" ? (
        <PostOffice
          consumerData={consumerData}
          setConsumerData={setConsumerData}
          setDataWasChanged={setDataWasChanged}
          dataIsValid={dataIsValid}
          setDataIsValid={setDataIsValid}
        />
      ) : (
        <ConsumerAddress
          consumerData={consumerData}
          setConsumerData={setConsumerData}
          setDataWasChanged={setDataWasChanged}
          dataIsValid={dataIsValid}
          setDataIsValid={setDataIsValid}
        />
      )}
    </>
  );
};

export default RegionAndCity;
