import { Metadata } from "next";
// config
import globalConfig from "@/_config";
// colors
import globalColor from "@/_assets/colors";
//@mui
import { Box, Button } from "@mui/material";

export const metadata: Metadata = {
    robots: "noindex, nofollow",
};

export default function NotFound() {
    return (
        <Box
            sx={{
                textAlign: "center",
                padding: ["40px", "60px"],
                bgcolor: globalColor.notfound,
                position: "fixed",
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
            }}>
            <Box
                component="img"
                src={`${globalConfig.assetUrl}/icons/404.png`}
                alt="404 Not Found"
                className="aspect-video w-full max-w-[600px] mx-auto rounded-md mb-6"
            />
            <Box
                sx={{
                    fontSize: ["30px", "50px"],
                    letterSpacing: ["3px", "5px"],
                    color: "primary.main",
                    marginBottom: "20px",
                    lineHeight: ["45px", "72px"],
                    fontWeight: 900,
                }}>
                404 <Box component="br" sx={{ display: ["block", "none"] }} />
                Not Found
            </Box>
            <Box
                sx={{
                    fontSize: ["20px", "24px"],
                    fontWeight: "bold",
                    letterSpacing: "2.4px",
                    color: "#3C3C3C",
                    marginBottom: "20px",
                }}>
                The page you are looking for{" "}
                <Box component="br" sx={{ display: ["block", "none"] }} />
                Not found.
            </Box>
            <Box
                sx={{
                    height: 24,
                    fontSize: ["14px", "16px"],
                    letterSpacing: ["1.4px", "1.6px"],
                    color: "#3C3C3C",
                    marginBottom: "40px",
                    lineHeight: ["24.5px", "24px"],
                }}>
                Please see home page.
                <Box component="br" sx={{ display: ["block", "none"] }} />
            </Box>
            <Button
                href="/"
                variant="contained"
                size="large"
                sx={{
                    width: ["311px", "340px"],
                    height: ["50px", "60px"],
                    borderRadius: "10px",
                    fontSize: ["18px", "21px"],
                    fontWeight: [500, 700],
                }}>
                Back to home page.
            </Button>
        </Box>
    );
}
