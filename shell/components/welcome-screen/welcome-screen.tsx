import isHotkey from "is-hotkey";
import { useEffect, useState } from "react";
import { useUserHasEntered } from "../../providers/entered.provider";
import { cls } from "../../utils";
import Avatar from "../avatar";
import styles from "./welcome-screen.module.scss";

export default function WelcomeScreen() {
    const [hidden, hide] = useState(false);
    const { enter } = useUserHasEntered();

    useEffect(() => {
        const listener = (event: KeyboardEvent) => {
            if (isHotkey("enter", event)) {
                hide(true);

                setTimeout(enter, 1000);
            }
        };

        document.body.addEventListener("keyup", listener);

        return () => {
            document.body.removeEventListener("keyup", listener);
        };
    }, []);

    return (
        <div className={cls(styles.root, hidden && styles.hidden)}>
            <div className={styles.content}>
                <Avatar size={80} priority />
                <div className={styles.details}>
                    <div>
                        Welcome to <u>aifrim.com</u> - shell
                    </div>
                    <div>
                        Press <span>enter</span> to start
                    </div>
                </div>
            </div>
        </div>
    );
}
