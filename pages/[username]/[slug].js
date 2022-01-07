import { getUserWithUsername, db, postToJSON, postDocToJSON } from '@lib/firebase-helper';
import { getDoc, collectionGroup, getDocs, doc } from "firebase/firestore";
import { useDocumentData } from 'react-firebase-hooks/firestore';
import styles from '@styles/PostPage.module.css';
import { getDateTime } from '@lib/datetime-helper';
import { useAuth } from '@lib/authContext';
import Link from 'next/link';
import PageLoaderScreen from '../../screens/PageLoader';
import { useRouter } from 'next/router';
import Metatags from '@components/Metatags';

export async function getStaticProps({ params }) {
    const { username, slug } = params;

    const userDoc = await getUserWithUsername(username);
    if (!userDoc) {
        return {
            notFound: true,
        };
    }


    let post;
    let path;

    if (userDoc) {
        const docRef = doc(db, `${userDoc.ref.path}/posts`, slug);
        post = postToJSON(await getDoc(docRef));
        path = docRef.path;
    }

    return {
        props: { post, path },
        revalidate: 100,
    };
}

export async function getStaticPaths() {

    const snapshot = await getDocs(collectionGroup(db, 'posts'));
    const paths = snapshot.docs.map((doc) => {
        const { slug, username } = doc.data();
        return {
            params: { username, slug },
        };
    });

    return {
        paths,
        fallback: 'blocking',
    };
}



function PostDisplayPage(props) {
    const postRef = doc(db, props.path);
    const [realtimePost, loading] = useDocumentData(postRef);
    const post = postDocToJSON(realtimePost) || props.post;
    const { uid } = useAuth();

    const router = useRouter();

    const onUsernameClick = () => {
        router.push(`/[username]`, `/${post.username}`);
    }

    return (
        <>
            <Metatags title={post.title} description={`A blog post by Author @${post.username}`} />
            <div className={styles.container}>
                <div className={styles.postHeader}>
                    <h3 className={styles.title}>{post.title}</h3>
                    <p className={styles.username} onClick={onUsernameClick}> By @{post.username} </p>
                    <span className={styles.time}> {getDateTime(post.createdAt)} </span>
                </div>
                <div className={styles.postBody}>
                    <div dangerouslySetInnerHTML={{ __html: `${post.content}` }}></div>
                </div>

                <div className={styles.postFooter}>
                    {uid && uid === post.uid &&
                        <div className={styles.edit}>
                            <Link href={`/profile/${post.slug}`}>
                                <a>Edit</a>
                            </Link>
                        </div>
                    }
                </div>
                {loading && <PageLoaderScreen />}
            </div>
        </>

    )
}

export default PostDisplayPage;
