"use client";

import MaterialStats from "@/_components/pages/admin-material/_components/materialStats";
// @mui
import { Box } from "@mui/material";

const AdminMaterial = () => {
    // useEffect(()=>{

    // },[])
    return (
        <Box className="w-full h-full flex flex-col gap-y-6">
            <MaterialStats count={0} />
        </Box>
    );
};
export default AdminMaterial;
