import { useEffect, useState } from "react";
import Loading from "../../components/loading/loadiong";

const WAIT_TIME = 1002;

export default function Reload() {
    useEffect(() => {
        setTimeout(() => window.location.reload(), WAIT_TIME);
    });

    return (
        <>
            Reloading <Loading wait={WAIT_TIME / 10} />
        </>
    );
}
