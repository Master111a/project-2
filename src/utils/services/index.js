import axios from "axios";

const axiosUrl = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
    timeout: 60000,
});

export default axiosUrl;
