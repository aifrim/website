import { Fira_Code } from "@next/font/google";
import type { NextPage } from "next";
import Head from "next/head";
import Shell from "../shell";

const firaCode = Fira_Code({ subsets: ["latin"] });

const Home: NextPage = () => {
    return (
        <main>
            <Head>
                <title>aifrim.com - shell</title>
                <meta name="description" content="/home" />
            </Head>

            <Shell />
        </main>
    );
};

export default Home;
