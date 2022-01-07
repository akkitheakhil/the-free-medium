import styles from '@styles/UsernameScreens.module.css';
import { useForm, } from "react-hook-form";
import { useUsername } from './UsernameLogic';


function UsernameScreen() {
    const { register, handleSubmit, watch } = useForm();
    const formValue = watch('username');
    const { isValid, loading, onSubmit } = useUsername(formValue);

    return (
        <div className={styles.container}>
            <h1>Create Account</h1>
            <p>Create your account by choosing an Username</p>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <label className={styles.label}>Username</label>
                <input className={styles.input} type="text" name="username"  {...register("username")} autoComplete='off' />
                <ValidationMessage username={formValue} isValid={isValid} loading={loading} />
                <button className={styles.button} type="submit" disabled={!isValid}>CHOOSE</button>
            </form>

        </div>
    )
}

function ValidationMessage({ username, isValid, loading }) {
    if (loading) {
        return <p>Checking...</p>;
    } else if (isValid) {
        return <p className="text-success">{username} is available!</p>;
    } else if (username?.length >= 3 && !isValid) {
        return <p className="text-danger">That username is taken!</p>;
    } else if (username && !isValid) {
        return <p className="text-danger">That username is invalid</p>;
    } else {
        return <p></p>
    }
}

export default UsernameScreen;
