import CodeEditor from "./CodeEditor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ProblemNavBar from "./ProblemNavBar";
import ProblemWrapper from "./ProblemWrapper";
import { useEffect, useState } from "react";
import { Difficulty, ProblemDetail } from "@/types/problemTypes";
import { useParams } from "react-router-dom";
import problemService from "@/services/problemService";

export default function ProblemAndEditorWrapper() {
  const { slug_id } = useParams();

  const [problem, setProblem] = useState<ProblemDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchProblemDetails(slug_id: string) {
      setLoading(true);
      const problem = await problemService.getProblemDetails(slug_id);
      setProblem(problem);
      setLoading(false);
    }
    if (slug_id) fetchProblemDetails(slug_id);
  }, [slug_id]);

  const decodedInput = problem?.input
    ? atob(problem.input)
    : "No input available";

  const decodedOutput = problem?.output
    ? atob(problem.output)
    : "No output available";

  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-center">
        <div>
          <ProblemNavBar />
        </div>
        {loading ? (
          <>
            <div className="my-2">
              <ResizablePanelGroup
                direction="horizontal"
                className="flex w-screen h-screen"
              >
                <ResizablePanel minSize={20} className="flex-1 px-2">
                  <ProblemWrapper
                    problem={{
                      title: "Loading...",
                      input: "TG9hZGluZy4uLg==",
                      output: "TG9hZGluZy4uLg==",
                      slug: "Loading...",
                      description: "Loading...",
                      difficulty: Difficulty.Easy,
                    }}
                  />
                </ResizablePanel>
                <ResizableHandle className="bg-gray-300 cursor-col-resize" />
                <ResizablePanel className="flex-1" minSize={20}>
                  <CodeEditor input={decodedInput} output={decodedOutput} />
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </>
        ) : (
          <>
            <div className="my-2">
              <ResizablePanelGroup
                direction="horizontal"
                className="flex w-screen h-screen"
              >
                <ResizablePanel minSize={20} className="flex-1 px-2">
                  {problem && <ProblemWrapper problem={problem} />}
                </ResizablePanel>
                <ResizableHandle className="bg-gray-300 cursor-col-resize" />
                <ResizablePanel className="flex-1" minSize={20}>
                  <CodeEditor input={decodedInput} output={decodedOutput} />
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </>
        )}
      </div>
    </>
  );
}
