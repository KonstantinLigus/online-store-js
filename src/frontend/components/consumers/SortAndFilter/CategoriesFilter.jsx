import React from "react";
import styles from "./FilterDialog.module.scss";

const CategoriesFilter = ({
  vegetables,
  setVegetables,
  fruits,
  setFruits,
  nuts,
  setNuts,
  grocery,
  setGrocery,
  conservation,
  setConservation,
  milk,
  setMilk,
}) => {
  const categories = [
    ["Овочі", "vegetables", vegetables, setVegetables],
    ["Фрукти та ягоди", "fruits", fruits, setFruits],
    ["Горіхи", "nuts", nuts, setNuts],
    ["Бакалія", "grocery", grocery, setGrocery],
    ["Консервація", "conservation", conservation, setConservation],
    ["Молоко", "milk", milk, setMilk],
  ];
  return (
    <div className={styles.checkboxes}>
      {categories.map((item, index) => (
        <div className={styles.checkbox} key={index}>
          <label htmlFor={item[1]} className={styles.checkbox__label}>
            {item[0]}
          </label>
          <input
            type="checkbox"
            name={item[1]}
            id={item[1]}
            onChange={() => item[3](!item[2])}
            className={styles.checkbox__checkbox}
          />
        </div>
      ))}
    </div>
  );
};

export default CategoriesFilter;
