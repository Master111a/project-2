// config
import globalConfig from "@/_config";
//@mui
import { Box } from "@mui/material";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Box
            sx={{
                backgroundImage: `url(${globalConfig.assetUrl}/images/backAuth.jpg)`,
                backgroundSize: "cover",
                width: "100vw",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
            <Box className="shadow-auth w-full max-w-4/5 lg:max-w-3/4 -translate-y-[8%] h-full min-h-[500px] lg:min-h-[590px] max-h-3/5 lg:max-h-3/4 2xl:max-h-800 xl:-translate-y-[5%] 2xl:-translate-y-0">
                <Box
                    sx={{
                        boxSizing: "border-box",
                        display: "flex",
                        width: "100%",
                        height: "100%",
                        flexWrap: "wrap",
                    }}>
                    {/* image */}
                    <Box className="hidden lg:block basis-full lg:basis-1/2 max-w-1/2 flex-grow-0 m-0 h-full bg-white pt-10 px-4">
                        <Box
                            component="img"
                            src={`${globalConfig.assetUrl}/images/signin.svg`}
                            className="object-cover object-center w-full h-full"
                        />
                    </Box>
                    {/* content */}
                    <Box className="basis-full lg:basis-1/2 max-w-full lg:max-w-1/2 flex-grow-0 m-0 h-full bg-white">
                        {children}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
