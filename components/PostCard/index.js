import { getDateTime } from '@lib/datetime-helper';
import React from 'react'
import styles from '@styles/PostCard.module.css';
import { useRouter } from 'next/router';

function PostCard({ post, submit }) {

    const router = useRouter();
    const dateFormatter = getDateTime;

    const getPostInfo = (content) => {
        const wordCount = content?.trim().split(/\s+/g).length;
        const minutesToRead = (wordCount / 100 + 1).toFixed(0);
        return `${wordCount} Words / ${minutesToRead} min read`;
    }

    const handleClick = () => {
        router.push(`/${post.username}/${post.slug}`);
    }

    return (
        <div className={styles.post} onClick={handleClick}>
            <div className={styles.postHeader}>
                <h3 className={styles.title}> {post.title} </h3>
                <p className={styles.username}>By @{post.username} </p>
            </div>
            <div className={styles.postBody}>
                <div className={styles.content} dangerouslySetInnerHTML={{ __html: `${post.content}` }}></div>
            </div>
            <div className={styles.postFooter}>
                <span className={styles.time}> {dateFormatter(post.createdAt)} </span>
                <span className={styles.minutes}> {getPostInfo(post.content)} </span>
            </div>


        </div>
    )
}

export default PostCard
