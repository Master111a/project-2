import axios, { AxiosRequestConfig } from "axios";
// config
import { refreshTokenAPI } from "@/_apis/user";
import globalConfig from "@/_config";
// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: globalConfig.apiUrl });
axiosInstance.interceptors.request.use(
    async (req) => {
        const token = localStorage.getItem("token");
        const tokenJson = token ? JSON.parse(token) : null;
        req.headers["Authorization"] = tokenJson
            ? `Bearer ${tokenJson?.access}`
            : null;
        return req;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalConfig = error.config;
        if (
            error?.response &&
            error?.response?.status === 401 &&
            error?.response?.data?.code === "token_not_valid" &&
            error?.response?.data?.messages[0]?.token_type === "access"
        ) {
            try {
                const token = localStorage.getItem("token");
                const tokenJson = token ? JSON.parse(token) : null;

                // call api
                if (tokenJson.refresh) {
                    const res = await refreshTokenAPI({
                        data: {
                            refresh: tokenJson.refresh,
                        },
                    });
                    const { access, refresh } = res;
                    const newToken = {
                        ...tokenJson,
                        access: access,
                        refresh: refresh,
                    };
                    localStorage.setItem("token", JSON.stringify(newToken));
                    originalConfig.headers[
                        "Authorization"
                    ] = `Bearer ${access}`;
                }
                return axiosInstance(originalConfig);
            } catch (err) {
                localStorage.removeItem("token");
                const pathName = window.location.pathname;
                window.location.href = `/login?redirect_url=${pathName}`;
                return Promise.reject(err);
            }
        }
        return Promise.reject(
            (error.response && error.response.data) || "Something went wrong"
        );
    }
);

export default axiosInstance;

// ----------------------------------------------------------------------
// GET
export const getAPI = async (args: string | [string, AxiosRequestConfig]) => {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });
    return res.data;
};
// POST
export const postAPI = async (args: string | [string, AxiosRequestConfig]) => {
    const [url, config] = Array.isArray(args) ? args : [args];
    const res = await axiosInstance.post(url, config?.data, { ...config });
    return res.data;
};
// PUT
export const putAPI = async (args: string | [string, AxiosRequestConfig]) => {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.put(url, config?.data, { ...config });
    return res.data;
};
// DELETE
export const deleteAPI = async (
    args: string | [string, AxiosRequestConfig]
) => {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.delete(url, { ...config });
    return res.data;
};
