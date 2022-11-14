import { Fira_Code } from "@next/font/google";
import type { NextPage } from "next";
import Head from "next/head";
import Shell from "../shell";
import { cls } from "../shell/utils";

const firaCode = Fira_Code({
    subsets: ["latin"],
    display: "block",
    preload: true,
});

const Home: NextPage = () => {
    return (
        <main className={firaCode.className}>
            <Head>
                <title>aifrim.com - shell</title>
                <meta name="description" content="/home" />
            </Head>

            <Shell />
        </main>
    );
};

export default Home;
