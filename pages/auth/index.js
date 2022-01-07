
import LoginScreen from '@screens/Login';
import UsernameScreen from '@screens/Username';
import styles from '@styles/AuthPage.module.css';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../../lib/authContext';


function EnterPage() {
    const router = useRouter();
    const { user, username } = useAuth();

    useEffect(() => {
        if (user && username) {
            router.push('/');
        }
    }, [user, username, router]);

    const close = () => {
        router.push('/');
    }

    return (
        <div className={styles.container}>
            <div className={styles.close} onClick={close}>
                X
            </div>
            <div className={styles.main}>
                {user ? !username ? <UsernameScreen /> : <div> LOGOUT </div> : <LoginScreen />}
            </div>
        </div >
    )
}

export default EnterPage;
