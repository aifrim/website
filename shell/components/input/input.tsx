import styles from "./input.module.scss";
import Cursor from "../cursor";
import { InputCtx } from "../../providers/input.provider";

type InputProps = InputCtx & {
    history?: boolean;
};

export default function Input({
    input,
    suggestions,
    command,
    history = false,
}: InputProps) {
    return (
        <div className={styles.root}>
            <div className={styles.input}>{input}</div>

            {!history && suggestions.length > 1 && (
                <div className={styles.suggestions}>
                    {suggestions.map(({ name, description }) => (
                        <div key={name}>
                            {name} &mdash; {description}
                        </div>
                    ))}
                </div>
            )}

            {!history && !command && <Cursor />}
        </div>
    );
}
