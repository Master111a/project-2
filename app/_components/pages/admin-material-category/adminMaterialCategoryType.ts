export type MaterialCategoryDataType = {
    id: string;
    stt: number;
    image: string;
    name: string;
    price_type: string;
};
export type MaterialCategorySchemaType = {
    name: string;
};
export type CreateMaterialCategorySchemaType = {
    name: string;
    image: File;
};
export type MaterialCategoryFormType = {
    id?: string;
    name: string;
    price_type?: string;
    image?: string | File;
};
