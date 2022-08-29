import styles from "./unknown-command.module.scss";

type UnknownCommandProps = {
    command: string;
};

export default function UnknownCommand({ command }: UnknownCommandProps) {
    return (
        <div>
            <div>
                There is no such command:{" "}
                <span className={styles.name}>{command}</span>.
            </div>
            <div>
                Use <span className={styles.name}>man</span> to view all
                available commands.
            </div>
        </div>
    );
}
