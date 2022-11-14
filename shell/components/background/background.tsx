import { useEffect, useRef } from "react";
import styles from "./background.module.scss";

export default function Background() {
    const canvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvas.current) {
            return;
        }

        const ctx = canvas.current.getContext("2d");

        if (!ctx) {
            return;
        }

        let w = (canvas.current.width = document.body.offsetWidth);
        let h = (canvas.current.height = document.body.offsetHeight);

        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, w, h);

        let cols = Math.floor(w / 20) + 1;
        let ypos = Array(cols).fill(0);

        function matrix() {
            if (!ctx || !canvas.current) {
                return;
            }

            if (canvas.current.width !== document.body.offsetWidth) {
                w = canvas.current.width = document.body.offsetWidth;
                cols = Math.floor(w / 20) + 1;
                ypos = Array(cols).fill(0);
            }

            if (canvas.current.height !== document.body.offsetHeight) {
                h = canvas.current.height = document.body.offsetHeight;
            }

            ctx.fillStyle = "#0001";
            ctx.fillRect(0, 0, w, h);

            ctx.fillStyle = "#7bbddb";
            ctx.font = "12px __Fira_Code_0948ad";

            ypos.forEach((y, ind) => {
                const text = String.fromCharCode((Math.random() * 512) % 256);
                const x = ind * 20;
                ctx.fillText(text, x, y);
                if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
                else ypos[ind] = y + 20;
            });
        }

        setInterval(matrix, 100);
    }, [canvas]);

    return <canvas ref={canvas} className={styles.canvas} />;
}
