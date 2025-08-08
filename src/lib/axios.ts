import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_NODE_ENV === 'production' ? import.meta.env.VITE_BASE_URL : "/api",
    withCredentials: true,
});


export default axiosInstance;