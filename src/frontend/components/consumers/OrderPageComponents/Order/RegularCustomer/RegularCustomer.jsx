"use client";
import React from "react";
import Image from "next/image";
import styles from "./RegularCustomer.module.scss";

const RegularCustomer = () => {
  return (
    <div className={styles.regularCustomer}>
      <div className={styles.container}>
        <form
          action="GET"
          className={styles.form}
          onSubmit={e => e.preventDefault()}
        >
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

          <label htmlFor="password" className={styles.labelText}>
            Пароль:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="********"
            className={styles.inputText}
          />

          <input
            type="button"
            value="Забули пароль?"
            className={styles.btnPassword}
          />

          <input type="submit" value="Увійти" className={styles.btnSubmit} />
        </form>

        <p>Також можна увійти через:</p>

        <input type="button" value="Google" className={styles.btnSignIn} />
      </div>
    </div>
  );
};
export default RegularCustomer;
