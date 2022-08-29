import Input from "./components/input";
import styles from "./styles/shell.module.scss";
import Prompt from "./components/prompt";
import History from "./components/history";
import { useInput } from "./providers/input.provider";
import { useInitialization } from "./providers/initialization.provider";
import Loading from "./components/loading/loadiong";

function CommandRenderer() {
    const { command } = useInput();

    if (!command) {
        return null;
    }

    const { component: Component, name } = command;

    return <Component key={name} />;
}

export default function Shell() {
    const { initialized } = useInitialization();

    return (
        <div>
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
                <Loading />
            )}
        </div>
    );
}
