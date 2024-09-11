import { Problem, ProblemDetail } from "@/types/problemTypes";
import axios from "axios";

class ProblemService {
  async getAllProblems(): Promise<Array<Problem>> {
    try {
      const response = await axios.get(`/api/problems/`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data?.problems;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error fetching Problems:",
          error.response?.data || error.message
        );
      } else {
        console.error("Unexpected error:", error);
      }
      return [];
    }
  }

  async getProblemDetails(slug_id: string): Promise<ProblemDetail | null> {
    try {
      const response = await axios.get(`/api/problems/${slug_id}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data.problem;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error fetching Problems:",
          error.response?.data || error.message
        );
      } else {
        console.error("Unexpected error:", error);
      }
      return null;
    }
  }
}

const problemService = new ProblemService();
export default problemService;
