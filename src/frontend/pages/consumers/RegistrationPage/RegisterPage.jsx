"use client";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/frontend/components/consumers/SubmitButton/SubmitButton";
import styles from "./RegisterPage.module.scss";
import { signUpAction } from "@/backend/entities/users/entry-points";
import Name from "@/frontend/components/consumers/Fields/Name";
import Phone from "@/frontend/components/consumers/Fields/Phone";
import Email from "@/frontend/components/consumers/Fields/Email";
import Password from "@/frontend/components/consumers/Fields/Password";
import { getObject } from "@/frontend/helpers";

const userFields = [
  "firstName",
  "secondName",
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

    for (const field of Object.values(userState)) {
      if (field === "") {
        setIsDisabled(true);
        return;
      }
    }

    setIsDisabled(false);
  }, [userState]);

  return (
    <div className={styles.RegisterForm__container}>
      <h2 className={styles.RegisterForm__title}>Реєстрація</h2>
      <form action={formAction} className={styles.RegisterForm__form}>
        <fieldset className={styles.RegisterForm__fieldset}>
          <Name name="firstName" setState={setUserState} />
          {state?.firstName && (
            <p className={styles.RegisterForm__errorMsg}>{state?.firstName}</p>
          )}
        </fieldset>
        <fieldset className={styles.RegisterForm__fieldset}>
          <Name name="secondName" setState={setUserState} />
          {state?.secondName && (
            <p className={styles.RegisterForm__errorMsg}>{state?.secondName}</p>
          )}
        </fieldset>
        <fieldset className={styles.RegisterForm__fieldset}>
          <Name name="surname" setState={setUserState} />
          {state?.surname && (
            <p className={styles.RegisterForm__errorMsg}>{state?.surname}</p>
          )}
        </fieldset>
        <fieldset className={styles.RegisterForm__fieldset}>
          <Phone setState={setUserState} />
          {state?.customerPhone && (
            <p className={styles.RegisterForm__errorMsg}>
              {state?.customerPhone}
            </p>
          )}
        </fieldset>
        <fieldset className={styles.RegisterForm__fieldset}>
          <Email setState={setUserState} />
          {state?.email && (
            <p className={styles.RegisterForm__errorMsg}>{state?.email}</p>
          )}
        </fieldset>
        <fieldset className={styles.RegisterForm__fieldset}>
          <Password name="password" setState={setUserState} />
          {state?.password && (
            <p className={styles.RegisterForm__errorMsg}>{state?.password}</p>
          )}
        </fieldset>
        <fieldset className={styles.RegisterForm__fieldset}>
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
        </fieldset>
        <SubmitButton disabled={isDisabled}>Зареєструватись</SubmitButton>
      </form>
    </div>
  );
};
export default RegistrationPage;
