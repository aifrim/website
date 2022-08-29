import { CommandCall } from "../../definitions";
import { useEffect } from "react";
import useFinishCommand from "../../utils/use-finish.command";
import { useHistory } from "../../providers/history.provider";

export default function Clear({ history }: CommandCall) {
    const finish = useFinishCommand();
    const { clear } = useHistory();

    useEffect(() => {
        if (history) {
            return;
        }

        clear();
        finish();
    });

    return null;
}
