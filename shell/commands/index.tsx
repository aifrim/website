import { useEffect } from "react";
import { WithChildren } from "../definitions";
import { useCommands } from "../providers/commands.provider";
import about from "./about";
import clear from "./clear";
import exit from "./exit";
import login from "./login";
import logout from "./logout";
import ls from "./ls";
import man from "./man";
import pwd from "./pwd";
import reload from "./reload";
import whoami from "./whoami";

export default function Commands({ children }: WithChildren) {
    const { add, commands } = useCommands();

    useEffect(() => {
        add([ls, pwd, clear, man, reload, whoami, about, login, logout, exit]);
    }, []);

    if (commands.length === 0) {
        return null;
    }

    return <>{children}</>;
}
