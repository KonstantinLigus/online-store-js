"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./NavBar.module.scss";
import Burger from "@/frontend/components/consumers/Burger/Burger";
import { useState } from "react";
import UserBar from "@/frontend/pages/consumers/UserBar/UserBar";

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
  const searching = e => {
    e.preventDefault();
    setIsSearchClicked(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.headerItems}>
          <div style={{ display: "flex" }}>
            <div className={styles.burgerContainer}>
              <Burger menuIsClicked={menuIsClicked} onClick={updateMenu} />
            </div>
            <Image
              src="/assets/icon/search-icon.svg"
              width={18}
              height={18}
              alt="user icon"
              priority
              onClick={() => setIsSearchClicked(!isSearchClicked)}
            />
          </div>

          <Link href="/" prefetch={false} className={styles.logo}>
            <span>Logo</span>
          </Link>

          <div>
            <UserBar token={props.token} />
            <Link href="/cart" style={{ marginLeft: "1rem" }}>
              <Image
                src="/assets/icon/cart-icon.svg"
                width={24}
                height={24}
                alt="cart icon"
                priority
              />
            </Link>
          </div>
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

      <div
        className={
          isSearchClicked
            ? `${styles.searchContainer} ${styles.visible}`
            : `${styles.searchContainer} ${styles.hidden}`
        }
      >
        <form action="GET" onSubmit={searching} className={styles.search}>
          <input type="text" placeholder="Пошук..." />
          <input type="submit" value="Шукати" />
        </form>
      </div>
    </header>
  );
}
