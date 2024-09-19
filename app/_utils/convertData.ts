import { MaterialCategoryFormType } from "@/_components/pages/admin-material-category/adminMaterialCategoryType";
import { MaterialFormType } from "@/_components/pages/admin-material/adminMaterialType";
import { MaterialType } from "@/_types/material";

type FormDataType = {
    [key: string]: string | File | null | number | undefined;
};
export const convertFormData = (
    data:
        | MaterialFormType
        | MaterialType
        | MaterialCategoryFormType
        | FormDataType
) => {
    const formData = new FormData();
    for (const key in data) {
        if (key === "image" && typeof data[key] === "string") {
            continue;
        }
        const value = data[key as keyof typeof data];
        if (value !== undefined && value !== null) {
            formData.append(key, value as Blob | string);
        }
    }
    return formData;
};
export const convertData = (data: Array<{ id?: string; name?: string }>) => {
    return data.map((item) => ({
        id: item.id,
        name: item.name,
    }));
};
