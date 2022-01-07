
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import AuthCheck from '../../components/AuthCheck';
import styles from '@styles/ProfileEditor.module.css';
import { usePost } from '@lib/firebase-post';
import PageLoaderScreen from '@screens/PageLoader';

function PostEditPage() {
    const router = useRouter();
    const { slug } = router.query;
    const { post, loading, docRef } = usePost(slug);
    const ReactRTE = dynamic(() => import("@components/Editor"), {
        ssr: false,
    });

    return (
        <AuthCheck>
            <div>
                {loading && <PageLoaderScreen />}
                <div className={styles.container}>
                    <h1>{post?.title}</h1>
                    <ReactRTE content={post?.content} docRef={docRef} />
                </div>
            </div>
        </AuthCheck>
    )
}

export default PostEditPage;
