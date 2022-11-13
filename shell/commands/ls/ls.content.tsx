import trpc from "../../../utils/trpc";
import Loading from "../../components/loading";

type ListDirectoryContentProps = {
    cwd: string;
};

export default function ListDirectoryContent({
    cwd,
}: ListDirectoryContentProps) {
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
