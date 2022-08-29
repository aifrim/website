import { CommandCall } from "../../definitions";
import { useEffect } from "react";
import useFinishCommand from "../../utils/use-finish.command";
import PrintWorkingDirectoryContent from "./pwd.content";

export default function PrintWorkingDirectory({ history }: CommandCall) {
    const finish = useFinishCommand();

    useEffect(() => {
        if (history) {
            return;
        }

        finish(<PrintWorkingDirectoryContent />);
    });

    return null;
}
