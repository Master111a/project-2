import CreateMaterial from "@/_components/pages/admin-material/create-material/createMaterial";
import { ROUTER } from "@/_routers";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Admin Create Material Page",
    robots: "noindex, follow",
    openGraph: {
        type: "website",
        locale: "vn_VN",
        url: ROUTER.adminCreateMaterial,
    },
};

export default function AdminCreateMaterialPage() {
    return (
        <Suspense>
            <CreateMaterial />
        </Suspense>
    );
}
