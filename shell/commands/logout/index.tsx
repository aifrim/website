import ls from "./logout";
import { Command } from "../../definitions";

const command: Command = {
    name: "logout",
    description: "end session on the system",
    component: ls,
};

export default command;
