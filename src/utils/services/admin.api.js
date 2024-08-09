import axiosUrl from ".";

export const getUserListAPI = async (data) => {
    try {
        const res = await axiosUrl.get("/", {
            params: {
                page: data?.page || 0,
                row: data?.row || 0,
                search: data?.search || "",
            },
        });
        return res;
    } catch (error) {
        throw res;
    }
};

// Material
export const getMaterialListAPI = async (data) => {
    try {
        const name = data?.search || "";
        const category = data?.category || "";
        const limit = data?.row || 5;
        const page = (data?.row || 5) * (data?.page ? data?.page - 1 : 0);
        const res = await axiosUrl.get("/cms/material", {
            params: {
                name: name,
                category: category,
                limit: limit,
                offset: page || 0,
            },
        });
        return res;
    } catch (error) {
        throw error;
    }
};

export const getMaterialByIdAPI = async (id) => {
    try {
        const res = await axiosUrl.get("/cms/material/" + id);
        return res;
    } catch (error) {
        throw error;
    }
};
export const createMaterialAPI = async (data) => {
    try {
        const res = await axiosUrl.post("/cms/material", data, {
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
    try {
        const res = await axiosUrl.put("/cms/material" + id, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res;
    } catch (error) {
        throw error;
    }
};

export const deleteMaterialByIdAPI = async (id) => {
    try {
        const res = await axiosUrl.delete("/cms/material" + id);
        return res;
    } catch (error) {
        throw error;
    }
};

// Material Category
export const getMaterialCategoryListAPI = async (data) => {
    try {
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
    } catch (error) {
        throw error;
    }
};
export const getMaterialCategoryByIdAPI = async (id) => {
    try {
        const res = await axiosUrl.get("/cms/material_categories/" + id);
        return res;
    } catch (error) {
        throw error;
    }
};
export const updateMaterialCategoryByIdAPI = async (id, data) => {
    try {
        const res = await axiosUrl.put("/cms/material_categories/" + id, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res;
    } catch (error) {
        throw error;
    }
};
export const deleteMaterialCategoryByIdAPI = async (id) => {
    try {
        const res = await axiosUrl.delete("/cms/material_categories/" + id);
        return res;
    } catch (error) {
        throw error;
    }
};
export const deleteManyMaterialCategoryAPI = async (ids) => {
    try {
        const res = await axiosUrl.delete(
            "cms/material_categories/bulk/" + ids
        );
        return res;
    } catch (error) {
        throw error;
    }
};
export const createMaterialCategoryListAPI = async (data) => {
    try {
        const res = await axiosUrl.post("/cms/material_categories", data, {
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
// Supplier
export const getSuplierListAPI = async (data) => {
    try {
        const name = data?.search || "";
        const limit = data?.row || 5;
        const page = (data?.row || 5) * (data?.page ? data?.page - 1 : 0);
        const res = await axiosUrl.get("/cms/supplier", {
            params: {
                name: name,
                limit: limit,
                offset: page || 0,
            },
        });
        return res;
    } catch (error) {
        throw error;
    }
};
