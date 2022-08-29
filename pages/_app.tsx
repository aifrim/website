import { withTRPC } from "@trpc/next";
import { AppRouter } from "./api/trpc/[trpc]";
import "../styles/app.scss";
import type { AppProps } from "next/app";
import Providers from "../shell/providers";
import Commands from "../shell/commands";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Providers>
            <Commands>
                <Component {...pageProps} />
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
            /**
             * @link https://react-query.tanstack.com/reference/QueryClient
             */
            // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
        };
    },
    /**
     * @link https://trpc.io/docs/ssr
     */
    ssr: true,
})(MyApp);
