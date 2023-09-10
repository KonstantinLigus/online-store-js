import React from 'react';
import Image from "next/image";
import styles from './Banner.module.scss';

const Banner = () => {
    return (
        <div className={styles.banner}>
            <Image src='assets/banner.svg' width={695} height={464} alt='banner' priority/>
            <div className={styles.information}>
                <h1 className={styles.bannerTitle}>
                    Fresh & Healthy Organic Food
                </h1>
                <p className={styles.bannerDescription}>
                    Free shipping on all your order. we deliver, you enjoy
                </p>
                <button className={styles.button}>Shop now</button>
            </div>
        </div>
    );
};

export default Banner;