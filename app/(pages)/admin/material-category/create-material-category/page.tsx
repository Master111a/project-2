import CreateMaterialCategory from "@/_components/pages/admin-material-category/create-material-category/createMaterialcategory";
import { ROUTER } from "@/_routers";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Admin Create Material Category Page",
    robots: "noindex, follow",
    openGraph: {
        type: "website",
        locale: "vn_VN",
        url: ROUTER.adminCreateMaterialCategory,
    },
};

export default function AdminCreateMaterialCategoryPage() {
    return (
        <Suspense>
            <CreateMaterialCategory />
        </Suspense>
    );
}
