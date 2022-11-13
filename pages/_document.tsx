import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentProps,
} from "next/document";

export default function MyDocument(props: DocumentProps) {
    return (
        <Html>
            <Head>
                <link rel="icon" href="/favicon.ico" />

                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin={"crossOrigin"}
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=optional"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
