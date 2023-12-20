"use client";

import { useFormState } from "react-dom";
import { SubmitButton } from "@/frontend/components/consumers/SubmitButton/SubmitButton";
import "./register.scss";
import { signUp } from "@/backend/server-actions/user/signUp-action";

const IdentificationPage = () => {
  const [state, formAction] = useFormState(signUp, null);
  return (
    <div className="container">
      <h2>Реєстрація</h2>
      <form action={formAction}>
        <input placeholder="Ваше ім’я*" type="text" name="name" />
        <p>{state?.name}</p>
        <input placeholder="Ваше прізвище*" type="text" name="surname" />
        <p>{state?.surname}</p>
        <input placeholder="Телефон*" type="tel" name="phone" />
        <p>{state?.phone}</p>
        <input placeholder="E-mail*" type="email" name="email" />
        <p>{state?.email}</p>
        <p>{state?.message}</p>
        <input placeholder="Пароль*" type="password" name="password" />
        <p>{state?.password}</p>
        <input placeholder="Повторити пароль*" type="password" />
        <p>{state?.password}</p>
        <SubmitButton name="Зареєструватись" />
      </form>
    </div>
  );
};
export default IdentificationPage;
