import AdminMaterial from "@/_components/pages/admin-material/adminMaterial";
import { ROUTER } from "@/_routers";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Material Category Page",
    robots: "noindex, follow",
    openGraph: {
        type: "website",
        locale: "vn_VN",
        url: ROUTER.adminMaterialCategory,
    },
};

export default function AdminMaterialPage() {
    return <AdminMaterial />;
}
