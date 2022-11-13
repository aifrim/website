import { useCallback, useEffect, useState } from "react";
import { sleep } from "../utils";
import { createContextProvider } from "./create";
import { useUserHasEntered } from "./entered.provider";
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

const generateInitializationMessage = (text: JSX.Element, tick = false) => (
    <div className="cmd">
        {tick ? <span className="material-symbols-outlined">done</span> : null}
        <span>
            {tick ? <>&nbsp;</> : null}
            {text}
        </span>
    </div>
);

function useInitializationStore() {
    const { entered } = useUserHasEntered();
    const [initialized, done] = useState(false);

    const { addInitializationMessage, clear } = useHistory();

    const init = useCallback(async () => {
        clear();
        done(false);

        const separator = (
            <div className="separator">
                <div>&lt;==</div>
                <div>==</div>
                <div>==</div>
                <div>==</div>
                <div>==</div>
                <div>==</div>
                <div>==</div>
                <div>==</div>
                <div>==</div>
                <div>==</div>
                <div>==</div>
                <div>==</div>
                <div>==</div>
                <div>==</div>
                <div>==</div>
                <div>==</div>
                <div>==</div>
                <div>==</div>
                <div>==</div>
                <div>==</div>
                <div>==</div>
                <div>==&gt;</div>
            </div>
        );

        const startupMessages = [
            <>Welcome to aifrim.com</>,
            <>&nbsp;</>,
            <>#&nbsp;Starting application initialization</>,
            <>#&nbsp;Waiting for necessary packages</>,
        ];

        for (const message of startupMessages) {
            addInitializationMessage(generateInitializationMessage(message));

            await sleep(500);
        }

        addInitializationMessage(separator);

        await fontLoading("14px 'Fira Code'");

        await fontLoading("14px 'Material Symbols Outlined'");

        const messages = [
            <>User interface dependencies loaded</>,
            <>Setting up individual parameters</>,
            <>Apostatizing reducers</>,
            <>Enduring safari problems</>,
        ];

        for (const message of messages) {
            addInitializationMessage(
                generateInitializationMessage(message, true)
            );

            await sleep(1000);
        }

        addInitializationMessage(separator);

        done(true);
    }, []);

    useEffect(() => {
        entered && init();
    }, [entered]);

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
