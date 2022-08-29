import { createContextProvider } from "./create";
import { useCallback, useEffect, useState } from "react";

function useWindowStore() {
    const [cols, setCols] = useState(1);

    useEffect(() => {
        const onResize: ResizeObserverCallback = (
            entries: ResizeObserverEntry[],
            observer: ResizeObserver
        ) => {
            const { width } = entries[0].contentRect;

            setCols(width / 12);
        };

        const resizeObserver = new ResizeObserver(onResize);
        resizeObserver.observe(document.body);
    }, []);

    return { cols };
}

export const [WindowProvider, useWindow] = createContextProvider(
    {
        name: "Window",
        strict: true,
    },
    useWindowStore
);
