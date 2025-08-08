import axios from "../lib/axios";

class ProblemService {
    async getAllProblems(query): Promise<any> {
        const {searchQuery, difficultyFilter, page} = query;
        const difficultyParams = difficultyFilter !== "ALL" ? difficultyFilter : "";
        try {
            const response = await axios.get(`/problems/`, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                }, params: {
                    difficulty: difficultyParams,
                    search: searchQuery,
                    page: page,
                    limit: 10,
                },
            });
            return {
                problems: response.data?.problems,
                total: response.data?.total
            }
        } catch (error) {
            console.error("Unexpected error:", error);
            return [];
        }
    }

    async getProblemDetails(id: string): Promise<any | null> {
        try {
            const response = await axios.get(`/problems/${id}`, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data.problem;
        } catch (error) {
            console.error("Unexpected error:", error);
            return null;
        }
    }
}

const problemService = new ProblemService();
export default problemService;
