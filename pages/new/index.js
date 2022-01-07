import styles from '@styles/NewPage.module.css';
import { useNewPage } from '@lib/NewPageLogic';
import { useForm, } from "react-hook-form";

function NewPage() {

    const { register, handleSubmit, watch } = useForm();
    const title = watch('title');
    const { isValid, onSubmit, slug } = useNewPage(title);

    return (
        <div className={styles.container}>
            <div>
                <h1>Create new blog post</h1>

                <form className={styles.form}>
                    <input type='text' placeholder="Article Name" {...register("title")} />
                    <label>SLUG: {slug}</label>

                    <button onClick={onSubmit} disabled={!isValid} className={styles.button}>Create</button>
                </form>
            </div>
        </div>
    )
}

export default NewPage;