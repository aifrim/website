import ls from "./ls";
import { Command } from "../../definitions";

const command: Command = {
    name: "ls",
    description: "list directory contents",
    component: ls,
};

export default command;
