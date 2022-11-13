import { useEffect } from "react";
import trpc from "../../../utils/trpc";
import Loading from "../../components/loading";
import { CommandCall } from "../../definitions";
import { useShell } from "../../providers/shell.provider";
import useFinishCommand from "../../utils/use-finish.command";
import ListDirectoryContent from "./ls.content";

export default function ListDirectory({ history }: CommandCall) {
    const { cwd } = useShell();
    const finish = useFinishCommand();

    const { data: records } = trpc.useQuery(["ls", { pwd: cwd }]);

    useEffect(() => {
        if (history || !records) {
            return;
        }

        finish(<ListDirectoryContent cwd={cwd} />);
    });

    if (!records) {
        return <Loading />;
    }

    return <ListDirectoryContent cwd={cwd} />;
}
