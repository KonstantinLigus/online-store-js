import styles from './Footer.module.scss';
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    const icons = [
        {
            id: 0,
            title: "twitter",
            image: "/assets/social-media/twitter-icon.svg",
            url: 'https://www.facebook.com/?_rdr'
        },
        {
            id: 1,
            title: "facebook",
            image: "/assets/social-media/facebook-icon.svg",
            url: 'https://www.facebook.com/?_rdr'
        },
        {
            id: 2,
            title: "instagram",
            image: "/assets/social-media/instagram-icon.svg",
            url: 'https://www.facebook.com/'
        },
    ]

    return (
        <footer>
            <div className={styles.footer}>
                <Link href='/'>
                    <h2 className={styles.logo}>SOME LOGO</h2>
                </Link>
                <p className={styles.copyright}>Shop© 2023. All Rights Reserved</p>
                <div className={styles.socialMedia}>
                    {icons.map(icon => (
                        <Link
                            key={icon.id}
                            href={icon.url}
                            target='_blank'
                        >
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
            </div>
        </footer>
    );
