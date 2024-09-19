import DetailMaterialCategory from "@/_components/pages/admin-material-category/detail-material-category/detailMaterialCategory";
import { ROUTER, ROUTER_API } from "@/_routers";

interface MaterialCategoryItem {
    id: string;
}

export const dynamicParams = true;

export const generateStaticParams = async (): Promise<{ id: string }[]> => {
    try {
        const response = await fetch(
            process.env.NEXT_PUBLIC_API_URL + ROUTER_API.materialCategory,
            {
                cache: "no-cache",
            }
        );
        const list: MaterialCategoryItem[] = await response.json();
        return list.length > 0
            ? list.map((item: MaterialCategoryItem) => ({
                  id: item.id,
              }))
            : [];
    } catch (error) {
        console.error("Failed to fetch materials:", error);
        return [];
    }
};

export async function generateMetadata({ params }: { params: { id: string } }) {
    return {
        title: "Admin Material Category Detail Page",
        robots: "noindex, follow",
        openGraph: {
            type: "website",
            locale: "vn_VN",
            url: ROUTER.adminCreateMaterialCategory + params.id,
        },
    };
}

export default function AdminMaterialDetailPage({
    params,
}: {
    params: { id: string };
}) {
    return <DetailMaterialCategory id={params.id} />;
}
