import AdminMaterialCategories from "@/_components/pages/admin-material-category/adminMaterialCategories";
import { ROUTER } from "@/_routers";
import type { Metadata } from "next";
import { Suspense } from "react";

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
    return (
        <Suspense>
            <AdminMaterialCategories />
        </Suspense>
    );
}
