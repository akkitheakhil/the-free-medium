import styles from '@styles/PageLoaderScreen.module.css';

function PageLoaderScreen() {
    return (
        <div className={styles.container} >
            <div className={styles.spinner} ></div>
        </div>
    )
}

export default PageLoaderScreen
