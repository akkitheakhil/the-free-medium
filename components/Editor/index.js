import { useState, useEffect } from "react";
import RichTextEditor, { EditorValue } from "react-rte";
import styles from '@styles/TextEditor.module.css';
import { updateDoc } from "firebase/firestore";
import { serverTime } from "@lib/firebase-helper";

export const Editor = ({ content, docRef }) => {
    const [value, setValue] = useState(RichTextEditor.createEmptyValue());

    const onSubmit = () => {
        updateDoc(docRef, { content: value.toString('html'), updatedAt: serverTime() });
    }

    useEffect(() => {
        try {
            setValue(RichTextEditor.createValueFromString(content, "html"));
        } catch (err) {

        }

    }, [content])

    return (
        <>
            <RichTextEditor
                className={styles.textEditor}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                value={value}
            />
            <div className={styles.container}>
                <button className={styles.button} onClick={onSubmit}>Publish</button>
            </div>
        </>
    );
}


export default Editor;