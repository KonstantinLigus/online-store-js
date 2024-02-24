import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";
import { useEffect } from "react";

const Modal = ({ children, isOpen, setIsOpen }) => {
  useEffect(() => {
    isOpen && (document.body.style.overflow = "hidden");
    return () => !isOpen && (document.body.style.overflow = "unset");
  }, [isOpen]);

  const onCloseClick = () => {
    setIsOpen();
    document.body.style.overflow = "unset";
  };

  const chooseModal = () => {
    if (!setIsOpen)
      return <div className={styles.Modal__container}>{children}</div>;

    if (setIsOpen)
      return (
        <div className={styles.Modal__container}>
          <div className={styles.Modal__window}>
            <svg className={styles.Modal__closeIcon} onClick={onCloseClick}>
              <use href="assets/icon/icon-close.svg#close" />
            </svg>
            {children}
          </div>
        </div>
      );
  };

  return (
    <>
      {isOpen
        ? createPortal(chooseModal(), document.getElementById("modal-root"))
        : null}
    </>
  );
};

export default Modal;
