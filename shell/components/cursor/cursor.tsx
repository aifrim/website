import { cls } from "../../utils";
import styles from "./cursor.module.scss";
import { CSSProperties, useMemo } from "react";
import css from "styled-jsx/css";

type CursorProps = {
    input: string;
    inputting: boolean;
    cols: number;
};

function getTextWidth(text: string, font: string): number {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
        return 0;
    }

    context.font = font;

    const metrics = context.measureText(text);

    return metrics.width;
}

const fontSizes = () => {
    const computedStyle = window.getComputedStyle(document.documentElement);

    const fontSize = computedStyle.getPropertyValue("--font-size");
    const lineHeight = computedStyle.getPropertyValue("--line-height");

    const search = /[a-z]+/;

    return {
        fontSize: parseInt(fontSize.replace(search, ""), 10),
        lineHeight: parseInt(lineHeight.replace(search, ""), 10),
        textWidth: getTextWidth("a", `${fontSize} Fira Code`),
    };
};

export default function Cursor({ input, inputting, cols }: CursorProps) {
    const { textWidth, lineHeight } = useMemo(() => fontSizes(), []);

    const style: CSSProperties = {
        top: lineHeight * Math.floor(input.length / cols),
        left: textWidth * input.length,
    };

    return (
        <div
            className={cls(styles.cursor, inputting && styles.inputting)}
            style={style}
        />
    );
}
