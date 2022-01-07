import { useAuth } from '@lib/authContext';
import Image from 'next/image'
import styles from '@styles/LoginPage.module.css';

function LoginScreen() {
    const { signIn } = useAuth();
    return (
        <>
            <Image src='/assets/images/auth-bg.svg' alt='' width={300} height={300}></Image>
            <span>Get Started</span>
            <h1>Publish your passion in your own way. <br /> Its free</h1>
            <button className={styles.googleBtn} onClick={signIn}>Sign-in with Google</button>
        </>
    )
}

export default LoginScreen
