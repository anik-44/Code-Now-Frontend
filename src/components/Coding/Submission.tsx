import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import submissionService from "@/services/submissionService";
import { useParams } from "react-router-dom";
import { SubmissionData, SubmissionStatus } from "@/types/submissionTypes";

function Submission() {
  const { slug_id } = useParams();
  const [submissions, setSubmissions] = useState<Array<SubmissionData>>([]);
  useEffect(() => {
    async function fetchSubmissions(slug_id: string | undefined) {
      const response = await submissionService.getSubmissions(slug_id);
      setSubmissions(response);
    }
    fetchSubmissions(slug_id);
  }, [slug_id]);

  const status = (status: SubmissionStatus) => {
    switch (status) {
      case SubmissionStatus.Correct:
        return "text-green-500";
      case SubmissionStatus.Wrong:
        return "text-red-500";
      case SubmissionStatus.Error:
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };
  return (
    <>
      <Table>
        <TableBody>
          {submissions.map((submission: any) => (
            <TableRow key={submission.id} className="px-3">
              <TableCell
                className={`
              ${status(submission?.status)}
               font-medium`}
              >
                {submission.status}
              </TableCell>
              <TableCell>
                <p className="font-medium text-md text-justify">
                  {submission.language}
                </p>
              </TableCell>
              <TableCell className="text-right">
                <p className="font-medium text-md text-justify">
                  {submission.createdAt}
                </p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default Submission;
