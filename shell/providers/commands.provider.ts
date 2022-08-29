import { createContextProvider } from "./create";
import React, { useCallback, useState } from "react";
import { Command } from "../definitions";

function useCommandsStore() {
    const [commands, setCommands] = useState<Command[]>([]);

    const add = useCallback((newCommands: Command[]) => {
        setCommands(
            newCommands.sort((nc1, nc2) => nc1.name.localeCompare(nc2.name))
        );
    }, []);

    return { commands, add };
}

export const [CommandsProvider, useCommands] = createContextProvider(
    {
        name: "Commands",
        strict: true,
    },
    useCommandsStore
);
