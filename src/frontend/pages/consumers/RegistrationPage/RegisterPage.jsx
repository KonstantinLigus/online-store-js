"use client";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import SubmitButton from "@/frontend/components/consumers/SubmitButton/SubmitButton";
import Name from "@/frontend/components/consumers/Fields/Name";
import Phone from "@/frontend/components/consumers/Fields/Phone";
import Email from "@/frontend/components/consumers/Fields/Email";
import Password from "@/frontend/components/consumers/Fields/Password";
import { signUpAction } from "@/backend/entities/users/entry-points";
import { getObject, isObjectFieldEqualsToValue } from "@/frontend/helpers";
import styles from "./RegisterPage.module.scss";

const userFields = [
  "firstName",
  "surname",
  "password",
  "passwordRepeat",
  "email",
  "customerPhone",
];

const RegistrationPage = () => {
  const [state, formAction] = useFormState(signUpAction, null);

  const [userState, setUserState] = useState(() => getObject(userFields));
  const [isDisabled, setIsDisabled] = useState(true);
  const [pswdErrMesg, setPswdErrMesg] = useState(false);

  useEffect(() => {
    if (userState.password !== userState.passwordRepeat) {
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

  return (
    <div className={styles.RegisterForm__container}>
      <h2 className={styles.RegisterForm__title}>Реєстрація</h2>
      <form action={formAction} className={styles.RegisterForm__form}>
        <div className={styles.RegisterForm__inputWrapper}>
          <Name name="firstName" setState={setUserState} />
          {state?.firstName && (
            <p className={styles.RegisterForm__errorMsg}>{state?.firstName}</p>
          )}
        </div>
        <div className={styles.RegisterForm__inputWrapper}>
          <Name name="surname" setState={setUserState} />
          {state?.surname && (
            <p className={styles.RegisterForm__errorMsg}>{state?.surname}</p>
          )}
        </div>
        <div className={styles.RegisterForm__inputWrapper}>
          <Phone setState={setUserState} />
          {state?.customerPhone && (
            <p className={styles.RegisterForm__errorMsg}>
              {state?.customerPhone}
            </p>
          )}
        </div>
        <div className={styles.RegisterForm__inputWrapper}>
          <Email setState={setUserState} />
          {state?.email && (
            <p className={styles.RegisterForm__errorMsg}>{state?.email}</p>
          )}
        </div>
        <div className={styles.RegisterForm__inputWrapper}>
          <Password name="password" setState={setUserState} />
          {state?.password && (
            <p className={styles.RegisterForm__errorMsg}>{state?.password}</p>
          )}
        </div>
        <div className={styles.RegisterForm__inputWrapper}>
          <Password name="passwordRepeat" setState={setUserState} />
          {state?.passwordRepeat && (
            <p className={styles.RegisterForm__errorMsg}>
              {state?.passwordRepeat}
            </p>
          )}
          {pswdErrMesg && (
            <p className={styles.RegisterForm__errorMsg}>
              Паролі не співпадають
            </p>
          )}
        </div>
        <SubmitButton disabled={isDisabled}>Зареєструватись</SubmitButton>
      </form>
    </div>
  );
};
export default RegistrationPage;
