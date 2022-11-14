import trpc from "../../../utils/trpc";
import { CommandCall } from "../../definitions";
import { useEffect } from "react";
import useFinishCommand from "../../utils/use-finish.command";
import ListDirectoryContent from "./login.content";

export default function ListDirectory({ history }: CommandCall) {
    const finish = useFinishCommand();

    const { mutate } = trpc.useMutation(["login"]);

    return <>Login</>;
}
