export interface SupplierType {
    id: string;
    created_at: string;
    updated_at: string;
    name: string;
    phone_number: string;
    address: string;
    longitude: number;
    latitude: number;
}

export interface CategoryType {
    id: string;
    image: string;
    created_at: string;
    name: string;
    price_type: string;
    image_thumbnails: {
        sm: string;
    };
}
export type CategoryInListType = {
    id?: string;
    name?: string;
};
export type SupplierInListType = {
    id?: string;
    name?: string;
};
export interface MaterialType {
    id?: string;
    category: CategoryType;
    supplier: SupplierType;
    image?: string;
    part_number: string;
    name?: string;
    type?: number;
    large_title: string;
    small_title: string;
    basic_price: number;
    image_thumbnails?: {
        sm: string;
    };
}
