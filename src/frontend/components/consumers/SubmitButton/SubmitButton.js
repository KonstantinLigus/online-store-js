"use client";

import styles from "./submitButton.module.scss";

export function SubmitButton({ children, disabled }) {
  return (
    <button type="submit" className={styles.submitBtn} disabled={disabled}>
      {children}
    </button>
  );
}
