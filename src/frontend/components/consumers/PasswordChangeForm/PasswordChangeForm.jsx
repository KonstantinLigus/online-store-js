"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getObject, isObjectFieldEqualsToValue } from "@/frontend/helpers";
import SubmitButton from "../SubmitButton/SubmitButton";
import styles from "./PasswordChangeForm.module.scss";
import Modal from "../Modal";
import Password from "../Fields/Password";
import { getUserAction } from "@/backend/entities/users/entry-points";
import { useRouter } from "next/navigation";

const status = ["successMsg", "errorMsg"];
// chooseInitFields = firstField =>
//   (firstField === "oldPassword" && [
//     "oldPassword", "newPassword", "repeatNewPassword",
//   ]) ||
//   (firstField === "tempPassword" && ["oldPassword"]) ||
//   (firstField === "none" && ["newPassword", "repeatNewPassword"]);

const userFields = ["oldPassword", "newPassword", "repeatNewPassword"];

const PasswordChangeForm = ({ oldPassw = "", emailForSendTempPassw }) => {
  // const userFields = chooseInitFields(firstField);
  const [statusState, setStatusState] = useState(() => getObject(status));
  const [userState, setUserState] = useState(() => getObject(userFields));
  const [isDisabled, setIsDisabled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pswdErrMesg, setPswdErrMesg] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const user = await getUserAction();
      if (!user) return router.push("/login");
      setUserState(prevState => ({ ...prevState, email: user.email }));
    };
    if (!oldPassw) getUser();
    if (oldPassw)
      setUserState(prevSate => ({
        ...prevSate,
        oldPassword: oldPassw,
        email: emailForSendTempPassw,
      }));
  }, [emailForSendTempPassw, oldPassw, router]);

  useEffect(() => {
    if (userState.newPassword !== userState.repeatNewPassword) {
      setIsDisabled(true);
      setPswdErrMesg(true);
      return;
    } else {
      setPswdErrMesg(false);
    }

    if (isObjectFieldEqualsToValue(userState, "")) {
      setIsDisabled(true);
      return;
    }

    setIsDisabled(false);
  }, [userState]);

  const onFormSubmit = async e => {
    const form = e.currentTarget;
    e.preventDefault();
    delete userState.repeatNewPassword;
    try {
      const res = await fetch("/api/auth/password/change ", {
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
      if (oldPassw) router.push("/login");
    } catch (err) {
      setStatusState(() => ({ errorMsg: err.error.password, successMsg: "" }));
    }
    form.reset();
  };

  const tuggleModal = () => setIsModalOpen(prev => !prev);

  return (
    <div className={styles.PasswordChangeForm__container}>
      <h2 className={styles.PasswordChangeForm___title}>
        {oldPassw ? "Створення нового паролю" : "Зміна паролю"}
      </h2>
      <form
        onSubmit={onFormSubmit}
        className={styles.PasswordChangeForm___form}
      >
        <div className={styles.PasswordChangeForm__inputWrapper}>
          {!oldPassw && <Password setState={setUserState} name="oldPassword" />}
          {!oldPassw && statusState.errorMsg && (
            <p className={styles.PasswordChangeForm__errorMsg}>
              {statusState.errorMsg}
            </p>
          )}
          <Password setState={setUserState} name="newPassword" />
          {statusState.errorMsg && (
            <p className={styles.PasswordChangeForm__errorMsg}>
              {statusState.errorMsg}
            </p>
          )}
          <Password setState={setUserState} name="repeatNewPassword" />
          {statusState.errorMsg && (
            <p className={styles.PasswordChangeForm__errorMsg}>
              {statusState.errorMsg}
            </p>
          )}
          {pswdErrMesg && (
            <p className={styles.PasswordChangeForm__errorMsg}>
              Паролі не співпадають
            </p>
          )}
        </div>
        <SubmitButton disabled={isDisabled}>Відправити пароль</SubmitButton>
      </form>
      <div className={styles.PasswordChangeForm__nav}>
        <Link href="/register"> Зареєструватись</Link>
      </div>
      {!oldPassw && (
        <Modal isOpen={isModalOpen} setIsOpen={tuggleModal}>
          <p className={styles.PasswordChangeForm___success_msg}>
            {statusState.successMsg}
          </p>
        </Modal>
      )}
    </div>
  );
};

export default PasswordChangeForm;
