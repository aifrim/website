import { createContextProvider } from "./create";
import { useCallback, useEffect, useState } from "react";
import { InputCtx } from "./input.provider";
import { ShellCtx } from "./shell.provider";
import { sleep } from "../utils";
import { useHistory } from "./history.provider";

function useInitializationStore() {
    const [initialized, done] = useState(false);

    const { addInitializationMessage, clear } = useHistory();

    const init = useCallback(async () => {
        clear();
        done(false);

        const messages = [
            <>Setting up individual parameters</>,
            <>Apostatizing reducers</>,
            <>Enduring safari problems</>,
        ];

        await sleep(1000);

        for (const message of messages) {
            addInitializationMessage(
                <div className="cmd">
                    <span className="material-symbols-outlined">done</span>
                    <span>&nbsp;{message}</span>
                </div>
            );

            await sleep(1000);
        }

        addInitializationMessage(
            <div>&lt;==================================&gt;</div>
        );

        done(true);
    }, []);

    useEffect(() => {
        init();
    }, []);

    return { initialized };
}

export const [InitializationProvider, useInitialization] =
    createContextProvider(
        {
            name: "Initialization",
            strict: true,
        },
        useInitializationStore
    );
