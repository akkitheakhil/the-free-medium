import { useState } from 'react'
import PostCard from '@components/PostCard';
import styles from '@styles/FeedScreen.module.css';


export default function FeedPage(props) {
    const [posts, setPosts] = useState(props.posts);

    return (
        <div className={styles.container}>

            <div className={styles.posts}>
                {posts?.map((post, index) => (
                    <PostCard key={index} post={post} />
                ))}
            </div>

        </div>
    )
}


