import { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import app from '@lib/firebase';
import { getFirestore, getDoc, doc } from "firebase/firestore";
import PageLoaderScreen from '@screens/PageLoader';

const AuthContext = createContext({
    user: null,
    username: null,
    uid: null,
    signIn: () => { },
    logout: () => { },
});

const auth = getAuth(app);
const db = getFirestore(app);



const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    /**
     * setting user state
     */
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user);
        })
        return unsubscribe;
    }, [])

    /**
     * setting username state
     */
    useEffect(() => {
        let unsubscribe;
        setLoading(true);
        if (user) {
            const docRef = doc(db, 'users', user.uid);
            unsubscribe = getDoc(docRef).then(docSnapshot => {
                setLoading(false);
                setUserData(docSnapshot.data()?.username);
            });
        } else {
            setUserData(null);
            setLoading(false);
        }
        return unsubscribe;
    }, [user])

    const signIn = async () => {
        try {
            await signInWithPopup(auth, new GoogleAuthProvider());
        } catch (error) {
            console.error(error);
        }
    }

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <AuthContext.Provider value={{
            user,
            username: userData,
            uid: auth?.currentUser?.uid,
            signIn,
            logout
        }}>

            {loading && <PageLoaderScreen />}

            {children}
        </AuthContext.Provider>
    )
}
const useAuth = () => useContext(AuthContext);
export { AuthProvider, useAuth };