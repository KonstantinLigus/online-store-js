import React from 'react';
import Image from "next/image";
import styles from './Banner.module.scss';

const Banner = () => {
    return (
        <section className={styles.banner}>
            <div className={styles.wrapper}>
                <Image 
                    src='assets/banner.svg' 
                    width={300} height={200} 
                    alt='banner' 
                    priority 
                    className={styles.image}
                />
                <div className={styles.information}>
                    <h1 className={styles.bannerTitle}>Звільнімо Смак з Натуральними Продуктами!</h1>
                    <button className={styles.button}>Замовити</button>
                </div>
            </div>
        </section>
    );
};

export default Banner;