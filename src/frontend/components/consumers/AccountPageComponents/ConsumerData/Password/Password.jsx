"use client";
import { useEffect } from "react";
import styles from "../ConsumerData.module.scss";

const OldPassword = ({
  placeholder,
  consumerData,
  setConsumerData,
  setDataWasChanged,
  paswdType,
}) => {
  const { oldPassword, newPassword, newPasswordRepeat } = consumerData;

  useEffect(() => {
    const setDataWasChangedAction = value =>
      setDataWasChanged(prevState => ({
        ...prevState,
        [paswdType]: value,
      }));
    const newPaswdAction = () => {
      let isOldPaswdAndNewPaswdDifferent = oldPassword !== newPassword;
      if (oldPassword === "" && newPassword === "")
        isOldPaswdAndNewPaswdDifferent = false;
      setDataWasChangedAction(isOldPaswdAndNewPaswdDifferent);
    };

    const newPaswdRepeatAction = () => {
      let isNewPaswdAndRepeatNewPaswdSame = newPassword === newPasswordRepeat;
      if (newPassword === "" && newPasswordRepeat === "")
        isNewPaswdAndRepeatNewPaswdSame = false;
      setDataWasChangedAction(isNewPaswdAndRepeatNewPaswdSame);
    };
    if (paswdType === "newPassword") newPaswdAction();
    if (paswdType === "newPasswordRepeat") newPaswdRepeatAction();
  }, [
    newPassword,
    newPasswordRepeat,
    oldPassword,
    paswdType,
    setDataWasChanged,
  ]);

  const onInputChangeHandler = e => {
    const { value } = e.target;
    setConsumerData(prevState => ({ ...prevState, [paswdType]: value }));
  };
  return (
    <>
      <input
        type="text"
        placeholder={placeholder}
        className={styles.inputText}
        onChange={onInputChangeHandler}
      />
    </>
  );
};

export default OldPassword;
