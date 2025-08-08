import {ResizableHandle, ResizablePanel, ResizablePanelGroup,} from "@/components/ui/resizable";
import ProblemWrapper from "./ProblemWrapper";
import {useEffect, useState} from "react";
import {Difficulty,} from "@/types/problemTypes";
import {useParams} from "react-router-dom";
import problemService from "@/services/problemService";
import NavBar from "@/components/NavBar";
import CodeEditor from "@/components/Coding/CodeEditor";

export default function ProblemAndEditorWrapper() {
    const {id} = useParams();

    const [problem, setProblem] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        async function fetchProblemDetails(id: string) {
            setLoading(true);
            const problem = await problemService.getProblemDetails(id);
            setProblem(problem);
            setLoading(false);
        }

        if (id) fetchProblemDetails(id);
    }, [id]);


    return (
        <>
            <div className="h-screen w-screen flex flex-col justify-center">
                <div>
                    <NavBar/>
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
                                            input: "prob",
                                            output: "TG9hZGluZy4uLg==",
                                            slug: "Loading...",
                                            description: "Loading...",
                                            difficulty: Difficulty.Easy,
                                        }}
                                    />
                                </ResizablePanel>
                                <ResizableHandle className="bg-gray-300 cursor-col-resize"/>
                                <ResizablePanel className="flex-1" minSize={20}>
                                    <CodeEditor problemDetails={problem}/>
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
                                    {problem && <ProblemWrapper problem={problem}/>}
                                </ResizablePanel>
                                <ResizableHandle className="bg-gray-300 cursor-col-resize"/>
                                <ResizablePanel className="flex-1" minSize={20}>
                                    <CodeEditor
                                        problemDetails={problem}/>
                                </ResizablePanel>
                            </ResizablePanelGroup>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
