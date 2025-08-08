import {loginProps, registerProps} from "@/types/authTypes";
import axios from "../lib/axios";

class AuthService {
    async login(credentials: loginProps): Promise<any> {
        try {
            const response = await axios.post(`/auth/login`, credentials, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response;
        } catch (error) {
            console.error("Unexpected error:", error);
        }
    }

    async register(credentials: registerProps): Promise<any> {
        try {
            const data = await axios.post(`/auth/register`, credentials, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return data;
        } catch (error) {
            console.error("Unexpected error:", error);
        }
    }

    async logout(): Promise<any> {
        try {
            const response = await axios.post(
                `/auth/logout`,
                {},
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return response;
        } catch (error) {
            console.error("Unexpected error:", error);
        }
    }

    async refreshToken(): Promise<any> {
        try {
            const response = await axios.post(
                `/auth/refresh`,
                {},
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return response;
        } catch (error) {
            console.error("Unexpected error:", error);
        }

    }
}

const authService = new AuthService();
export default authService;
