import { useHistory } from "../../providers/history.provider";
import Prompt from "../prompt/prompt";
import Input from "../input/input";
import styles from "./history.module.scss";
import { Fragment } from "react";

export default function History() {
    const { history, initializationMessages } = useHistory();

    return (
        <>
            {initializationMessages.map((initializationMessage, i) => (
                <div key={i} className={styles.line}>
                    {initializationMessage}
                </div>
            ))}

            {history.map(({ input, output, prompt }, i) => (
                <Fragment key={i}>
                    <div className={styles.line}>
                        <Prompt {...prompt} />
                        <Input {...input} history />
                    </div>
                    <div className={styles.output}>{output}</div>
                </Fragment>
            ))}
        </>
    );
}
