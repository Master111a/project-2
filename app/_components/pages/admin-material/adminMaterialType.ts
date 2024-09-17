import { CategoryType, SupplierType } from "@/_types/material";

export type MaterialDataType = {
    id: string;
    stt: number;
    category: CategoryType | [];
    supplier: SupplierType | [];
    image: string;
    part_number: string;
    name: string;
    type: number;
    large_title: string;
    small_title: string;
    basic_price: number;
};
