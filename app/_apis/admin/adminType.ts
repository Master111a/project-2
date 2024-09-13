export type Category = {
    id?: string;
    image?: string;
    created_at?: string;
    name: string;
    price_type: string;
    image_thumbnails?: object;
};
export interface MaterialCategoryList {
    count: number;
    results: Category[];
}
