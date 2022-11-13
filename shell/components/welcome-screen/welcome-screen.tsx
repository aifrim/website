import isHotkey from "is-hotkey";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useUserHasEntered } from "../../providers/entered.provider";
import { cls } from "../../utils";
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
                <Image
                    src="https://en.gravatar.com/userimage/25737532/91d0e8c879a3c411c4c7b0c1bba9e8d4.png"
                    alt="Alexandru Ifrim"
                    width={80}
                    height={80}
                    loading="lazy"
                />
                <div className={styles.details}>
                    <div>
                        Welcome to <u>aifrim.com</u> - shell
                    </div>
                    <div>Press ENTER to start</div>
                </div>
            </div>
        </div>
    );
}
