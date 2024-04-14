import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Email from "../Fields/Email";
import Password from "../Fields/Password";
import SubmitButton from "../SubmitButton/SubmitButton";
import GoogleSignInButton from "../GoogleSignInButton";
import { signInAction } from "@/backend/entities/users/entry-points";
import { getObject, isObjectFieldEqualsToValue } from "@/frontend/helpers";
import styles from "./LoginForm.module.scss";

const userFields = ["password", "email"];

const LoginForm = ({ callbackUrl }) => {
  const [state, formAction] = useFormState(signInAction, null);

  const [userState, setUserState] = useState(() => getObject(userFields));
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (isObjectFieldEqualsToValue(userState, "")) {
      setIsDisabled(true);
      return;
    }

    setIsDisabled(false);
  }, [userState]);

  const signInWithGoogleClickHandle = () => {
    signIn("google", { callbackUrl });
  };

  return (
    <div className={styles.LoginForm__container}>
      <h2 className={styles.LoginForm___title}>Вхід особистого кабінету</h2>
      <form action={formAction} className={styles.LoginForm___form}>
        <div className={styles.LoginForm__inputWrapper}>
          <Email setState={setUserState} />
          {state?.email && (
            <p className={styles.LoginForm__errorMsg}>{state?.email}</p>
          )}
        </div>
        <div className={styles.LoginForm__inputWrapper}>
          <Password name="password" setState={setUserState} />
          {state?.password && (
            <p className={styles.LoginForm__errorMsg}>{state?.password}</p>
          )}
        </div>
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
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

export default LoginForm;
