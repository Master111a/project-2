import axiosUrl from ".";

export const loginAPI = async (data) => {
    const res = await axiosUrl.post("/cms/auth/login", data);
    return res;
};
export const refreshTokenAPI = async (refresh) => {
    const res = await axiosUrl.post("/refresh-token", { refresh: refresh });
    return res;
};
