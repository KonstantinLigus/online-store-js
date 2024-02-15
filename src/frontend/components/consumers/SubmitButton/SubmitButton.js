"use client";

import { useFormStatus } from "react-dom";
import styles from "./submitButton.module.scss";

export function SubmitButton({ name, disabled }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className={styles.submitBtn}
      disabled={disabled}
    >
      {name}
    </button>
  );
}
