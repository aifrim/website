import { createContextProvider } from "./create";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import isHotkey, { toKeyName } from "is-hotkey";
import { useHistory } from "./history.provider";
import { useShell } from "./shell.provider";
import { CommandsProvider, useCommands } from "./commands.provider";
import { Command } from "../definitions";
import UnknownCommand from "../components/unknown-command/unknown-command";

export type InputCtx = {
    input: string;
    inputting: boolean;

    suggestions: Command[];

    clear: () => void;

    command?: Command;
};

function useInputStore(): InputCtx {
    const { commands } = useCommands();
    const { add } = useHistory();

    const shell = useShell();
    const shellRef = useRef(shell);
    shellRef.current = shell;

    const [input, setInput] = useState("");
    const [inputting, setInputting] = useState(false);
    const [suggestions, setSuggestions] = useState<Command[]>([]);
    const [command, setCommand] = useState<Command>();

    const commandsRef = useRef(commands);
    commandsRef.current = commands;

    const clear = useCallback(() => {
        setInput("");
        setInputting(false);
        setSuggestions([]);
        setCommand(undefined);
    }, []);

    const suggest = useCallback((search: string) => {
        if (search === "") {
            setSuggestions((suggestions) =>
                suggestions.length ? [] : suggestions
            );
        } else {
            setSuggestions(
                commandsRef.current.filter((command) =>
                    command.name.startsWith(search)
                )
            );
        }
    }, []);

    const inputRef = useRef<InputCtx>({
        input,
        inputting,
        suggestions,
        clear,
        command,
    });
    inputRef.current = { input, inputting, suggestions, clear, command };

    const exec = useCallback(() => {
        const command = commandsRef.current.find(
            (command) => command.name === inputRef.current.input
        );

        if (command) {
            setCommand(command);
        } else {
            add({
                input: inputRef.current,
                prompt: shellRef.current,
                output: <UnknownCommand command={inputRef.current.input} />,
            });

            clear();
        }
    }, []);

    useEffect(() => {
        const listener = (e: KeyboardEvent) => {
            e.preventDefault();

            if (e.ctrlKey) {
                return;
            }

            const ignoredKeys = ["shift", "control", "alt"];

            for (const key of ignoredKeys) {
                if (isHotkey(key, e)) {
                    return;
                }
            }

            setInputting(true);

            if (isHotkey("escape", e)) {
                clear();
            } else if (isHotkey("tab", e)) {
                if (inputRef.current.suggestions.length) {
                    setInput(inputRef.current.suggestions[0].name);
                }
            } else if (isHotkey("enter", e)) {
                exec();
            } else if (isHotkey("backspace", e)) {
                setInput((i) => {
                    const ni = i.substring(0, i.length - 1);

                    suggest(ni);

                    return ni;
                });
            } else {
                const key = toKeyName(e.key);
                setInput((i) => {
                    const ni = `${i}${e.shiftKey ? key.toUpperCase() : key}`;

                    suggest(ni);

                    return ni;
                });
            }
        };

        document.body.addEventListener("keydown", listener);

        return () => {
            document.body.removeEventListener("keydown", listener);
        };
    }, []);

    useEffect(() => {
        if (inputting) {
            const timeout = setTimeout(() => setInputting(false), 200);

            return () => clearTimeout(timeout);
        }
    }, [inputting]);

    return useMemo(
        () => ({ input, inputting, suggestions, clear, command }),
        [input, inputting, suggestions, clear, command]
    );
}

export const [InputProvider, useInput] = createContextProvider(
    {
        name: "Input",
        strict: true,
    },
    useInputStore
);
