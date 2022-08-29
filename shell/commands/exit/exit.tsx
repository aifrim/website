import { CommandCall } from "../../definitions";
import { useEffect } from "react";
import useFinishCommand from "../../utils/use-finish.command";
import ExitContent from "./exit.content";

export default function Exit({ history }: CommandCall) {
    const finish = useFinishCommand();

    useEffect(() => {
        if (history) {
            return;
        }

        finish(<ExitContent />);

        setTimeout(() => {
            window.close();
        }, 1002);
    });

    return null;
}
