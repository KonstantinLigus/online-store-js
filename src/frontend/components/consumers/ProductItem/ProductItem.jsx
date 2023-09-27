import React from 'react';
import styles from "./ProductItem.module.scss";
import Image from "next/image";

const ProductItem = ({title, description, price, mainImage}) => {
    return (
        <li className={styles.item}>
            <Image className={styles.cardImage}
                src={mainImage}
                alt={title}
                width={200}
                height={200}
                priority
            />
            <div className={styles.information}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.price}>{price}</p>
            </div>
            <button className={styles.button}>До кошика</button>
        </li>
    );
};

export default ProductItem;