import Link from "next/link";
import Image from "next/image";
import styles from './NavBar.module.scss';

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
            title: "User",
            url: "/user",
        },
        {
            id: 8,
            title: "Admin page",
            url: "/admin",
        }
    ];

    return (
        <header className={styles.header}>
            <div className={styles.wrapper}>

                <nav className={styles.navLeft}>
                    <input type='checkbox' className={styles.menuBtn} id='menu-btn'/>
                    <label className={styles.menuIcon} htmlFor='menu-btn'>
                        <span className={styles.navIcon}></span>
                    </label>
                    <ul className={styles.menu}>
                        {links.map(link => (
                            <li>
                                <Link
                                    className={styles.link}
                                    key={link.id}
                                    href={link.url}
                                >
                                    {link.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <Link href='/'>
                    <h1 className={styles.logo}>Logo</h1>
                </Link>

                <nav className={styles.navRight}>
                    <Image src='assets/social-media/user-icon.svg' width={24} height={24} alt='user icon' priority />
                    <Image src='assets/social-media/cart-icon.svg' width={24} height={24} alt='cart icon' priority />
                </nav>
            </div>
        </header>

    );
}
