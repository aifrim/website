import styles from "./prompt.module.scss";
import { ShellCtx } from "../../providers/shell.provider";
import { cls } from "../../utils";

export default function Prompt({ cwd, isHome }: ShellCtx) {
    const paths = cwd.split("/");
    const dir = paths[paths.length - 2];

    return (
        <div className={styles.root}>
            <span className={cls("material-symbols-outlined", styles.sign)}>
                face
            </span>
            <span>&nbsp;{isHome ? "~" : dir}&nbsp;</span>
        </div>
    );
}
