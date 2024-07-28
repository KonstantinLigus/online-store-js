"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getObject, isObjectFieldEqualsToValue } from "@/frontend/helpers";
import SubmitButton from "../SubmitButton/SubmitButton";
import styles from "./PasswordRecoveryTempForm.module.scss";
import Password from "../Fields/Password";
// import Modal from "../Modal";

const userFields = ["tempPassword"];
const status = ["successMsg", "errorMsg"];

const PasswordRecoveryTempForm = ({ setTempPassw }) => {
  const [statusState, setStatusState] = useState(() => getObject(status));
  const [userState, setUserState] = useState(() => getObject(userFields));
  const [isDisabled, setIsDisabled] = useState(true);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isObjectFieldEqualsToValue(userState, "")) {
      setIsDisabled(true);
      return;
    }

    setIsDisabled(false);
  }, [userState]);

  const onFormSubmit = async e => {
    const form = e.currentTarget;
    e.preventDefault();
    form.reset();
    setTempPassw(userState.tempPassword);
  };

  // const tuggleModal = () => setIsModalOpen(prev => !prev);

  return (
    <div className={styles.PasswordRecoveryTempForm__container}>
      <h2 className={styles.PasswordRecoveryTempForm___title}>
        На адресу вашої електронної пошти було надіслано тимчасовий пароль для
        відновлення
      </h2>
      <form
        onSubmit={onFormSubmit}
        className={styles.PasswordRecoveryTempForm___form}
      >
        <div className={styles.PasswordRecoveryTempForm__inputWrapper}>
          <Password setState={setUserState} name="tempPassword" />
          {statusState.errorMsg && (
            <p className={styles.PasswordRecoveryTempForm__errorMsg}>
              {statusState.errorMsg}
            </p>
          )}{" "}
        </div>
        <SubmitButton disabled={isDisabled}>Створити новий пароль</SubmitButton>
      </form>
      <div className={styles.PasswordRecoveryTempForm__nav}>
        <Link href="register">Зареєструватись</Link>
      </div>
    </div>
  );
};

export default PasswordRecoveryTempForm;
