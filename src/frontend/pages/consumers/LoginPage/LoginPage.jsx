"use client";

import { signIn } from "next-auth/react";
import { useFormState } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import styles from "./LoginPage.module.scss";
import { signInAction } from "@/backend/entities/users/entry-points";

const LoginPage = () => {
  const [state, formAction] = useFormState(signInAction, null);

  const signInWithGoogleClickHandle = () => {
    signIn("google", { callbackUrl: "/account" });
  };

  return (
    <div className={styles.container}>
      <h2>Вхід особистого кабінету</h2>
      <form action={formAction}>
        <label>
          Email:
          <input placeholder="name@gmail.com" type="email" name="email" />
        </label>
        <p>{state?.email}</p>
        <label>
          Пароль:
          <input placeholder="*********" type="password" name="password" />
        </label>
        <p>{state?.password}</p>
        <button type="submit">Увійти</button>
      </form>
      <div className={styles.nav_form}>
        <Link href="/">Забули пароль?</Link>
        <Link href="register">Зареєструватись</Link>
      </div>
      <label className={styles.google_auth}>
        Також можна увійти через:
        <button onClick={signInWithGoogleClickHandle}>
          <Image
            alt="logo-img"
            src="/assets/icon/icon-google.svg"
            width={24}
            height={24}
          ></Image>
          Google
        </button>
      </label>
    </div>
  );
};
export default LoginPage;
