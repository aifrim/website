import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import { sleep } from "../../../shell/utils";

export const appRouter = trpc.router().query("ls", {
    input: z
        .object({
            pwd: z.string().nullish(),
        })
        .nullish(),
    async resolve({ input }) {
        await sleep(10000);

        return {
            "about.md": {
                fileSize: 3,
            },
        };
    },
});

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
    router: appRouter,
    createContext: () => null,
});
