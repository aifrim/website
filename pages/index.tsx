import type { NextPage } from "next";
import Head from "next/head";
import Shell from "../shell";

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>aifrim.com - shell</title>
                <meta name="description" content="/home" />
                <link rel="icon" href="/favicon.ico" />

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin={"crossOrigin"}
                />
                <link rel='preload' as='style' href='https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap' />
                <link rel='preload' as='style' href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200' />
                <link
                    href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
                />
            </Head>

            <main>
                <Shell />
            </main>
        </div>
    );
};

export default Home;
