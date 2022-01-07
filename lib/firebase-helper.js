import { getFirestore, collection, query, getDocs, where, limit, serverTimestamp } from "firebase/firestore";
import { app } from "@lib/firebase";

export const db = getFirestore(app);

export const serverTime = serverTimestamp;

export async function getUserWithUsername(username) {
    const collectionRef = collection(db, "users");
    const _query = query(collectionRef, where('username', '==', username), limit(1));
    const querySnapshot = await getDocs(_query);
    return querySnapshot.docs[0];
}

export function postToJSON(doc) {
    const data = doc?.data();
    return postDocToJSON(data);
}

export function postDocToJSON(data) {
    return {
        ...data,
        // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
        createdAt: data?.createdAt.toMillis() || 0,
        updatedAt: data?.updatedAt.toMillis() || 0,
    };
}

