"use client";
import React from "react";
import styles from "../Order.module.scss";

const Delivery = ({ consumer, changeData }) => {
  const deliveryTypes = [
    "Нова Пошта - Відділення",
    "Нова Пошта - доставка кур’єром",
    "Самовивіз з магазину в Києві: вул. І.Мазепи, 37",
  ];
  const cities = [
    "Київ",
    "Вінниця",
    "Дніпро",
    "Житомир",
    "Запоріжжя",
    "Івано-Франківськ",
    "Кропивницький",
    "Луцьк",
    "Львів",
    "Миколаїв",
    "Одеса",
    "Полтава",
    "Рівне",
    "Суми",
    "Тернопіль",
    "Ужгород",
    "Харків",
    "Херсон",
    "Хмельницький",
    "Черкаси",
    "Чернівці",
    "Чернігів",
  ];
  const offices = ["Відділення №1", "Відділення №2", "Відділення №3"];

  const handleDeliveryType = e => {
    changeData(prev => ({
      ...prev,
      deliveryType: e.target.value,
    }));
  };

  const handleCity = e => {
    changeData(prev => ({
      ...prev,
      city: e.target.value,
    }));
  };

  const handleOffice = e => {
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

      <label htmlFor="city" className={styles.labelSelect}>
        Місто:
      </label>
      <select
        id="city"
        className={styles.select}
        value={consumer.city}
        onChange={handleCity}
      >
        {cities.map(c => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <label htmlFor="office" className={styles.labelText}>
        Відділення:
      </label>
      <select
        id="office"
        className={styles.select}
        value={consumer.office}
        onChange={handleOffice}
      >
        {offices.map(o => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </>
  );
};

export default Delivery;
