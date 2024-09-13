import { Box } from "@mui/material";
import { ReactNode } from "react";

type IProps = {
    className: string;
    children: ReactNode;
};
export default function StatsItemWrap({ className, children }: IProps) {
    return (
        <Box className={`${className} w-full px-6 py-4 h-40 bg-white`}>
            {children}
        </Box>
    );
}
