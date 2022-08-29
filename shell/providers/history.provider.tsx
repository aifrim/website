import { createContextProvider } from "./create";
import { useCallback, useState } from "react";
import { InputCtx } from "./input.provider";
import { ShellCtx } from "./shell.provider";

type HistoryItem = {
    input: InputCtx;
    output: JSX.Element;
    prompt: ShellCtx;
};

function useHistoryStore() {
    const [history, writeHistory] = useState<HistoryItem[]>([]);
    const [initializationMessages, writeInitializationMessages] = useState<
        JSX.Element[]
    >([]);

    const clear = useCallback(() => {
        writeHistory([]);
        writeInitializationMessages([]);
    }, []);

    const add = useCallback((output: HistoryItem) => {
        writeHistory((o) => [...o, output]);
    }, []);

    const addInitializationMessage = useCallback((message: JSX.Element) => {
        writeInitializationMessages((im) => [...im, message]);
    }, []);

    return {
        history,
        add,
        initializationMessages,
        addInitializationMessage,
        clear,
    };
}

export const [HistoryProvider, useHistory] = createContextProvider(
    {
        name: "History",
        strict: true,
    },
    useHistoryStore
);
