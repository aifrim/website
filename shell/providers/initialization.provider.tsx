import { createContextProvider } from "./create";
import { useCallback, useEffect, useState } from "react";
import { InputCtx } from "./input.provider";
import { ShellCtx } from "./shell.provider";
import { sleep } from "../utils";
import { useHistory } from "./history.provider";

const fontLoading = (font: string) =>
    new Promise((resolve) => {
        if (document && document.fonts) {
            setTimeout(function () {
                document.fonts.load(font).then(() => resolve(true));
            }, 0);
        } else {
            resolve(true);
        }
    });

const textToInitializationMessage = (text: JSX.Element) => (
    <div className="cmd">
        <span className="material-symbols-outlined">done</span>
        <span>&nbsp;{text}</span>
    </div>
);

function useInitializationStore() {
    const [initialized, done] = useState(false);

    const { addInitializationMessage, clear } = useHistory();

    const init = useCallback(async () => {
        clear();
        done(false);

        await fontLoading("14px 'Fira Code'");
        await fontLoading("14px 'Material Symbols Outlined'");

        const messages = [
            <>User interface dependencies loaded</>,
            <>Setting up individual parameters</>,
            <>Apostatizing reducers</>,
            <>Enduring safari problems</>,
        ];

        for (const message of messages) {
            addInitializationMessage(textToInitializationMessage(message));

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
