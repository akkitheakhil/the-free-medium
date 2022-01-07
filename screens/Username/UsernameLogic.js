import { useAuth } from "@lib/authContext";
import { useEffect, useCallback, useState } from 'react';
import { useForm, } from "react-hook-form";
import debounce from 'lodash.debounce';
import app from '@lib/firebase';
import { getFirestore, getDoc, doc, writeBatch } from "firebase/firestore";


export const useUsername = (formValue) => {
    const db = getFirestore(app);
    const { user, username } = useAuth();
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(false);


    const onSubmit = ({ username }, e) => {
        e.preventDefault();
        const batch = writeBatch(db);
        const userDocRef = doc(db, `users/${user.uid}`);
        const usernamesDocRef = doc(db, `usernames/${username}`);
        batch.set(userDocRef, { username: username, photoURL: user.photoURL, displayName: user.displayName });
        batch.set(usernamesDocRef, { uid: user.uid });
        batch.commit();
    };

    useEffect(() => {
        const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

        if (formValue?.trim().length >= 3 && re.test(formValue)) {
            setLoading((state) => state = true);
            setIsValid((state) => state = false);
            checkUsername(formValue);
        } else {
            setLoading((state) => state = false);
            setIsValid((state) => state = false);
        }

    }, [formValue]);

    const checkUsername = useCallback(
        debounce(async (username) => {
            if (username?.length >= 3) {
                const docRef = doc(db, `usernames/${username}`);
                const docSnap = await getDoc(docRef)
                if (docSnap.exists()) {
                    setLoading((state) => state = false);
                    setIsValid((state) => state = false);
                } else {
                    setLoading((state) => state = false);
                    setIsValid((state) => state = true);
                }
            }
        }, 500),
        []
    );

    return { isValid, loading, onSubmit };

}