import man from "./man";
import { Command } from "../../definitions";

const command: Command = {
    name: "man",
    description: "an interface to the system reference manuals",
    component: man,
};

export default command;
