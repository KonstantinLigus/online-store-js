import React from "react";
import styles from "./FilterDialog.module.scss";

const ProducersFilter = ({
  producers,
  selectedProducers,
  setSelectedProducers,
}) => {
  const handleProducer = value => {
    selectedProducers.includes(value)
      ? setSelectedProducers(selectedProducers.filter(i => i !== value))
      : setSelectedProducers(selectedProducers.concat(value));
  };
  return (
    <div className={styles.checkboxes}>
      {producers.map((item, index) => (
        <div className={styles.checkbox} key={index}>
          <label htmlFor={item.id} className={styles.checkbox__label}>
            {item.producer}
          </label>
          <input
            type="checkbox"
            name={item.id}
            id={item.id}
            onChange={() => handleProducer(item.producer)}
            className={styles.checkbox__checkbox}
          />
        </div>
      ))}
    </div>
  );
};

export default ProducersFilter;
