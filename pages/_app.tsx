import { withTRPC } from "@trpc/next";
import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import Commands from "../shell/commands";
import Providers from "../shell/providers";
import "../styles/app.scss";
import { AppRouter } from "./api/trpc/[trpc]";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Providers>
            <Commands>
                <Component {...pageProps} />
                <Analytics />
            </Commands>
        </Providers>
    );
}

export default withTRPC<AppRouter>({
    config({ ctx }) {
        /**
         * If you want to use SSR, you need to use the server's full URL
         * @link https://trpc.io/docs/ssr
         */
        const url = process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}/api/trpc`
            : "http://localhost:3000/api/trpc";

        return {
            url,
            req: ctx?.req,
            res: ctx?.res,
        };
    },
    ssr: true,
})(MyApp);
