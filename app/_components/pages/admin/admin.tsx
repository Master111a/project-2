"use client";

import { Box } from "@mui/material";
import { Suspense } from "react";

const Admin = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Box>Main</Box>;
        </Suspense>
    );
};
export default Admin;
