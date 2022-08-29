import { CommandCall } from "../../definitions";
import { useEffect } from "react";
import useFinishCommand from "../../utils/use-finish.command";
import { useHistory } from "../../providers/history.provider";
import Manual from "./manual";

export default function Man({ history }: CommandCall) {
    const finish = useFinishCommand();

    useEffect(() => {
        if (history) {
            return;
        }

        finish(<Manual />);
    });

    return null;
}
