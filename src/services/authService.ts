import { loginProps, registerProps } from "@/types/authTypes";
import axios from "axios";

class AuthService {
  async login(credentials: loginProps): Promise<any> {
    try {
      const response = await axios.post(`/api/users/login`, credentials, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error during login:",
          error.response?.data || error.message
        );
      } else {
        console.error("Unexpected error:", error);
      }
    }
  }

  async register(credentials: registerProps): Promise<any> {
    try {
      const data = await axios.post(`/api/users/register`, credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error during registration:",
          error.response?.data || error.message
        );
      } else {
        console.error("Unexpected error:", error);
      }
    }
  }

  async logout(): Promise<any> {
    try {
      const response = await axios.post(
        `/api/users/logout`,
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
      if (axios.isAxiosError(error)) {
        console.error(
          "Error during logout:",
          error.response?.data || error.message
        );
      } else {
        console.error("Unexpected error:", error);
      }
    }
  }
}

const authService = new AuthService();
export default authService;
