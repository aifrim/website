import exit from "./exit";
import { Command } from "../../definitions";

const command: Command = {
    name: "exit",
    description: "cause normal process termination",
    component: exit,
};

export default command;
