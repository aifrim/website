import { useShell } from "../../providers/shell.provider";
import trpc from "../../../utils/trpc";
import Loading from "../../components/loading/loadiong";

export default function ListDirectoryContent() {
    const { cwd } = useShell();

    const { data: records } = trpc.useQuery(["ls", { pwd: cwd }]);

    if (!records) {
        return <Loading />;
    }

    return (
        <>
            {Object.entries(records).map(([filename], i) => (
                <div key={i}>{filename}</div>
            ))}
        </>
    );
}
