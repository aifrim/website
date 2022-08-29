import Cursor from "./cursor";

import { useInput } from "../../providers/input.provider";
import { useWindow } from "../../providers/window.provider";

export default function CursorWrapper() {
    const { input, inputting } = useInput();
    const { cols } = useWindow();

    const props = { input, inputting, cols };

    return <Cursor {...props} />;
}
