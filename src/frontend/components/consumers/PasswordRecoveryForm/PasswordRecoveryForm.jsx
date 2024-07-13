"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getObject, isObjectFieldEqualsToValue } from "@/frontend/helpers";
import Email from "../Fields/Email";
import SubmitButton from "../SubmitButton/SubmitButton";
import styles from "./PasswordRecoveryForm.module.scss";
import Modal from "../Modal";

const userFields = ["email"];
const status = ["successMsg", "errorMsg"];

const PasswordRecoveryForm = () => {
  const [statusState, setStatusState] = useState(() => getObject(status));
  const [userState, setUserState] = useState(() => getObject(userFields));
  const [isDisabled, setIsDisabled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    try {
      const res = await fetch("/api/auth/password/recover", {
        method: "POST",
        body: JSON.stringify(userState),
      });
      const data = await res.json();
      if (res.status !== 200) {
        const err = new Error();
        err.error = data.error;
        throw err;
      }
      setStatusState(() => ({ successMsg: data.message, errorMsg: "" }));
      setUserState(() => getObject(userFields));
      setIsModalOpen(prev => !prev);
    } catch (err) {
      setStatusState(() => ({ errorMsg: err.error.email, successMsg: "" }));
    }
    form.reset();
  };

  const tuggleModal = () => setIsModalOpen(prev => !prev);

  return (
    <div className={styles.PasswordRecoveryForm__container}>
      <h2 className={styles.PasswordRecoveryForm___title}>
        Відновлення паролю
      </h2>
      <form
        onSubmit={onFormSubmit}
        className={styles.PasswordRecoveryForm___form}
      >
        <div className={styles.PasswordRecoveryForm__inputWrapper}>
          <Email setState={setUserState} initValue={userState.email} />
          {statusState.errorMsg && (
            <p className={styles.PasswordRecoveryForm__errorMsg}>
              {statusState.errorMsg}
            </p>
          )}
        </div>
        <SubmitButton disabled={isDisabled}>Відправити пароль</SubmitButton>
      </form>
      <div className={styles.PasswordRecoveryForm__nav}>
        <Link href="register">Зареєструватись</Link>
      </div>
      <Modal isOpen={isModalOpen} setIsOpen={tuggleModal}>
        <p className={styles.PasswordRecoveryForm___success_msg}>
          {statusState.successMsg}
        </p>
      </Modal>
    </div>
  );
};

export default PasswordRecoveryForm;
