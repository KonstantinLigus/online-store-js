"use client";

import Modal from "@/frontend/components/consumers/Modal";
import Loader from "@/frontend/components/consumers/Loader";
import { useFormStatus } from "react-dom";
import styles from "./submitButton.module.scss";

export default function SubmitButton({ children, disabled, onClick }) {
  const { pending } = useFormStatus();

  return (
    <>
      <button
        type="submit"
        className={styles.submitBtn}
        disabled={disabled || pending}
        onClick={onClick}
      >
        {children}
      </button>
      <Modal isOpen={pending}>
        <Loader />
      </Modal>
    </>
  );
}
