import login from "./login";
import { Command } from "../../definitions";

const command: Command = {
    name: "login",
    description: "begin session on the system",
    component: login,
};

export default command;
