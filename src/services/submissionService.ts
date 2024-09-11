import {
  runCodeArgs,
  SubmissionData,
  submitCodeArgs,
} from "@/types/submissionTypes";
import axios from "axios";

class SubmissionService {
  async runCode({ slug_id, code, input, language }: runCodeArgs): Promise<any> {
    const body = {
      language: language.toLowerCase(),
      code: btoa(code),
      input: btoa(input),
    };
    const response = await axios.post(`/api/problems/${slug_id}/run`, body, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  }

  async submitCode({ slug_id, code, language }: submitCodeArgs): Promise<any> {
    const body = {
      language: language.toLowerCase(),
      code: btoa(code),
    };
    const response = await axios.post(`/api/problems/${slug_id}/submit`, body, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  }

  async getSubmissions(
    slug_id: string | undefined
  ): Promise<Array<SubmissionData>> {
    const response = await axios.get(`/api/submissions/${slug_id}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const submissions = response.data;
    return submissions.map((submission: SubmissionData) => {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      const formattedDate = new Date(submission.createdAt).toLocaleString(
        "en-US",
        // @ts-expect-error(')
        options
      );
      return {
        language:
          submission.language.charAt(0).toUpperCase() +
          submission.language.slice(1).toLowerCase(),
        status: submission.status,
        createdAt: formattedDate,
      };
    });
  }
}

const submissionService = new SubmissionService();
export default submissionService;
