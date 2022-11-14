import Background from "./components/background";
import History from "./components/history";
import Input from "./components/input";
import Loading from "./components/loading";
import Prompt from "./components/prompt";
import WelcomeScreen from "./components/welcome-screen";
import { useUserHasEntered } from "./providers/entered.provider";
import { useInitialization } from "./providers/initialization.provider";
import { useInput } from "./providers/input.provider";
import styles from "./styles/shell.module.scss";

function CommandRenderer() {
    const { command } = useInput();

    if (!command) {
        return null;
    }

    const { component: Component, name } = command;

    return <Component key={name} />;
}

function InitializedShell() {
    const { initialized } = useInitialization();

    return (
        <>
            <History />

            {initialized ? (
                <>
                    <div className={styles.line}>
                        <Prompt />
                        <Input />
                    </div>

                    <CommandRenderer />
                </>
            ) : (
                <>
                    <Loading /> Initializing
                </>
            )}
        </>
    );
}

export default function Shell() {
    const { entered } = useUserHasEntered();

    return (
        <>
            <Background />
            {entered ? <InitializedShell /> : <WelcomeScreen />}
        </>
    );
}
