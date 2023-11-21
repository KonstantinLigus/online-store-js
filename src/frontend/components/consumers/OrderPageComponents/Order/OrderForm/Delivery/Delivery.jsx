"use client";
import React, { useState, useEffect } from "react";
import styles from "../OrderForm.module.scss";

const Delivery = ({
  consumer,
  changeData,
  checkRegion,
  setCheckRegion,
  regionIsValid,
  setRegionIsValid,
  checkCity,
  setCheckCity,
  cityIsValid,
  setCityIsValid,
  checkOffice,
  setCheckOffice,
  officeIsValid,
  setOfficeIsValid,
}) => {
  const deliveryTypes = [
    "Нова Пошта - Відділення",
    "Нова Пошта - доставка кур’єром",
    "Самовивіз з магазину в Києві: вул. І.Мазепи, 37",
  ];

  const [regions, setRegions] = useState([]);
  const [region, setRegion] = useState({});
  const [regionIsAvailable, setRegionIsAvailable] = useState(true);
  const [cities, setCities] = useState([]);
  const [cityIsAvailable, setCityIsAvailable] = useState(false);
  const [offices, setOffices] = useState([]);
  const [officeType, setOfficeType] = useState("Відділення");
  const [officesIsAvailable, setOfficesIsAvailable] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("api/novaPoshta/getAreas");
      const { data } = await res.json();
      setRegions(data);
    };
    fetchData();
  }, []);

  const handleDeliveryType = e => {
    switch (e.target.value) {
      case deliveryTypes[0]:
        setRegionIsAvailable(true);
        setOfficeType("Відділення");
        break;
      case deliveryTypes[1]:
        setRegionIsAvailable(true);
        setOfficeType("Адреса");
        break;
      case deliveryTypes[2]:
        setRegionIsAvailable(false);
        setOfficeType("Відділення");
        break;
    }
    setCityIsAvailable(false);
    setOfficesIsAvailable(false);
    if (!regionIsValid) setRegionIsValid(true);
    if (!cityIsValid) setCityIsValid(true);
    if (!officeIsValid) setOfficeIsValid(true);
    changeData(prev => ({
      ...prev,
      deliveryType: e.target.value,
      region: "",
      city: "",
      office: "",
    }));
  };

  const handleRegion = e => {
    if (!regionIsValid) setRegionIsValid(true);
    let region = regions.find(i => i.description === e.target.value);
    if (region !== undefined) {
      setRegion(region);
      setCityIsAvailable(true);
    }
    if (!regions.includes(region)) {
      setCheckRegion(false);
      setCityIsAvailable(false);
      if (!cityIsValid) setCityIsValid(true);
      consumer.city = "";
      setOfficesIsAvailable(false);
      if (!officeIsValid) setOfficeIsValid(true);
      consumer.postOffice = "";
    } else {
      setCheckRegion(true);
    }
    changeData(prev => ({
      ...prev,
      region: e.target.value,
    }));
  };

  const handleCity = e => {
    if (!cityIsValid) setCityIsValid(true);
    if (e.target.value.length > 0) {
      const fetchData = async () => {
        const res = await fetch(
          `api/novaPoshta/getCities?areaRef=${region.areaRef}&cityName=${e.target.value}`,
        );
        const { data } = await res.json();
        setCities(data);
        if (data) {
          if (e.target.value === data[0].description) {
            setOfficesIsAvailable(true);
          }
          if (data.map(с => с.description).includes(e.target.value)) {
            setCheckCity(true);
          } else {
            setCheckCity(false);
          }
        }
      };
      fetchData();
    }

    changeData(prev => ({
      ...prev,
      city: e.target.value,
    }));
  };

  const handleOffice = e => {
    if (!officeIsValid) setOfficeIsValid(true);
    const fetchData = async () => {
      const res = await fetch(
        `api/novaPoshta/getPostOffices?cityRef=${cities[0].cityRef}`,
      );
      const { data } = await res.json();
      setOffices(data);
      if (data.map(o => o.description).includes(e.target.value)) {
        setCheckOffice(true);
      } else {
        setCheckOffice(false);
      }
    };
    fetchData();

    changeData(prev => ({
      ...prev,
      postOffice: e.target.value,
    }));
  };

  const handleAddress = e => {
    if (!officeIsValid) setOfficeIsValid(true);
    changeData(prev => ({
      ...prev,
      office: e.target.value,
    }));
  };

  return (
    <>
      <label htmlFor="delivery" className={styles.labelSelect}>
        Спосіб доставки:
      </label>
      <select
        id="delivery"
        className={styles.select}
        value={consumer.deliveryType}
        onChange={handleDeliveryType}
      >
        {deliveryTypes.map(i => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>

      <label
        htmlFor="region"
        className={
          regionIsAvailable ? styles.labelSelect : styles.labelSelectDisabled
        }
      >
        Область:&nbsp;
        <span
          className={styles.invalidData}
          style={!regionIsValid ? { display: "initial" } : { display: "none" }}
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
        disabled={!regionIsAvailable}
      />
      <datalist id="region">
        {regions.map(r => (
          <option key={r.areaRef} value={r.description}>
            {r.description}
          </option>
        ))}
      </datalist>

      <label
        htmlFor="city"
        className={
          cityIsAvailable ? styles.labelSelect : styles.labelSelectDisabled
        }
      >
        Місто:&nbsp;
        <span
          className={styles.invalidData}
          style={!cityIsValid ? { display: "initial" } : { display: "none" }}
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
        disabled={!cityIsAvailable}
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

      <label
        htmlFor="office"
        className={
          officesIsAvailable ? styles.labelSelect : styles.labelSelectDisabled
        }
      >
        {officeType}:&nbsp;
        <span
          className={styles.invalidData}
          style={!officeIsValid ? { display: "initial" } : { display: "none" }}
        >
          {officeType === "Відділення"
            ? "Виберіть відділення з випадаючого списку"
            : "Введіть адресу"}
        </span>
      </label>
      <input
        list="office"
        name="office"
        className={styles.select}
        value={consumer.postOffice}
        onChange={officeType === "Відділення" ? handleOffice : handleAddress}
        disabled={!officesIsAvailable}
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

export default Delivery;
