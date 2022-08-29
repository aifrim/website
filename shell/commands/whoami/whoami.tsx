import { CommandCall } from "../../definitions";
import { useEffect } from "react";
import useFinishCommand from "../../utils/use-finish.command";

export default function WhoAmI({ history }: CommandCall) {
    const finish = useFinishCommand();

    useEffect(() => {
        if (history) {
            return;
        }

        finish(<>visitor</>);
    });

    return null;
}
