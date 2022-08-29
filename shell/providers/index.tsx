import { WithChildren } from "../definitions";
import { CommandsProvider } from "./commands.provider";
import { HistoryProvider } from "./history.provider";
import { InputProvider } from "./input.provider";
import { ShellProvider } from "./shell.provider";
import { WindowProvider } from "./window.provider";
import { InitializationProvider } from "./initialization.provider";

export default function Providers({ children }: WithChildren) {
    return (
        <WindowProvider>
            <ShellProvider>
                <CommandsProvider>
                    <HistoryProvider>
                        <InitializationProvider>
                            <InputProvider>{children}</InputProvider>
                        </InitializationProvider>
                    </HistoryProvider>
                </CommandsProvider>
            </ShellProvider>
        </WindowProvider>
    );
}
