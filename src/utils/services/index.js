import axios from "axios";
import { refreshTokenAPI } from "./auth.api";
import { useNavigate } from "react-router-dom";

const axiosUrl = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
    timeout: 60000,
});
axiosUrl.interceptors.request.use(
    (config) => {
        const token = JSON.parse(localStorage.getItem("token"));
        if (token) {
            config.headers["Authorization"] = `Bearer ${token?.access}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosUrl.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalConfig = error.config;
        console.log("acctoken exp");
        if (
            error.response &&
            error.response.status === 401 &&
            error.response.code === "token_not_valid"
        ) {
            try {
                const token = JSON.parse(localStorage.getItem("token"));
                const res = await refreshTokenAPI(token?.refresh);
                if (res?.status === 200) {
                    localStorage.setItem(
                        "token",
                        JSON.stringify({
                            ...token,
                            access: res?.data?.access,
                            refresh: res?.data?.refresh,
                        })
                    );
                    originalConfig.headers[
                        "Authorization"
                    ] = `Bearer ${res?.data?.access}`;
                }
                return axiosUrl(originalConfig);
            } catch (error) {
                if (error) {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                }
            }
        }
    }
);
export default axiosUrl;
