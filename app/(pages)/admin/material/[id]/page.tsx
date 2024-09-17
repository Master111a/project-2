import DetailMaterial from "@/_components/pages/admin-material/detail-material/detailMaterial";
import { ROUTER, ROUTER_API } from "@/_routers";
import type { Metadata } from "next";

interface MaterialItem {
    id: string;
}

export const dynamicParams = true;

export const generateStaticParams = async (): Promise<{ id: string }[]> => {
    try {
        const response = await fetch(
            process.env.NEXT_PUBLIC_API_URL + ROUTER_API.material,
            {
                cache: "no-cache",
            }
        );
        const list: MaterialItem[] = await response.json();
        return list.length > 0
            ? list.map((item: MaterialItem) => ({
                  id: item.id,
              }))
            : [];
    } catch (error) {
        console.error("Failed to fetch materials:", error);
        return [];
    }
};

export const metadata: Metadata = {
    title: "Admin Material Page",
    robots: "noindex, follow",
    openGraph: {
        type: "website",
        locale: "vn_VN",
        url: ROUTER.adminMaterial,
    },
};

export default function AdminMaterialDetailPage({
    params,
}: {
    params: { id: string };
}) {
    return <DetailMaterial id={params.id} />;
}
