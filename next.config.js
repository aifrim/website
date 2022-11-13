/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    experimental: {
        fontLoaders: [
            { loader: "@next/font/google", options: { subsets: ["latin"] } },
        ],
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "en.gravatar.com",
                pathname: "/userimage/**",
            },
        ],
    },
};

module.exports = nextConfig;
