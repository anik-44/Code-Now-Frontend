import axios from "../lib/axios";

class SubmissionService {
    async runCode({id, code, inputValue, language}: any): Promise<any> {
        const response = await axios.post(`/execute/run/${id}`, {
            code: code,
            userInput: inputValue,
            language: language,
        }, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    }

    async submitCode({id, code, language}: any): Promise<any> {

        const response = await axios.post(`/execute/submit/${id}`, {
            code: code,
            language: language
        }, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    }

    async getAllSubmissions({id}) {
        const response = await axios.get(`/submissions/${id}`,
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                }
            });
        return response.data;
    }
}

const submissionService = new SubmissionService();
export default submissionService;
