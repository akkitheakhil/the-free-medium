import styles from '@styles/UserProfile.module.css';
import { useRouter } from 'next/router';
import Image from "next/image";
import { getUserWithUsername, postToJSON, db } from '@lib/firebase-helper';
import { query as _query, collection, limit, orderBy, getDocs } from "firebase/firestore";

import PostCard from '@components/PostCard';
import Metatags from '@components/Metatags';

export async function getServerSideProps({ query }) {
    const { username } = query;
    const userDoc = await getUserWithUsername(username);
    if (!userDoc) {
        return {
            notFound: true,
        };
    }

    let user = null;
    let posts = null;

    if (userDoc) {
        user = userDoc.data();
        const collectionRef = collection(db, `${userDoc.ref.path}/posts`);
        const postsQuery = _query(collectionRef, orderBy('createdAt', 'desc'), limit(5));
        const snapshot = await getDocs(postsQuery);
        posts = snapshot.docs.map(postToJSON);
    }

    return {
        props: { user, posts }, // will be passed to the page component as props
    };
}




export default function UserProfilePage({ user, posts }) {

    return (
        <>
            <Metatags title={user?.displayName} description={`Author ${user?.displayName}`} image={user?.photoURL} />
            <div className={styles.container}>
                <Image src={user?.photoURL || `https://avatars.dicebear.com/api/bottts/user.svg`} alt="" height={80} width={80}></Image>
                <h3>{user?.displayName}</h3>
                <p>@{user?.username}</p>

                <div className={styles.postContainer}>
                    {posts?.map((post, index) => (
                        <PostCard className={styles.post} key={index} post={post} />
                    )
                    )}
                </div>
            </div>
        </>
    )
}

