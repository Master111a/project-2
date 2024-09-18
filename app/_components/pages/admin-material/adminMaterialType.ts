import { CategoryType, SupplierType } from "@/_types/material";

export type MaterialDataType = {
    id: string;
    stt: number;
    category: CategoryType;
    supplier: SupplierType;
    image: string;
    part_number: string;
    name: string;
    type: number;
    large_title: string;
    small_title: string;
    basic_price: number;
};
export type MaterialSchemaType = {
    part_number: string;
    type?: number;
    large_title: string;
    small_title: string;
    basic_price: number;
    category: string;
    supplier: string;
};
export type CreateMaterialSchemaType = {
    part_number: string;
    image: File;
    type?: number;
    large_title: string;
    small_title: string;
    basic_price: number;
    category: string;
    supplier: string;
};
export type MaterialFormType = {
    part_number: string;
    name?: string;
    type?: number;
    large_title: string;
    small_title: string;
    basic_price: number;
    category: string;
    supplier: string;
    id?: string;
    image?: string | File;
};
