export type Config = {
    apiUrl: string;
    assetUrl: string;
};

const globalConfig: Config = {
    apiUrl: process.env.NEXT_PUBLIC_API_URL || "",
    assetUrl: process.env.NEXT_PUBLIC_ASSET_URL || "",
};

export default globalConfig;
