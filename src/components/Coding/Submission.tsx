import {useEffect, useState} from "react"
import {Card, CardContent} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {ScrollArea} from "@radix-ui/react-scroll-area"
import {ArrowLeft} from "lucide-react"
import {cn} from "@/lib/utils";
import submissionService from "@/services/submissionService";
import {useParams} from "react-router-dom";


export default function Submission() {

    const [submissions, setSubmissions] = useState([]);
    const {id} = useParams();
    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await submissionService.getAllSubmissions({id});
                setSubmissions(response.submissions);
            } catch (err) {
                console.error("Error fetching submissions:", err);
            }
        };
        fetchSubmissions();
    }, [id]);
    const [selectedSubmission, setSelectedSubmission] = useState(null)

    if (selectedSubmission) {
        return (
            <div className="p-4">
                <Button
                    variant="ghost"
                    onClick={() => setSelectedSubmission(null)}
                    className="mb-4 flex items-center gap-2"
                >
                    <ArrowLeft size={18}/> Back to submissions
                </Button>
                <Card>
                    <CardContent className="p-4 whitespace-pre-wrap text-sm overflow-auto">
                        <pre>{selectedSubmission.sourceCode}</pre>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <ScrollArea className="w-full max-h-[70vh] overflow-y-auto p-4 my-4">
            {submissions.map((sub) => (
                <Card
                    key={sub.id}
                    onClick={() => setSelectedSubmission(sub)}
                    className="cursor-pointer hover:shadow-md transition-all my-2"
                >
                    <CardContent className="p-4">
                        <div className="flex justify-between items-center text-sm font-medium gap-4 px-2">
                            <span className="text-muted-foreground">{sub.language}</span>

                            <span
                                className={cn(
                                    "px-2 py-0.5 rounded text-xs font-semibold",
                                    sub.status === "ACCEPTED"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                )}
                            >
      {sub.status}
    </span>

                            {sub.status === "ACCEPTED" && (
                                <span className="text-green-700">Time: {sub.time}s</span>
                            )}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </ScrollArea>
    )
}
