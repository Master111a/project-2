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
