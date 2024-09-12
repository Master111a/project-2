import { Box } from "@mui/material";

export default function AdminFooter() {
    return (
        <Box className="flex flex-col gap-1 pb-4 mt-auto">
            <Box className="flex items-center justify-center gap-x-1 text-12 leading-18 font-normal text-gray500">
                Powered by
                <Box component="span" className="font-extrabold text-primary">
                    Laravel Nova
                </Box>
                · v4.0.3 (Silver Surfer)
            </Box>
            <Box className="flex items-center justify-center gap-x-1 text-12 leading-18 font-normal text-gray500">
                © 2022 Laravel LLC · by Taylor Otwell and David Hemphill.
            </Box>
        </Box>
    );
}
