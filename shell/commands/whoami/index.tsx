import clear from "./whoami";
import { Command } from "../../definitions";

const command: Command = {
    name: "whoami",
    description: "print effective userid",
    component: clear,
};

export default command;
