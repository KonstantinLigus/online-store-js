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
      let isOldPaswdAndNewPaswdDifferent =
        oldPassword !== newPassword ? true : null;
      if (oldPassword === undefined && newPassword === undefined)
        isOldPaswdAndNewPaswdDifferent = false;
      setDataWasChangedAction(isOldPaswdAndNewPaswdDifferent);
    };

    const newPaswdRepeatAction = () => {
      let isNewPaswdAndRepeatNewPaswdSame =
        newPassword === newPasswordRepeat ? true : null;
      if (newPassword === undefined && newPasswordRepeat === undefined)
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
