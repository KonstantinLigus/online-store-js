import styles from "./Footer.module.scss";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__inner}>
        <Link href="/" className={styles.footer__logo}>
          <Image
            src="/assets/logo.svg"
            width={331}
            height={65}
            alt="logo"
            priority
            className={styles.footer__logoImg}
          />
        </Link>

        <div className={styles.footer__info}>
          <div className={styles.footer__infoSection}>
            <p className={styles.footer__infoSectionTitle}>Контакти</p>
            <ul className={styles.footer__infoSection}>
              <li>+380 75 000 00 00</li>
              <li>+380 75 000 00 00</li>
              <li>ferma@gmail.com</li>
            </ul>
          </div>

          <nav>
            <ul className={styles.footer__infoSection}>
              <li>
                <Link href="/" className={styles.footer__link}>
                  Головна
                </Link>
              </li>
              <li>Про нас</li>
              <li>Акційні товари</li>
            </ul>
          </nav>
        </div>

        <div className={styles.footer__bottom}>
          <div className={styles.social}>
            <Link
              href="https://www.instagram.com/"
              target="_blank"
              className={styles.social__link}
              style={{
                maskImage: 'url("/assets/social-media/instagram-icon.svg")',
                WebkitMaskImage:
                  'url("/assets/social-media/instagram-icon.svg")',
              }}
            ></Link>
            <Link
              href="https://www.facebook.com/"
              target="_blank"
              className={styles.social__link}
              style={{
                maskImage: 'url("/assets/social-media/facebook-icon.svg")',
                WebkitMaskImage:
                  'url("/assets/social-media/facebook-icon.svg")',
              }}
            ></Link>
          </div>

          <p className={styles.fontSmall}>Політика конфідеційності</p>
        </div>

        <p style={{ marginBottom: "-1.5rem" }}>Дисклеймер:</p>

        <p className={styles.fontSmall}>
          Цей вебсайт є навчальним/тестовим проєктом. Увесь представлений
          контент, включно з товарами, цінами та інформацією про фермерські
          господарства, є вигаданим і використовується виключно в навчальних
          цілях. Інтернет-магазин не є справжнім і не здійснює реального продажу
          продукції.
        </p>
      </div>
    </footer>
  );
}
