import { useAuth } from '@lib/authContext';
import React from 'react'
import styles from '@styles/ProfilePage.module.css';
import Image from "next/image";
import Link from 'next/link';
import AuthCheck from '@components/AuthCheck';

function ProfilePage() {
    const { user, username, logout } = useAuth();

    return (
        <AuthCheck>
            <div>
                <div className={styles.container}>
                    <Image src={user?.photoURL || `https://avatars.dicebear.com/api/bottts/${username}.svg`} alt="" height={80} width={80}></Image>
                    <h3>{user?.displayName}</h3>
                    {username && <Link href={'/' + username} passHref><p className={styles.username}>@{username}</p></Link>}
                    <button onClick={logout} className={styles.button}>Sign Out</button>
                </div>
            </div>
        </AuthCheck>
    )
}

export default ProfilePage
