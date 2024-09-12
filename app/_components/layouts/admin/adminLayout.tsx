import globalColor from "@/_assets/colors";
import AdminAside from "@/_components/layouts/admin/_components/adminAside";
import AdminContent from "@/_components/layouts/admin/_components/adminContent";
import AdminFooter from "@/_components/layouts/admin/_components/adminFooter";
import AdminHeader from "@/_components/layouts/admin/_components/adminHeader";
import { Logo } from "@/_components/ui/customs";
import { Box } from "@mui/material";
import { ReactNode } from "react";

type IProps = {
    children: ReactNode;
};
const AdminLayout = ({ children }: IProps) => {
    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                minHeight: "100vh",
                display: "flex",
                bgcolor: globalColor.background,
            }}>
            <Box
                sx={{
                    width: "20%",
                    display: "flex",
                    flexDirection: "column",
                }}>
                <Logo />
                <AdminAside />
            </Box>
            <Box
                sx={{
                    width: "80%",
                    display: "flex",
                    flexDirection: "column",
                }}>
                <AdminHeader />
                <AdminContent>{children}</AdminContent>
                <AdminFooter />
            </Box>
        </Box>
    );
};
export default AdminLayout;
