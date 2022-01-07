import Link from "next/link"
import styles from '@styles/Navbar.module.css';
import { useAuth } from "@lib/authContext";
import Image from "next/image";
import { useRouter } from "next/router";
import Feather from "assets/images/feather.svg";

function Navbar() {
    const { user, username } = useAuth();
    const { pathname } = useRouter();
    return (
        <header>
            <nav className={styles.navbar}>
                <ul className={styles.navbarContainer}>
                    <li className={styles.navItems}>
                        <Link href='/' className={styles.logo} passHref>
                            <Image src='/assets/images/logo.png' width={80} height={80} alt=""></Image>
                        </Link>
                    </li>
                    {
                        (!user || (user && !username)) &&
                        <li className={styles.profile}>
                            <Link href="/auth" passHref>
                                <a>
                                    <Image src="https://avatars.dicebear.com/api/bottts/nouser.svg" alt="" height={30} width={30}></Image>
                                </a>
                            </Link>
                        </li>
                    }
                    {
                        user && username &&
                        <li className={styles.profile}>
                            <Link href={'/profile'} passHref prefetch={true}>
                                <a>
                                    <Image src={user?.photoURL || `https://avatars.dicebear.com/api/bottts/${username}.svg`} alt="" height={40} width={40}></Image>
                                </a>
                            </Link>
                        </li>
                    }

                </ul>
            </nav>
            {
                user && username && pathname !== '/new' &&
                <div className={styles.floating} title='Write new post'>
                    <Link href="/new" passHref>
                        <a><Feather /></a>
                    </Link>
                </div>
            }
        </header>
    )
}

export default Navbar
