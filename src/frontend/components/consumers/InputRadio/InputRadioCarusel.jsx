import styles from "./InputRadioCarusel.module.scss";

const InputRadioCarusel = ({
  tabIndex,
  setCurrentTab,
  currentTab,
  children,
}) => {
  return (
    <>
      <input
        type="radio"
        checked={currentTab === tabIndex}
        onChange={() => setCurrentTab(tabIndex)}
        className={styles.Input}
        id={tabIndex}
      />
      <label htmlFor={tabIndex} className={styles.Label}>
        {children}
      </label>
    </>
  );
};

export default InputRadioCarusel;
