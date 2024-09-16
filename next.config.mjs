/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "192.168.200.189",
                port: "9003",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
