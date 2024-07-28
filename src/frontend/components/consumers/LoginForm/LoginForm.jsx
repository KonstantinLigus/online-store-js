import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Email from "../Fields/Email";
import Password from "../Fields/Password";
import SubmitButton from "../SubmitButton/SubmitButton";
import GoogleSignInButton from "../GoogleSignInButton";
import { getObject, isObjectFieldEqualsToValue } from "@/frontend/helpers";
import styles from "./LoginForm.module.scss";
import { useRouter } from "next/navigation";

const userFields = ["password", "email"];

const LoginForm = ({ callbackUrl }) => {
  const [state, setState] = useState(null);

  const [userState, setUserState] = useState(() => getObject(userFields));
  const [isDisabled, setIsDisabled] = useState(true);

  const router = useRouter();
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

  const onFormSubmit = async e => {
    e.preventDefault();
    Object.assign(userState, { callbackUrl });
    try {
      const res = await fetch("api/auth/signIn", {
        method: "POST",
        body: JSON.stringify(userState),
      });
      const data = await res.json();
      if (data.status !== 200) {
        const err = new Error();
        err.error = data.error;
        throw err;
      }
      router.push(callbackUrl);
      router.refresh();
      e.currentTarget.reset();
    } catch (err) {
      setState(() => err.error);
    }
  };

  return (
    <div className={styles.LoginForm__container}>
      <h2 className={styles.LoginForm___title}>Вхід особистого кабінету</h2>
      <form onSubmit={onFormSubmit} className={styles.LoginForm___form}>
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
        <Link href="/password/recovery">Забули пароль?</Link>
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
