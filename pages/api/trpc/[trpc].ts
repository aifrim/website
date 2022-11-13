import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import { sleep } from "../../../shell/utils";
import { scrypt, randomUUID } from "crypto";
import { NextApiResponse } from "next";

const hash = (src: string, salt = randomUUID()): Promise<string> =>
    new Promise((resolve) =>
        scrypt(src, salt, 64, { N: 4096 }, (err, k) =>
            resolve(k.toString("hex"))
        )
    );

export const appRouter = trpc
    .router()
    .query("ls", {
        input: z
            .object({
                pwd: z.string().nullish(),
            })
            .nullish(),
        async resolve({ input, ctx, type }) {
            await sleep(10000);

            const authorized = "da";
            const age = 5 * 60;

            const res = (ctx as any).res as NextApiResponse<any>;
            res.setHeader(
                "set-cookie",
                `authorized=${authorized}; path=/; secure; samesite=strict; httponly; max-age: ${age}`
            );

            return {
                "about.md": {
                    fileSize: 3,
                },
            };
        },
    })
    .mutation("logout", {
        async resolve({ ctx }) {
            const res = (ctx as any).res as NextApiResponse<any>;

            res.setHeader(
                "set-cookie",
                `authorized=; path=/; samesite=strict; httponly; max-age: 0`
            );

            return true;
        },
    })
    .mutation("login", {
        input: z.object({
            username: z.string(),
            password: z.string(),
        }),
        async resolve({ ctx, input: { username, password } }) {
            const usrSalt = process.env.LOGIN_USERNAME_SALT ?? randomUUID();
            const pwdSalt = process.env.LOGIN_PASSWORD_SALT ?? randomUUID();

            const usernameHash = await hash(username, usrSalt);

            if (usernameHash !== process.env.LOGIN_USERNAME) {
                return false;
            }

            const passwordHash = await hash(password, pwdSalt);

            if (passwordHash !== process.env.LOGIN_PASSWORD) {
                return false;
            }

            const authorized = `${await hash(
                usrSalt,
                usernameHash
            )}-${await hash(pwdSalt, passwordHash)}`;

            const age = 7 * 24 * 60 * 60;

            const res = (ctx as any).res as NextApiResponse<any>;
            res.setHeader(
                "set-cookie",
                `authorized=${authorized}; path=/; samesite=strict; httponly; max-age: ${age}`
            );

            return true;
        },
    });

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
    router: appRouter,
    createContext: ({ req, res }) => {
        return {
            req,
            res,
        };
    },
});
