import { WithChildren } from "../definitions";
import { CommandsProvider } from "./commands.provider";
import { UserHasEnteredProvider } from "./entered.provider";
import { HistoryProvider } from "./history.provider";
import { InitializationProvider } from "./initialization.provider";
import { InputProvider } from "./input.provider";
import { ShellProvider } from "./shell.provider";
import { WindowProvider } from "./window.provider";

export default function Providers({ children }: WithChildren) {
    return (
        <WindowProvider>
            <UserHasEnteredProvider>
                <ShellProvider>
                    <CommandsProvider>
                        <HistoryProvider>
                            <InitializationProvider>
                                <InputProvider>{children}</InputProvider>
                            </InitializationProvider>
                        </HistoryProvider>
                    </CommandsProvider>
                </ShellProvider>
            </UserHasEnteredProvider>
        </WindowProvider>
    );
}
