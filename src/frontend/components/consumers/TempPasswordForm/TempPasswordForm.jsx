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
const userFields = ["oldPassword", "newPassword", "repeatNewPassword"];

const PasswordChangeForm = (
  {
    // isOldPasswPresent = true,
    // isOldPasswAsTemp = false,
    // firstField = "oldPassword",
  },
) => {
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
    getUser();
  }, [router]);

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
    } catch (err) {
      setStatusState(() => ({ errorMsg: err.error.password, successMsg: "" }));
    }
    form.reset();
  };

  const tuggleModal = () => setIsModalOpen(prev => !prev);

  return (
    <div className={styles.PasswordChangeForm__container}>
      <form
        onSubmit={onFormSubmit}
        className={styles.PasswordChangeForm___form}
      >
        <div className={styles.PasswordChangeForm__inputWrapper}>
          <Password setState={setUserState} name="tempPassword" />
          {statusState.errorMsg && (
            <p className={styles.PasswordChangeForm__errorMsg}>
              {statusState.errorMsg}
            </p>
          )}
        </div>
        <SubmitButton disabled={isDisabled}>Відправити пароль</SubmitButton>
      </form>
      <div className={styles.PasswordChangeForm__nav}>
        <Link href="register">Зареєструватись</Link>
      </div>
      <Modal isOpen={isModalOpen} setIsOpen={tuggleModal}>
        <p className={styles.PasswordChangeForm___success_msg}>
          {statusState.successMsg}
        </p>
      </Modal>
    </div>
  );
};

export default PasswordChangeForm;
