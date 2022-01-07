import { useEffect, useState } from "react";
import kebabCase from 'lodash.kebabcase';
import app from '@lib/firebase';
import { getFirestore, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useAuth } from '@lib/authContext';
import { useRouter } from "next/router";

export const useNewPage = (title = "") => {
    const router = useRouter();
    const db = getFirestore(app);
    const { user, username } = useAuth();
    const [slug, setSlut] = useState("");
    const [isValid, setIsValid] = useState(false);


    useEffect(() => {
        const _slug = encodeURI(kebabCase(title));
        const _isValid = title?.length > 3 && title?.length < 100;
        setIsValid(_isValid);
        setSlut(_slug);
    }, [title]);


    const onSubmit = async (e) => {
        e.preventDefault();
        const postDocRef = doc(db, `users/${user.uid}/posts/${slug}`);
        const data = {
            title,
            slug,
            uid: user.uid,
            username,
            published: false,
            content: '# hello world!',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            heartCount: 0,
        };
        await setDoc(postDocRef, data);
        router.push(`/profile/[slug]`, `/profile/${slug}`);
    };


    return { slug, onSubmit, isValid };
}