import { Box } from "@mui/material";
import * as React from "react";
type IProps = {
    children: React.ReactNode;
};
export default function AdminContent({ children }: IProps) {
    return (
        <Box className="w-full h-full py-8 px-12 bg-background">{children}</Box>
    );
}
