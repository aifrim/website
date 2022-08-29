import { useCommands } from "../../providers/commands.provider";
import { cls } from "../../utils";
import styles from "./manual.module.scss";

export default function Manual() {
    const { commands } = useCommands();

    const padSize = commands
        .map(({ name }) => name)
        .sort((c1, c2) => (c1.length > c2.length ? -1 : 1))[0].length;

    return (
        <div>
            {commands.map(({ name, description }) => (
                <div key={name} className={cls("cmd", styles.command)}>
                    {name.padEnd(padSize, " ")} &mdash; {description}
                </div>
            ))}
        </div>
    );
}
