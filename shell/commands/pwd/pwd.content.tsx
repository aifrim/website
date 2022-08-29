import { useShell } from "../../providers/shell.provider";
import { Fragment } from "react";

export default function PrintWorkingDirectoryContent() {
    const { cwd } = useShell();

    const dirs = cwd.split("/").filter((dir) => dir !== "");

    return (
        <div>
            {dirs.map((dir, i) => (
                <Fragment key={i}>
                    <span>/</span>
                    <span>{dir}</span>
                </Fragment>
            ))}
        </div>
    );
}
