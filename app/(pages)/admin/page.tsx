import Admin from "@/_components/pages/admin/admin";
import { ROUTER } from "@/_routers";
import type { Metadata } from "next";
export const dynamicParams = true;

export const metadata: Metadata = {
    title: "Admin Page",
    robots: "noindex, follow",
    openGraph: {
        type: "website",
        locale: "vn_VN",
        url: ROUTER.admin,
    },
};

export default function AdminPage() {
    return <Admin />;
}
