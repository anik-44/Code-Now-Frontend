import axios from "./axios";
import authService from "../services/authService";
import store from "../store/store"
import {removeUser} from "@/store/authSlice";

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    console.log(token)
    failedQueue.forEach((prom) => {
        if (error) prom.reject(error);
        else prom.resolve(token);
    });
    failedQueue = [];
};

export const setupAxiosInterceptors = () => {
    axios.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response?.status === 401 && !originalRequest._retry) {
                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({resolve, reject});
                    }).then(() => axios(originalRequest));
                }

                originalRequest._retry = true;
                isRefreshing = true;

                try {
                    await authService.refreshToken();
                    processQueue(null);
                    return axios(originalRequest);
                } catch (refreshError) {
                    processQueue(refreshError);
                    store.dispatch(removeUser());
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            }

            return Promise.reject(error);
        }
    );
};
