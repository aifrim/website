import { useEffect } from "react";
import trpc from "../../../utils/trpc";
import Loading from "../../components/loading";
import { CommandCall } from "../../definitions";
import useFinishCommand from "../../utils/use-finish.command";
import LogoutContent from "./logout.content";

export default function Logout({ history }: CommandCall) {
    const finish = useFinishCommand();

    const { mutate } = trpc.useMutation(["logout"]);

    useEffect(() => {
        if (history) {
            return;
        }

        mutate();
        finish(<LogoutContent />);
    }, [mutate]);

    return <Loading />;
}
