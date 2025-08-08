import Editor from "@monaco-editor/react";
import {useEffect, useRef, useState} from "react";
import SubmitCodeContainer from "./SubmitCodeContainer";
import {Card} from "../ui/card";
import EditorHeader from "./EditorHeader";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

import ConsoleMenu from "./ConsoleMenu";
import {useParams} from "react-router-dom";
import submissionService from "@/services/submissionService";
import {Selected, SubmissionStatus} from "@/types/submissionTypes";


export default function CodeEditor({problemDetails}: any) {

    const {id} = useParams();
    const [starter, setStarter] = useState("");
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null); // Explicitly set the ref type to include null
    const [code, setCode] = useState<string>("");
    const [language, setLanguage] = useState<any>("JAVA");

    const [inputValue, setInputValue] = useState<string>("");
    const [outputValue, setOutputValue] = useState<string>("");
    const [expectedValue, setExpectedValue] = useState<string>("");
    const [selected, setSelected] = useState<Selected>("input");


    const [result, setResult] = useState({});
    const [loading, setLoading] = useState<boolean>(false);
    const [isConsoleVisible, setIsConsoleVisible] = useState(true);

    useEffect(() => {
        if (problemDetails) {
            const codeSnippet = problemDetails.codeSnippets[language]
            setStarter(codeSnippet);
            if (editorRef.current) {
                const model = editorRef.current.getModel();
                if (model) {
                    model.setValue(codeSnippet);
                }
            }
            setCode(codeSnippet);
            const testCase = problemDetails.testcases[0]["input"];
            setInputValue(testCase);
        }
    }, [language, problemDetails]);

    function handleEditorChange(value: string | undefined) {
        if (value !== undefined) {
            setCode(value);
        }
        return;
    }

    function handleEditorDidMount(editor: monaco.editor.IStandaloneCodeEditor) {
        editorRef.current = editor;
    }

    const handleResetEditor = () => {
        if (editorRef.current) {
            const model = editorRef.current.getModel();
            if (model) {
                if (problemDetails) {
                    const codeSnippet = problemDetails.codeSnippets[language]
                    model.setValue(codeSnippet);
                    setCode(codeSnippet);
                }
            }
        }
    };

    const toggleConsole = () => {
        setIsConsoleVisible((prev) => !prev);
    };

    if (!id) {
        throw new Error("id is required");
    }

    const runCode = async () => {
        setLoading(true);
        setResult({});
        setOutputValue("");
        setExpectedValue("");

        const response = await submissionService.runCode({id, code, language, inputValue});
        if (response.result[0].status === SubmissionStatus.accepted) {
            setResult({
                output: response.result[0].userResult["stdout"],
                submissionStatus: SubmissionStatus.accepted,
            });
            setOutputValue(response.result[0].userResult["stdout"]);
        } else if (response.result[0].status === SubmissionStatus.wrong) {
            setResult({
                output: response.result[0].userResult["stdout"],
                submissionStatus: SubmissionStatus.wrong,
            });
            setOutputValue(response.result[0].userResult["stdout"]);
            setExpectedValue(response.result[0].expectedResult["stdout"]);
        } else {
            setResult({
                output: response.result[0].userResult["stderr"] || response.result[0].userResult["compileOutput"],
                submissionStatus: SubmissionStatus.error,
            });
            setOutputValue(response.result[0].userResult["stderr"]);
        }
        setSelected("output");
        setLoading(false);
    };


    const submitCode = async () => {
        setLoading(true);
        setResult({});
        setOutputValue("");
        setExpectedValue("");
        const response = await submissionService.submitCode({id, code, language});

        if (response.submission.status === SubmissionStatus.accepted) {
            setResult({
                submissionStatus: SubmissionStatus.accepted,
            });
        } else if (response.submission.status === SubmissionStatus.wrong) {
            setResult({
                submissionStatus: SubmissionStatus.wrong,
            });
        } else {
            setResult({
                submissionStatus: SubmissionStatus.error,
            });
        }
        setLoading(false);
    };

    return (
        <Card className="flex flex-col h-[92vh] mx-2">
            <Card className="py-2 flex rounded-b-none">
                {/*Editor Header*/}
                <EditorHeader
                    supported_languages={problemDetails && Object.keys(problemDetails?.codeSnippets)}
                    language={language}
                    setLanguage={setLanguage}
                    resetEditor={handleResetEditor}
                />
            </Card>

            {/*Editor*/}
            <div
                className={`flex-1 ${
                    isConsoleVisible ? "h-1/2" : "h-full"
                } transition-all duration-300`}
            >
                <Editor
                    height="100%"
                    options={{
                        readOnly: false,
                        minimap: {enabled: false},
                        fontSize: 15,
                        automaticLayout: true,
                        scrollbar: {
                            vertical: "auto",
                            horizontal: "auto",
                        },
                        renderLineHighlight: "none",
                        overviewRulerBorder: false,
                        hideCursorInOverviewRuler: true,
                        cursorStyle: "line",
                        cursorBlinking: "smooth",
                        smoothScrolling: true,
                    }}
                    defaultLanguage={language.toLowerCase()}
                    defaultValue={starter}
                    value={code}
                    onChange={handleEditorChange}
                    onMount={handleEditorDidMount}
                />
            </div>

            {/*Console Menu*/}
            {isConsoleVisible && (
                <div className="transition-all duration-300">
                    <ConsoleMenu
                        input={inputValue}
                        setInputValue={setInputValue}
                        result={result}
                        selected={selected}
                        // @ts-expect-error
                        setSelected={setSelected}
                        output={outputValue}
                        expected={expectedValue}
                    />
                </div>
            )}
            {/*Submit Code*/}
            <div>
                <SubmitCodeContainer
                    toggleConsole={toggleConsole}
                    submitCode={submitCode}
                    runCode={runCode}
                    loading={loading}
                />
            </div>
        </Card>
    );
}
