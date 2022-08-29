import { WithChildren } from "../definitions";
import { useCommands } from "../providers/commands.provider";
import { useEffect } from "react";
import ls from "./ls";
import pwd from "./pwd";
import clear from "./clear";
import man from "./man";
import reload from "./reload";
import whoami from "./whoami";
import about from "./about";
import exit from "./exit";

export default function Commands({ children }: WithChildren) {
    const { add, commands } = useCommands();

    useEffect(() => {
        add([ls, pwd, clear, man, reload, whoami, about, exit]);
    }, []);

    if (commands.length === 0) {
        return null;
    }

    return <>{children}</>;
}
