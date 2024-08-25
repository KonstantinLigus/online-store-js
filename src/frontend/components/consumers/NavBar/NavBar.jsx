"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./NavBar.module.scss";
import Burger from "@/frontend/components/consumers/Burger/Burger";
import React, { useState, useRef, useEffect } from "react";
import UserBar from "@/frontend/pages/consumers/UserBar/UserBar";
import SearchDialog from "./SearchDialog/SearchDialog";

const links = [
  {
    id: 0,
    title: "Всі категорії",
    url: "/categories",
  },
  {
    id: 1,
    title: "Овочі",
    url: "/category/vegetables",
  },
  {
    id: 2,
    title: "Фрукти/Ягоди",
    url: "/category/fruits",
  },
  {
    id: 3,
    title: "Горіхи",
    url: "/category/nuts",
  },
  {
    id: 4,
    title: "Бакалія",
    url: "/category/grocery",
  },
  {
    id: 5,
    title: "Консервація",
    url: "/category/conservation",
  },
  {
    id: 6,
    title: "Молочна продукція",
    url: "/category/milk",
  },
];

export default function NavBar(props) {
  const [menuIsClicked, setMenuIsClicked] = useState(false);
  const updateMenu = () => setMenuIsClicked(!menuIsClicked);
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.header__headline}>
        <div className={styles.header__icons}>
          <div className={styles.header__burger}>
            <Burger menuIsClicked={menuIsClicked} onClick={updateMenu} />
          </div>

          <Image
            src="/assets/icon/icon-search.svg"
            width={26}
            height={26}
            alt="search"
            priority
            onClick={() => setIsSearchClicked(true)}
            className={styles.header__search}
          />
        </div>

        <Link href="/" prefetch={false} className={styles.header__logo}>
          <Image
            src="/assets/logo.svg"
            width={220}
            height={44}
            alt="logo"
            priority
            className={styles.header__logoImage}
          />
        </Link>

        <UserBar token={props.token} />
      </div>

      <nav
        className={
          menuIsClicked
            ? `${styles.navbar} ${styles.navbar__visible}`
            : `${styles.navbar} ${styles.navbar__hidden}`
        }
      >
        <ul className={styles.navbar__list}>
          {links.map(link => (
            <li key={link.id}>
              <Link
                href={link.url}
                onClick={updateMenu}
                className={styles.navbar__link}
              >
                <p className={styles.navbar__linkText}>{link.title}</p>
                <Image
                  src="/assets/icon/icon-arrow-right.svg"
                  width={24}
                  height={24}
                  alt="arrow icon"
                  priority
                  className={styles.navbar__linkImage}
                />
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {isSearchClicked && (
        <SearchDialog setIsSearchClicked={setIsSearchClicked} />
      )}
    </header>
  );
}
