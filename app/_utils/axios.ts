import axios, { AxiosRequestConfig } from "axios";
// config
import globalConfig from "@/_config";
// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: globalConfig.apiUrl });

axiosInstance.interceptors.request.use(
    async (req) => {
        const token = window.sessionStorage.getItem("token");
        req.headers.Authorization = token ? `Bearer ${token}` : null;
        return req;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (res) => res,
    async (error) => {
        if (error.response?.status === 401) {
            // logout
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

    const res = await axiosInstance.post(url, { ...config });
    return res.data;
};
// PUT
export const putAPI = async (args: string | [string, AxiosRequestConfig]) => {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.put(url, { ...config });
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
