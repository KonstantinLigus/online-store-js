"use client";
import styles from "./Field.module.scss";

const ConsumerAddress = ({ consumer, setConsumer }) => {
  const handleStreet = e => {
    setConsumer(prev => ({
      ...prev,
      street: e.target.value,
      house: "",
      flat: "",
    }));
  };

  const handleHouse = e => {
    setConsumer(prev => ({
      ...prev,
      house: e.target.value,
      flat: "",
    }));
  };

  const handleFlat = e => {
    setConsumer(prev => ({
      ...prev,
      flat: e.target.value,
    }));
  };

  return (
    <>
      <label htmlFor="street" className={styles.labelText}>
        Вулиця:&nbsp;
        {/* <span
          className={styles.invalidData}
          style={streetIsValid ? { display: "none" } : { display: "initial" }}
        >
          Вкажіть вулицю
        </span> */}
      </label>
      <input
        type="text"
        name="street"
        id="street"
        className={styles.inputText}
        defaultValue={consumer.street}
        onChange={handleStreet}
      />

      <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
        <div>
          <label htmlFor="house" className={styles.labelText}>
            Будинок:&nbsp;
            {/* <span
              className={styles.invalidData}
              style={
                houseIsValid ? { display: "none" } : { display: "initial" }
              }
            >
              Вкажіть № будинку
            </span> */}
          </label>
          <input
            type="text"
            name="house"
            id="house"
            className={styles.inputText}
            defaultValue={consumer.house}
            onChange={handleHouse}
          />
        </div>

        <div>
          <label htmlFor="flat" className={styles.labelText}>
            Квартира:
          </label>
          <input
            type="text"
            name="flat"
            id="flat"
            className={styles.inputText}
            defaultValue={consumer.flat}
            onChange={handleFlat}
          />
        </div>
      </div>
    </>
  );
};

export default ConsumerAddress;
