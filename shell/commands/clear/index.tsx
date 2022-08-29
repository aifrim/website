import clear from "./clear";
import { Command } from "../../definitions";

const command: Command = {
    name: "clear",
    description: "clear the terminal screen",
    component: clear,
};

export default command;
