import { CommandCall } from "../../definitions";
import { useEffect } from "react";
import useFinishCommand from "../../utils/use-finish.command";
import AboutContent from "./about.content";

export default function About({ history }: CommandCall) {
    const finish = useFinishCommand();

    useEffect(() => {
        if (history) {
            return;
        }

        finish(<AboutContent />);
    });

    return null;
}
