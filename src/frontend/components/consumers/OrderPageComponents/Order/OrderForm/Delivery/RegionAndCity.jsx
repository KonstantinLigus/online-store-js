"use client";
import React, { useState, useEffect } from "react";
import styles from "../OrderForm.module.scss";
import PostOffice from "./PostOffice";
import ConsumerAddress from "./ConsumerAddress";

const RegionAndCity = ({
  consumer,
  changeData,
  regionIsValid,
  setRegionIsValid,
  regionError,
  setRegionError,
  cityIsValid,
  setCityIsValid,
  cityError,
  setCityError,
  typeOfDelivery,
  setPostOfficeIsValid,
  postOfficeError,
  setPostOfficeError,
  streetIsValid,
  setStreetIsValid,
  houseIsValid,
  setHouseIsValid,
}) => {
  const [regions, setRegions] = useState([]);
  const [region, setRegion] = useState({});

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
    if (regionError) setRegionError(false);
    let region = regions.find(i => i.description === e.target.value);
    if (regions.includes(region)) {
      setRegion(region);
      setRegionIsValid(true);
    } else {
      setRegionIsValid(false);
    }
    changeData(prev => ({
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
    if (cityError) setCityError(false);
    if (e.target.value.length > 0) {
      const fetchData = async () => {
        const res = await fetch(
          `api/novaPoshta/getCities?areaRef=${region.areaRef}&cityName=${e.target.value}`,
        );
        const { data } = await res.json();
        setCities(data);
        if (data) {
          if (e.target.value === data[0].description) {
            setCityIsValid(true);
          } else {
            setCityIsValid(false);
          }
        }
      };
      fetchData();
    }

    changeData(prev => ({
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
          style={regionError ? { display: "initial" } : { display: "none" }}
        >
          Виберіть область з випадаючого списку
        </span>
      </label>
      <input
        list="region"
        name="region"
        className={styles.select}
        value={consumer.region}
        onChange={handleRegion}
      />
      <datalist id="region">
        {regions.map(r => (
          <option key={r.areaRef} value={r.description}>
            {r.description}
          </option>
        ))}
      </datalist>

      {regionIsValid && consumer.region && (
        <>
          <label htmlFor="city" className={styles.labelSelect}>
            Місто:&nbsp;
            <span
              className={styles.invalidData}
              style={cityError ? { display: "initial" } : { display: "none" }}
            >
              Виберіть місто з випадаючого списку
            </span>
          </label>
          <input
            list="city"
            name="city"
            className={styles.select}
            value={consumer.city}
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

          {cityIsValid &&
            consumer.city &&
            (typeOfDelivery === "office" ? (
              <PostOffice
                consumer={consumer}
                changeData={changeData}
                city={cities[0].cityRef}
                setPostOfficeIsValid={setPostOfficeIsValid}
                postOfficeError={postOfficeError}
                setPostOfficeError={setPostOfficeError}
              />
            ) : (
              <ConsumerAddress
                consumer={consumer}
                changeData={changeData}
                streetIsValid={streetIsValid}
                setStreetIsValid={setStreetIsValid}
                houseIsValid={houseIsValid}
                setHouseIsValid={setHouseIsValid}
              />
            ))}
        </>
      )}
    </>
  );
};

export default RegionAndCity;
