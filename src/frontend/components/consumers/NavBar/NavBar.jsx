"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./NavBar.module.scss";
import userIcon from "@/../public/assets/icon/user-icon.svg";
import cartIcon from "@/../public/assets/icon/cart-icon.svg";
import Burger from "@/frontend/components/consumers/Burger/Burger";
import { useState } from "react";
import burgerStyles from "../Burger/Burger.module.scss";
import arrow from "@/../public/arrow-right.svg";

const links = [
  {
    id: 0,
    title: "Овочі",
    url: "/vegetables",
  },
  {
    id: 1,
    title: "Фрукти/Ягоди",
    url: "/fruits",
  },
  {
    id: 2,
    title: "Горіхи",
    url: "/nuts",
  },
  {
    id: 3,
    title: "Бакалія",
    url: "/grocery",
  },
  {
    id: 4,
    title: "Консервація",
    url: "/conservation",
  },
  {
    id: 5,
    title: "Молочна продукція",
    url: "/milk",
  },
  {
    id: 6,
    title: "Home",
    url: "/",
  },
  {
    id: 7,
    title: "Products",
    url: "/product",
  },
  {
    id: 8,
    title: "Admin page",
    url: "/admin",
  },
];
export default function NavBar() {
  const [burgerClass, setBurgerClass] = useState(
    `${burgerStyles.burger} ${burgerStyles.unClicked}`,
  );
  const [menuClass, setMenuClass] = useState(
    `${styles.navigation} ${styles.hidden}`,
  );
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurgerClass(`${burgerStyles.burger} ${burgerStyles.clicked}`);
      setMenuClass(`${styles.navigation} ${styles.visible}`);
    } else {
      setBurgerClass(`${burgerStyles.burger} ${burgerStyles.unClicked}`);
      setMenuClass(`${styles.navigation} ${styles.hidden}`);
    }
    setIsMenuClicked(!isMenuClicked);
  };
  return (
    <header className={styles.navBar}>
      <div className={styles.content}>
        <Burger className={burgerClass} onClick={updateMenu} />
        <nav className={menuClass}>
          <ul className={styles.list}>
            {links.map(link => (
              <Link key={link.id} href={link.url} onClick={updateMenu}>
                <li className={styles.item}>
                  {link.title}
                  <Image src={arrow} alt="arrow-icon" width={24} priority />
                </li>
              </Link>
            ))}
          </ul>
        </nav>

        <Link href="/">
          <h1 className={styles.logo}>Logo</h1>
        </Link>
        <div>
          <Image
            src={userIcon}
            width={24}
            height={24}
            alt="user icon"
            priority
          />
          <Image
            src={cartIcon}
            width={24}
            height={24}
            alt="cart icon"
            priority
          />
        </div>
      </div>
    </header>
  );
}
