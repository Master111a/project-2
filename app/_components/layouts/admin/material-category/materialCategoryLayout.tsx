import { Box } from "@mui/material";
import { ReactNode } from "react";

type IProps = {
    children: ReactNode;
};

export default function MateriallCategoryLayout({ children }: IProps) {
    return <Box>{children}</Box>;
}
