import { Box } from "@mui/material";
import * as React from "react";
type IProps = {
    children: React.ReactNode;
};
export default function AdminContent({ children }: IProps) {
    return <Box className="flex flex-col py-5 px-3">{children}</Box>;
}
