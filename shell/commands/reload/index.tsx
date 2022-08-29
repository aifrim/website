import relaod from "./reload";
import { Command } from "../../definitions";

const command: Command = {
    name: "reload",
    description: "reload the terminal",
    component: relaod,
};

export default command;
