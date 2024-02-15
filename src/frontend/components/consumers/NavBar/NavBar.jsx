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
      <div className={styles.headerContainer}>
        <div className={styles.headerItems}>
          <div style={{ display: "flex" }}>
            <div className={styles.burgerContainer}>
              <Burger menuIsClicked={menuIsClicked} onClick={updateMenu} />
            </div>
            <Image
              src="/assets/icon/icon-search.svg"
              width={18}
              height={18}
              alt="user icon"
              priority
              onClick={() => setIsSearchClicked(true)}
            />
          </div>

          <Link href="/" prefetch={false} className={styles.logo}>
            <span>Logo</span>
          </Link>
          <UserBar token={props.token} />
        </div>
      </div>

      <nav
        className={
          menuIsClicked
            ? `${styles.navigation} ${styles.visible}`
            : `${styles.navigation} ${styles.hidden}`
        }
      >
        <ul className={styles.list}>
          {links.map(link => (
            <Link key={link.id} href={link.url} onClick={updateMenu}>
              <li className={styles.item}>
                {link.title}
                <Image
                  src="/assets/icon/icon-arrow-right.svg"
                  width={24}
                  height={24}
                  alt="arrow icon"
                  priority
                />
              </li>
            </Link>
          ))}
        </ul>
      </nav>

      {isSearchClicked && (
        <SearchDialog setIsSearchClicked={setIsSearchClicked} />
      )}
    </header>
  );
}
