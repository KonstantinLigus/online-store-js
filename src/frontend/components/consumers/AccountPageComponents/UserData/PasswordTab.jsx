"use client";
import styles from "./Tab.module.scss";
import Password from "../../Fields/Password";
import Button from "../../Button/Button";

const PasswordTab = () => {
  return (
    <div className={styles.tab}>
      <div className={styles.tab__inner}>
        <p className={styles.tab__title}>Зміна пароля</p>
        <form action="GET" className={styles.form}>
          <fieldset className={styles.form__fieldset}>
            <Password name="oldPassword" />
            <Password name="newPassword" />
            <Password name="repeatNewPassword" />
          </fieldset>
        </form>
        <Button title="Зберегти зміни" />
      </div>
    </div>
  );
};
export default PasswordTab;
