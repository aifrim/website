import pwd from "./pwd";
import { Command } from "../../definitions";

const command: Command = {
    name: "pwd",
    description: "print name of current/working directory",
    component: pwd,
};

export default command;
