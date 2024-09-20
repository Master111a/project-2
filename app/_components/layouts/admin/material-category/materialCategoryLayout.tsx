import { Box } from "@mui/material";
import { ReactNode, Suspense } from "react";

type IProps = {
    children: ReactNode;
};

export default function MateriallCategoryLayout({ children }: IProps) {
    return (
        <Box>
            <Suspense fallback={<div>Loading</div>}>{children}</Suspense>
        </Box>
    );
}
