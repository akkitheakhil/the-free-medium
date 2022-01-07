import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { useAuth } from '@lib/authContext';
import app from '@lib/firebase';
import { getFirestore, doc } from "firebase/firestore";

export const usePost = (postId) => {
    const db = getFirestore(app);
    const { uid } = useAuth();
    const docRef = doc(db, `users/${uid}/posts/${postId}`);
    const [post, loading] = useDocumentDataOnce(docRef);
    return { post, loading, docRef };
}