"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./NavBar.module.scss";
import Burger from "@/frontend/components/consumers/Burger/Burger";
import { useState } from "react";
import burgerStyles from "../Burger/Burger.module.scss";

const links = [
  {
    id: 0,
    title: "Овочі",
    url: "/category/vegetables",
  },
  {
    id: 1,
    title: "Фрукти/Ягоди",
    url: "/category/fruits",
  },
  {
    id: 2,
    title: "Горіхи",
    url: "/category/nuts",
  },
  {
    id: 3,
    title: "Бакалія",
    url: "/category/grocery",
  },
  {
    id: 4,
    title: "Консервація",
    url: "/category/conservation",
  },
  {
    id: 5,
    title: "Молочна продукція",
    url: "/category/milk",
  },
  {
    id: 6,
    title: "Home",
    url: "/",
  },
  {
    id: 7,
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

  const [isSearchClicked, setIsSearchClicked] = useState(false);

  const searching = e => {
    e.preventDefault();
    setIsSearchClicked(false);
  };

  return (
    <header className={styles.navBar}>
      <div className={styles.content}>
        <div style={{ display: "flex" }}>
          <Burger className={burgerClass} onClick={updateMenu} />
          <nav className={menuClass}>
            <ul className={styles.list}>
              {links.map(link => (
                <Link key={link.id} href={link.url} onClick={updateMenu}>
                  <li className={styles.item}>
                    {link.title}
                    <Image
                      src="/arrow-right.svg"
                      alt="arrow-icon"
                      width={24}
                      height={24}
                      priority
                    />
                  </li>
                </Link>
              ))}
            </ul>
          </nav>
          <Image
            src="/assets/icon/search-icon.svg"
            width={18}
            height={18}
            alt="user icon"
            priority
            onClick={() => setIsSearchClicked(!isSearchClicked)}
            style={{ marginLeft: "1rem" }}
          />
          <form
            action="GET"
            onSubmit={searching}
            className={styles.search}
            style={isSearchClicked ? { display: "flex" } : { display: "none" }}
          >
            <input type="text" placeholder="Пошук..." />
            <input type="submit" value="Шукати" />
          </form>
        </div>

        <Link href="/" prefetch={false}>
          <h1 className={styles.logo}>Logo</h1>
        </Link>

        <div>
          <Link href="login">
            <Image
              src="/assets/icon/user-icon.svg"
              width={24}
              height={24}
              alt="user icon"
              priority
            />
          </Link>
          <Link href="/cart">
            <Image
              src="/assets/icon/cart-icon.svg"
              width={24}
              height={24}
              alt="cart icon"
              priority
              style={{ marginLeft: "1rem" }}
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
