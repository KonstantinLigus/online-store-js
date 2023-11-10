"use client";
import React, { useState, useEffect } from "react";
import styles from "../OrderForm.module.scss";

const Delivery = ({ consumer, changeData }) => {
  const deliveryTypes = [
    "Нова Пошта - Відділення",
    "Нова Пошта - доставка кур’єром",
    "Самовивіз з магазину в Києві: вул. І.Мазепи, 37",
  ];

  const [regions, setRegions] = useState([]);
  const [region, setRegion] = useState({});
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");
  const [offices, setOffices] = useState([]);

  const [invalidRegion, setInvalidRegion] = useState(false);
  const [invalidCity, setInvalidCity] = useState(false);
  const [invalidOffice, setInvalidOffice] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("api/novaPoshta/getAreas");
      const { data } = await res.json();
      setRegions(data);
    };
    fetchData();
  }, []);

  const handleRegion = e => {
    let region = regions.find(i => i.description === e.target.value);
    if (region !== undefined) {
      setRegion(region);
    }
    changeData(prev => ({
      ...prev,
      region: e.target.value,
    }));
  };

  const handleCity = e => {
    if (invalidCity) setInvalidCity(false);
    if (e.target.value.length > 0) {
      const fetchData = async () => {
        const res = await fetch(
          `api/novaPoshta/getCities?areaRef=${region.areaRef}&cityName=${e.target.value}`,
        );
        const { data } = await res.json();
        setCities(data);
      };
      fetchData();
    }

    changeData(prev => ({
      ...prev,
      city: e.target.value,
    }));

    setCity(e.target.value);
  };

  const handleDeliveryType = e => {
    changeData(prev => ({
      ...prev,
      deliveryType: e.target.value,
    }));
  };

  const handleOffice = e => {
    if (city === cities[0].description) {
      const fetchData = async () => {
        const res = await fetch(
          `api/novaPoshta/getPostOffices?cityRef=${cities[0].cityRef}`,
        );
        const { data } = await res.json();
        setOffices(data);
        console.log(data);
      };
      fetchData();

      changeData(prev => ({
        ...prev,
        office: e.target.value,
      }));
    } else {
      setInvalidCity(true);
    }
  };

  return (
    <>
      <label htmlFor="region" className={styles.labelSelect}>
        Область:&nbsp;
        <span
          className={styles.invalidData}
          style={invalidRegion ? { display: "initial" } : { display: "none" }}
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

      <label htmlFor="city" className={styles.labelSelect}>
        Місто:&nbsp;
        <span
          className={styles.invalidData}
          style={invalidCity ? { display: "initial" } : { display: "none" }}
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
      <datalist id="city">
        {cities.map(c => (
          <option key={c.cityRef} value={c.description}>
            {c.description}
          </option>
        ))}
      </datalist>

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

      <label htmlFor="office" className={styles.labelText}>
        Відділення:&nbsp;
        <span
          className={styles.invalidData}
          style={invalidOffice ? { display: "initial" } : { display: "none" }}
        >
          Виберіть відділення з випадаючого списку
        </span>
      </label>
      <input
        list="office"
        name="office"
        className={styles.select}
        value={consumer.office}
        onChange={handleOffice}
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
