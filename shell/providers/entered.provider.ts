import { useCallback, useState } from "react";
import { createContextProvider } from "./create";

function useUserHasEnteredStore() {
    const [entered, setEntered] = useState(false);

    const enter = useCallback(() => {
        setEntered(true);
    }, []);

    return { entered, enter };
}

export const [UserHasEnteredProvider, useUserHasEntered] =
    createContextProvider(
        {
            name: "UserHasEntered",
            strict: true,
        },
        useUserHasEnteredStore
    );
