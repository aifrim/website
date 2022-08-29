import { useCallback } from "react";
import { useHistory } from "../providers/history.provider";
import { useShell } from "../providers/shell.provider";
import { useInput } from "../providers/input.provider";

export default function useFinishCommand() {
    const input = useInput();
    const { add } = useHistory();
    const shell = useShell();

    return useCallback(
        (output?: JSX.Element) => {
            input.clear();

            if (output) {
                add({
                    output,
                    input,
                    prompt: shell,
                });
            }
        },
        [input, add, shell]
    );
}
