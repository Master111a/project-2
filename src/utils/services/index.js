import axios from "axios";
import { refreshTokenAPI } from "./auth.api";

const axiosUrl = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
    timeout: 60000,
});

let isRefreshing = false;
let refreshSubscribers = [];

const onRefreshed = (token) => {
    refreshSubscribers.map((callback) => callback(token));
};

const addRefreshSubscriber = (callback) => {
    refreshSubscribers.push(callback);
};

axiosUrl.interceptors.request.use(
    (config) => {
        const token = JSON.parse(localStorage.getItem("token"));
        if (token) {
            config.headers["Authorization"] = `Bearer ${token?.access}`;
        }
        return config;
    },
    (error) => {
        console.error("Request error:", error);
        return Promise.reject(error);
    }
);

axiosUrl.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalConfig = error.config;
        if (
            error.response &&
            error.response.status === 401 &&
            error.response.data.code === "token_not_valid" &&
            error.response.data.messages[0].token_type === "access"
        ) {
            if (!isRefreshing) {
                isRefreshing = true;
                const token = JSON.parse(localStorage.getItem("token"));

                try {
                    const res = await refreshTokenAPI(token?.refresh);
                    if (res?.status === 200) {
                        const newToken = {
                            ...token,
                            access: res?.data?.access,
                            refresh: res?.data?.refresh,
                        };
                        localStorage.setItem("token", JSON.stringify(newToken));
                        axiosUrl.defaults.headers.common[
                            "Authorization"
                        ] = `Bearer ${res?.data?.access}`;
                        onRefreshed(res?.data?.access);
                        refreshSubscribers = [];
                    }
                } catch (refreshError) {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            }
            const retryOriginalRequest = new Promise((resolve) => {
                addRefreshSubscriber((token) => {
                    originalConfig.headers["Authorization"] = "Bearer " + token;
                    resolve(axiosUrl(originalConfig));
                });
            });

            return retryOriginalRequest;
        }

        return Promise.reject(error);
    }
);

export default axiosUrl;
