import { createContextProvider } from "./create";
import { useCallback, useEffect, useState } from "react";

export type ShellCtx = {
    cwd: string;
    user: string;

    isHome: boolean;
};

const HOME_PATH = "/home";

const getUserHomePath = (user: string) => `${HOME_PATH}/${user}`;

function useShellStore(): ShellCtx {
    const [user, setUser] = useState("visitor");
    const [cwd, setCwd] = useState(() => getUserHomePath(user));

    return { user, cwd, isHome: cwd === getUserHomePath(user) };
}

export const [ShellProvider, useShell] = createContextProvider(
    {
        name: "Shell",
        strict: true,
    },
    useShellStore
);
