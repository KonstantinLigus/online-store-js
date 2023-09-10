import Link from "next/link";
import styles from './NavBar.module.scss';

export default function NavBar() {
    const links = [
        {
            id: 0,
            title: "Home",
            url: "/",
        },
        {
            id: 1,
            title: "User",
            url: "/user",
        },
        {
            id: 2,
            title: "Admin page",
            url: "/admin",
        }
    ];

    return (
        <header className={styles.header}>
            <Link href='/'>
                <h1 className={styles.logo}>SOME LOGO</h1>
            </Link>
            <nav className={styles.nav}>
                {links.map(link => (
                    <Link
                        className={styles.link}
                        key={link.id}
                        href={link.url}
                    >
                        {link.title}
                    </Link>
                ))}
            </nav>
        </header>

    );
}
