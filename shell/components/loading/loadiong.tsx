import { useEffect, useState } from "react";

const LOAD_STATES = ["—", "\\", "|", "/"];

type LoadingProps = {
    wait?: number;
};

export default function Loading({ wait = 102 }: LoadingProps) {
    const [load, setLoad] = useState(0);

    useEffect(() => {
        const interval = setInterval(
            () => setLoad((d) => (d + 1) % LOAD_STATES.length),
            wait
        );

        return () => clearInterval(interval);
    }, []);

    return <>{LOAD_STATES[load]}</>;
}
