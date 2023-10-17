"use client";
import React from "react";
import Image from "next/image";
import styles from "./Order.module.scss";

const Order = props => {
  const closeOrder = () => {
    props.closeOrder(false);
  };

  return (
    <div className={styles.wrapper}>
      <form action="GET" className={styles.form}>
        <button onClick={closeOrder} className={styles.btnClose}>
          &#x2715;
        </button>

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>
            <span>1</span> Особисті дані
          </legend>

          <label htmlFor="tel" className={styles.labelText}>
            Номер телефону:
          </label>
          <input
            type="tel"
            name="tel"
            id="tel"
            placeholder="+380 68 000 00 00"
            className={styles.inputText}
          />

          <label htmlFor="email" className={styles.labelText}>
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="name@gmail.com"
            className={styles.inputText}
          />

          <label htmlFor="name" className={styles.labelText}>
            ПІБ:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Іванчук Сергій Дмитрович"
            className={styles.inputText}
          />
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>
            <span>2</span> Доставка
          </legend>

          <label htmlFor="delivery" className={styles.labelSelect}>
            Спосіб доставки:
          </label>
          <select id="delivery" className={styles.select}>
            <option>Нова Пошта - Відділення</option>
            <option>Нова Пошта - доставка кур’єром</option>
            <option>Самовивіз з магазину в Києві: вул. І.Мазепи, 37</option>
          </select>

          <label htmlFor="city" className={styles.labelSelect}>
            Місто:
          </label>
          <input
            type="text"
            name="city"
            id="city"
            className={styles.inputText}
          />

          <label htmlFor="office" className={styles.labelText}>
            Відділення:
          </label>
          <input
            type="text"
            name="office"
            id="office"
            className={styles.inputText}
          />
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>
            <span>3</span> Оплата
          </legend>

          <input
            type="radio"
            name="payment"
            id="receipt"
            value="receipt"
            className={styles.radioBtn}
          />
          <label htmlFor="receipt" className={styles.labelRadioBtn}>
            Оплата при отриманні
          </label>

          <br />

          <input
            type="radio"
            name="payment"
            id="card"
            value="card"
            className={styles.radioBtn}
          />
          <label htmlFor="card" className={styles.labelRadioBtn}>
            Оплата карткою
          </label>

          <label htmlFor="comment"></label>
          <textarea
            name="comment"
            id="comment"
            cols="30"
            rows="10"
            placeholder="Додайте коментарі до вашого замовлення"
            className={styles.inputText}
          ></textarea>
        </fieldset>
        <button onClick={closeOrder} className={styles.btnOrder}>
          Оформити замовлення
        </button>
      </form>
    </div>
  );
};
export default Order;
