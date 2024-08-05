import axiosUrl from ".";

export const loginAPI = async (data) => {
    try {
        const res = await axiosUrl.post("/cms/auth/login", data);
        return res;
    } catch (error) {
        throw error;
    }
};
export const refreshTokenAPI = async (refresh) => {
    try {
        const res = await axiosUrl.post("/refresh-token", { refresh: refresh });
        return res;
    } catch (error) {
        throw error;
    }
};
