import Input from "./input";
import { useInput } from "../../providers/input.provider";

export default function InputWrapper() {
    const input = useInput();

    return <Input {...input} />;
}
