import Link from "next/link";
import Image from "next/image";
import styles from "./NavBar.module.scss";
import userIcon from "../../../../../public/assets/icon/user-icon.svg";
import cartIcon from "../../../../../public/assets/icon/cart-icon.svg";

export default function NavBar() {
  const links = [
    {
      id: 0,
      title: "Овочі",
      url: "/",
    },
    {
      id: 1,
      title: "Фрукти/Ягоди",
      url: "/",
    },
    {
      id: 2,
      title: "Горіхи",
      url: "/",
    },
    {
      id: 3,
      title: "Бакалія",
      url: "/",
    },
    {
      id: 4,
      title: "Консервація",
      url: "/",
    },
    {
      id: 5,
      title: "Молочна продукція",
      url: "/",
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

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <nav className={styles.navLeft}>
          <input type="checkbox" className={styles.menuBtn} id="menu-btn" />
          <label className={styles.menuIcon} htmlFor="menu-btn">
            <span className={styles.navIcon}></span>
          </label>
          <ul className={styles.menu}>
            {links.map(link => (
              <li key={link.id}>
                <Link className={styles.link} href={link.url}>
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link href="/">
          <h1 className={styles.logo}>Logo</h1>
        </Link>

        <nav className={styles.navRight}>
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
        </nav>
      </div>
    </header>
  );
}
