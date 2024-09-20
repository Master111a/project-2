import AdminMaterial from "@/_components/pages/admin-material/adminMaterial";
import { ROUTER } from "@/_routers";
import type { Metadata } from "next";
import { Suspense } from "react";
export const dynamicParams = true;

export const metadata: Metadata = {
    title: "Admin Material Page",
    robots: "noindex, follow",
    openGraph: {
        type: "website",
        locale: "vn_VN",
        url: ROUTER.adminMaterial,
    },
};

export default function AdminMaterialPage() {
    return (
        <Suspense>
            <AdminMaterial />
        </Suspense>
    );
}
