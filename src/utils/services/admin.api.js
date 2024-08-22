import axiosUrl from ".";
import ROUTER_API from "./routers";
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

// Material
export const getMaterialListAPI = async (data) => {
    const name = data?.search || "";
    const category = data?.category || "";
    const limit = data?.row || 5;
    const page = (data?.row || 5) * (data?.page ? data?.page - 1 : 0);
    const res = await axiosUrl.get(ROUTER_API.material, {
        params: {
            name: name,
            category: category,
            limit: limit,
            offset: page || 0,
        },
    });
    return res;
};

export const getMaterialByIdAPI = async (id) => {
    const res = await axiosUrl.get(ROUTER_API.material + "/" + id);
    return res;
};
export const createMaterialAPI = async (data) => {
    try {
        const res = await axiosUrl.post(ROUTER_API.material, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const updateMaterialByIdAPI = async (id, data) => {
    const res = await axiosUrl.put(ROUTER_API.material + "/" + id, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res;
};

export const deleteMaterialByIdAPI = async (id) => {
    const res = await axiosUrl.delete(ROUTER_API.material + id);
    return res;
};
export const deleteMaterialListAPI = async (ids) => {
    const res = await axiosUrl.delete(ROUTER_API.delManyMaterial + ids);
    return res;
};

// Material Category
export const getMaterialCategoryListAPI = async (data) => {
    const name = data?.search || "";
    const limit = data?.row || 5;
    const page = (data?.row || 5) * (data?.page ? data?.page - 1 : 0);
    const res = await axiosUrl.get(ROUTER_API.materialCategory, {
        params: {
            name: name,
            limit: limit,
            offset: page || 0,
        },
    });
    return res;
};
export const getMaterialCategoryByIdAPI = async (id) => {
    const res = await axiosUrl.get(ROUTER_API.materialCategory + "/" + id);
    return res;
};
export const updateMaterialCategoryByIdAPI = async (id, data) => {
    const res = await axiosUrl.put(
        ROUTER_API.materialCategory + "/" + id,
        data,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
    return res;
};
export const deleteMaterialCategoryByIdAPI = async (id) => {
    const res = await axiosUrl.delete(ROUTER_API.materialCategory + "/" + id);
    return res;
};
export const deleteManyMaterialCategoryAPI = async (ids) => {
    const res = await axiosUrl.delete(ROUTER_API.delManyMaterialCategory + ids);
    return res;
};
export const createMaterialCategoryListAPI = async (data) => {
    const res = await axiosUrl.post(ROUTER_API.materialCategory, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res;
};
// Supplier
export const getSuplierListAPI = async (data) => {
    const name = data?.search || "";
    const limit = data?.row || 5;
    const page = (data?.row || 5) * (data?.page ? data?.page - 1 : 0);
    const res = await axiosUrl.get(ROUTER_API.supplier, {
        params: {
            name: name,
            limit: limit,
            offset: page || 0,
        },
    });
    return res;
};
