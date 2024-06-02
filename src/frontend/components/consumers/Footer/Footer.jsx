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
      <div className={styles.footer__inner}>
        <Link href="/" className={styles.footer__logo}>
          <Image
            src="/assets/Logo.png"
            width={331}
            height={65}
            alt="user icon"
            priority
            className={styles.footer__logoImg}
          />
        </Link>

        <div className={styles.footer__container}>
          <div className={styles.contacts}>
            <p className={styles.contacts__item}>Контакти</p>
            <p className={styles.contacts__item}>+380 75 000 00 00</p>
            <p className={styles.contacts__item}>+380 75 000 00 00</p>
            <p className={styles.contacts__item}>ferma@gmail.com</p>
          </div>

          <nav className={styles.links}>
            <ul className={styles.links__list}>
              <li className={styles.links__item}>
                <Link href="/" className={styles.links__link}>
                  Головна
                </Link>
              </li>
              <li className={styles.links__item}>Про нас</li>
              <li className={styles.links__item}>Акційні товари</li>
              <li className={styles.links__item}>
                <Link href="/blog" className={styles.links__link}>
                  Наш блог
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.footer__container}>
          <div className={styles.social}>
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
      </div>
    </footer>
  );
}
