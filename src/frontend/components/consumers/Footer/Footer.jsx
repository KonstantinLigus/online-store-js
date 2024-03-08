import styles from "./Footer.module.scss";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const icons = [
    {
      id: 0,
      title: "twitter",
      image: "/assets/social-media/twitter-icon.svg",
      url: "https://www.facebook.com/?_rdr",
    },
    {
      id: 1,
      title: "facebook",
      image: "/assets/social-media/facebook-icon.svg",
      url: "https://www.facebook.com/?_rdr",
    },
    {
      id: 2,
      title: "instagram",
      image: "/assets/social-media/instagram-icon.svg",
      url: "https://www.facebook.com/",
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.section1}>
            <Link href="/" className={styles.logo}>
              <span>Logo</span>
            </Link>

            <nav>
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  <Link href="/">Головна</Link>
                </li>
                <li className={styles.listItem}>Про нас</li>
                <li className={styles.listItem}>Акційні товари</li>
                <li className={styles.listItem}>
                  <Link href="/blog">Наш блог</Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className={styles.section2}>
            <p>Контакти</p>
            <p>+380 75 000 00 00</p>
            <p>+380 75 000 00 00</p>
            <p>ferma@gmail.com</p>
          </div>
        </div>

        <div className={styles.socialMedia}>
          {icons.map(icon => (
            <Link key={icon.id} href={icon.url} target="_blank">
              <Image
                className={styles.icon}
                src={icon.image}
                alt={icon.title}
                width={20}
                height={20}
              />
            </Link>
          ))}
        </div>

        <p className={styles.copyright}>Політика конфідеційності</p>
      </div>
    </footer>
  );
}
