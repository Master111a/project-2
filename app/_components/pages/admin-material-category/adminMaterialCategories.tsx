"use client";

// @mui
import { Box } from "@mui/material";
import { Suspense } from "react";

const AdminMaterialCategories = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Box className="w-full h-full flex flex-col gap-y-6">
                AdminMaterialCategories
            </Box>
        </Suspense>
    );
};
export default AdminMaterialCategories;
