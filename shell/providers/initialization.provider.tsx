import { useCallback, useEffect, useState } from "react";
import Avatar from "../components/avatar";
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

const generateInitializationMessage = (text: JSX.Element, icon?: string) => (
    <div className="cmd">
        {icon ? (
            <span className="material-symbols-outlined yellow">{icon}</span>
        ) : null}
        <span>
            {icon ? <>&nbsp;</> : null}
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

        const startupMessages: [
            JSX.Element,
            string | undefined,
            number | undefined
        ][] = [
            [
                <>
                    <Avatar size={14} /> Welcome to aifrim.com
                </>,
                undefined,
                0,
            ],
            [<>&nbsp;</>, undefined, 0],
            [
                <>Material Symbols kinks failed to die</>,
                "sentiment_very_dissatisfied",
                500,
            ],
            [<>&nbsp;</>, undefined, 0],
            [<>Starting application initialization</>, "terminal", 500],
            [<>Waiting for necessary packages</>, "local_shipping", 1500],
        ];

        for (const [message, icon, dream = 500] of startupMessages) {
            addInitializationMessage(
                generateInitializationMessage(message, icon)
            );

            await sleep(dream);
        }

        addInitializationMessage(separator);

        await fontLoading("14px 'Fira Code'");

        await fontLoading("14px 'Material Symbols Outlined'");

        const messages: [JSX.Element, string | undefined][] = [
            [<>User interface dependencies loaded</>, "text_fields"],
            [<>Setting up individual parameters</>, "model_training"],
            [<>Apostatizing reducers</>, "reduce_capacity"],
            [<>Enduring safari problems</>, "bug_report"],
            [<>Launching alpha version</>, "cloud_upload"],
        ];

        for (const [message, icon = "done"] of messages) {
            addInitializationMessage(
                generateInitializationMessage(message, icon)
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
