"use client";

import { useFormState } from "react-dom";
import { SubmitButton } from "@/frontend/components/consumers/SubmitButton/SubmitButton";
import "./register.scss";
import { signUpAction } from "@/backend/entities/users/entry-points";

const IdentificationPage = () => {
  const [state, formAction] = useFormState(signUpAction, null);
  return (
    <div className="container">
      <h2>Реєстрація</h2>
      <form action={formAction}>
        <input placeholder="Ваше ім’я*" type="text" name="firstName" />
        <p>{state?.firstName}</p>
        <input placeholder="По-батькові*" type="text" name="secondName" />
        <p>{state?.secondName}</p>
        <input placeholder="Ваше прізвище*" type="text" name="surname" />
        <p>{state?.surname}</p>
        <input placeholder="Телефон*" type="tel" name="customerPhone" />
        <p>{state?.customerPhone}</p>
        <input placeholder="E-mail*" type="email" name="email" />
        <p>{state?.email}</p>
        <input placeholder="Пароль*" type="password" name="password" />
        <p>{state?.password}</p>
        <input
          placeholder="Повторити пароль*"
          type="password"
          name="passwordRepeat"
        />
        <p>{state?.password}</p>
        <SubmitButton name="Зареєструватись" />
      </form>
    </div>
  );
};
export default IdentificationPage;
