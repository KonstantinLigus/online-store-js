"use client";

import { useEffect, useState } from "react";
import { getObject, isObjectFieldEqualsToValue } from "@/frontend/helpers";
import SubmitButton from "../SubmitButton/SubmitButton";
import styles from "./PasswordChangeForm.module.scss";
import Modal from "../Modal";
import Password from "../Fields/Password";
import { getUserAction } from "@/backend/entities/users/entry-points";
import { useRouter } from "next/navigation";

const status = ["successMsg", "errorMsg"];
const userFields = ["oldPassword", "newPassword", "repeatNewPassword"];

const PasswordChangeForm = () => {
  // const userFields = chooseInitFields(firstField);
  const [statusState, setStatusState] = useState(() => getObject(status));
  const [userState, setUserState] = useState(() => getObject(userFields));
  const [isDisabled, setIsDisabled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPswdErrMesg, setIsPswdErrMesg] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const user = await getUserAction();
      if (!user) return router.push("/login");
      setUserState(prevState => ({ ...prevState, email: user.email }));
    };
    const timeOutId = setTimeout(getUser, process.env.TOKEN_LIFE_TIME + 1);
    getUser();
    return () => clearTimeout(timeOutId);
  }, [router]);

  useEffect(() => {
    if (userState.newPassword !== userState.repeatNewPassword) {
      setIsDisabled(true);
      setIsPswdErrMesg(true);
      return;
    } else if (userState.newPassword === userState.repeatNewPassword) {
      setIsDisabled(false);
      setIsPswdErrMesg(false);
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
      setIsModalOpen(prev => !prev);
    } catch (err) {
      setStatusState(() => ({ errorMsg: err.error.password, successMsg: "" }));
    }
  };

  const tuggleModal = () => setIsModalOpen(prev => !prev);

  return (
    <div className={styles.PasswordChangeForm__container}>
      <h2 className={styles.PasswordChangeForm___title}>Зміна паролю</h2>
      <form
        onSubmit={onFormSubmit}
        className={styles.PasswordChangeForm___form}
      >
        <div className={styles.PasswordChangeForm__inputWrapper}>
          <div>
            <Password setState={setUserState} name="oldPassword" />
            {statusState.errorMsg && (
              <p className={styles.PasswordChangeForm__errorMsg}>
                {statusState.errorMsg}
              </p>
            )}
          </div>
          <div>
            <Password setState={setUserState} name="newPassword" />
          </div>
          <div>
            <div>
              <Password setState={setUserState} name="repeatNewPassword" />
            </div>
            {isPswdErrMesg && (
              <p className={styles.PasswordChangeForm__errorMsg}>
                Паролі не співпадають
              </p>
            )}
          </div>
        </div>
        <SubmitButton disabled={isDisabled}>Відправити пароль</SubmitButton>
      </form>

      <Modal isOpen={isModalOpen} setIsOpen={tuggleModal}>
        <p className={styles.PasswordChangeForm___success_msg}>
          {statusState.successMsg}
        </p>
      </Modal>
    </div>
  );
};

export default PasswordChangeForm;
