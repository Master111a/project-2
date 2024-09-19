import { Box } from "@mui/material";

export default function TextCustom({
    text = "",
    color = "green",
}: {
    text: string;
    color?: string;
}) {
    return (
        <Box
            component="span"
            sx={{
                bgcolor: color,
            }}
            className={`text-sm text-white px-3 py-1 rounded-md font-semibold text-nowrap`}>
            {text}
        </Box>
    );
}
