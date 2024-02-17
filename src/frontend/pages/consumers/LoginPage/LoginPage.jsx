"use client";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import Email from "@/frontend/components/consumers/Fields/Email";
import Password from "@/frontend/components/consumers/Fields/Password";
import SubmitButton from "@/frontend/components/consumers/SubmitButton/SubmitButton";
import Button from "@/frontend/components/consumers/Button/Button";
import { signInAction } from "@/backend/entities/users/entry-points";
import { getObject } from "@/frontend/helpers";
import styles from "./LoginPage.module.scss";
import GoogleSignInButton from "@/frontend/components/consumers/GoogleSignInButton";

const userFields = ["password", "email"];

const LoginPage = () => {
  const [state, formAction] = useFormState(signInAction, null);

  const [userState, setUserState] = useState(() => getObject(userFields));
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    for (const field of Object.values(userState)) {
      if (field === "") {
        setIsDisabled(true);
        return;
      }
    }

    setIsDisabled(false);
  }, [userState]);

  const signInWithGoogleClickHandle = () => {
    signIn("google", { callbackUrl: "/account" });
  };

  return (
    <div className={styles.LoginForm__container}>
      <h2 className={styles.LoginForm___title}>Вхід особистого кабінету</h2>
      <form action={formAction} className={styles.RegisterForm__form}>
        <fieldset className={styles.LoginForm__fieldset}>
          <Email setState={setUserState} />
          {state?.email && (
            <p className={styles.LoginForm__errorMsg}>{state?.email}</p>
          )}
        </fieldset>
        <fieldset className={styles.LoginForm__fieldset}>
          <Password name="password" setState={setUserState} />
          {state?.password && (
            <p className={styles.LoginForm__errorMsg}>{state?.password}</p>
          )}
        </fieldset>
        <SubmitButton disabled={isDisabled}>Увійти</SubmitButton>
      </form>
      <div className={styles.LoginForm__nav}>
        <Link href="/">Забули пароль?</Link>
        <Link href="register">Зареєструватись</Link>
      </div>
      <p className={styles.LoginForm__alternateAuth}>
        Також можна увійти через:
      </p>
      <GoogleSignInButton onClick={signInWithGoogleClickHandle} />
    </div>
  );
};
export default LoginPage;
