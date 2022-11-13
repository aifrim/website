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
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
