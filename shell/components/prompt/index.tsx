import Prompt from "./prompt";
import { useShell } from "../../providers/shell.provider";

export default function PromptWrapper() {
    const shell = useShell();

    return <Prompt {...shell} />;
}
