import axiosUrl from ".";

export const getUserListAPI = async (data) => {
    const res = await axiosUrl.get("/", {
        params: {
            page: data?.page || 0,
            row: data?.row || 0,
            search: data?.search || "",
        },
    });
    return res;
};
export const getMaterialCategoryListAPI = async (data) => {
    const name = data?.search || "";
    const limit = data?.row || 5;
    const page = (data?.row || 5) * (data?.page ? data?.page - 1 : 0);
    const res = await axiosUrl.get("/cms/material_categories", {
        params: {
            name: name,
            limit: limit,
            offset: page || 0,
        },
    });
    return res;
};
export const getMaterialCategoryByIdAPI = async (id) => {
    const res = await axiosUrl.get("/cms/material_categories/" + id);
    return res;
};
export const updateMaterialCategoryByIdAPI = async (id, data) => {
    const res = await axiosUrl.put("/cms/material_categories/" + id, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res;
};
export const deleteMaterialCategoryByIdAPI = async (id) => {
    const res = await axiosUrl.delete("/cms/material_categories/" + id);
    return res;
};
export const createMaterialCategoryListAPI = async (data) => {
    const res = await axiosUrl.post("/cms/material_categories", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res;
};
