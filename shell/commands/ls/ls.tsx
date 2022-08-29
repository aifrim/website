import { CommandCall } from "../../definitions";
import { useEffect } from "react";
import useFinishCommand from "../../utils/use-finish.command";
import ListDirectoryContent from "./ls.content";

export default function ListDirectory({ history }: CommandCall) {
    const finish = useFinishCommand();

    useEffect(() => {
        if (history) {
            return;
        }

        finish(<ListDirectoryContent />);
    });

    return null;
}
