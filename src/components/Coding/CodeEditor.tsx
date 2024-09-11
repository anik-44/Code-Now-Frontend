import Editor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import SubmitCode from "./SubmitCode";
import { Card } from "../ui/card";
import EditorHeader from "./EditorHeader";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

import ConsoleMenu from "./ConsoleMenu";
import { useParams } from "react-router-dom";
import submissionService from "@/services/submissionService";
import { Selected, SubmissionStatus } from "@/types/submissionTypes";
import { cppStarter, javaStarter } from "@/constant";

interface codeEditorProps {
  input: string;
  output: string;
}

type languages = "Java" | "Cpp";
export default function CodeEditor({ input }: codeEditorProps) {
  const { slug_id } = useParams();

  const [selected, setSelected] = useState<Selected>("input");
  const [code, setCode] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>(input);
  const [outputValue, setOutputValue] = useState<string>("");
  const [language, setLanguage] = useState<languages>("Java");
  const [result, setResult] = useState({});
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null); // Explicitly set the ref type to include null
  const [loading, setLoading] = useState<boolean>(false);

  const [isConsoleVisible, setIsConsoleVisible] = useState(true);
  const [starter, setStarter] = useState("");

  useEffect(() => {
    setInputValue(input);
  }, [input]);

  useEffect(() => {
    const newStarter = language === "Java" ? javaStarter : cppStarter;
    setStarter(newStarter);
    if (editorRef.current) {
      const model = editorRef.current.getModel();
      if (model) {
        setCode(newStarter);
        model.setValue(newStarter);
      }
    }
  }, [language]);

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
        model.setValue("");
        setCode("");
      }
    }
  };

  const toggleConsole = () => {
    setIsConsoleVisible((prev) => !prev);
  };

  if (!slug_id) {
    throw new Error("slug_id is required");
  }

  const runCode = async () => {
    setLoading(true);
    setResult({});
    setOutputValue("");
    const response = await submissionService.runCode({
      slug_id,
      code,
      input,
      language,
    });
    // set Result
    if (response.submissionStatus === SubmissionStatus.Error) {
      setResult({
        output: response.error,
        submissionStatus: response.submissionStatus,
      });
      setOutputValue(response.error);
    } else if (response.submissionStatus === SubmissionStatus.Wrong) {
      setResult({
        output: response.result,
        submissionStatus: response.submissionStatus,
      });
      setOutputValue(response.result);
    } else if (response.submissionStatus === SubmissionStatus.Correct) {
      setResult({
        output: response.result,
        submissionStatus: response.submissionStatus,
      });
      setOutputValue(response.result);
    }
    setSelected("output");
    setLoading(false);
  };

  const submitCode = async () => {
    setLoading(true);
    setResult({});
    setOutputValue("");
    const response = await submissionService.submitCode({
      slug_id,
      code,
      language,
    });
    // set Result
    if (response.submissionStatus === SubmissionStatus.Error) {
      setResult({
        output: response.error,
        submissionStatus: response.submissionStatus,
      });
      setOutputValue(response.error);
    } else if (response.submissionStatus === SubmissionStatus.Wrong) {
      setResult({
        output: response.result,
        submissionStatus: response.submissionStatus,
      });
      setOutputValue(response.result);
    } else if (response.submissionStatus === SubmissionStatus.Correct) {
      setResult({
        output: response.result,
        submissionStatus: response.submissionStatus,
      });
      setOutputValue(response.result);
    } else {
      setResult({
        submissionStatus: SubmissionStatus.Error,
      });
    }
    setSelected("output");
    setLoading(false);
  };

  return (
    <Card className="flex flex-col h-[92vh] mx-2">
      <Card className="py-2 flex rounded-b-none">
        <EditorHeader
          language={language}
          setLanguage={setLanguage}
          resetEditor={handleResetEditor}
        />
      </Card>

      <div
        className={`flex-1 ${
          isConsoleVisible ? "h-1/2" : "h-full"
        } transition-all duration-300`}
      >
        <Editor
          height="100%"
          options={{
            readOnly: false,
            minimap: { enabled: false },
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

      {isConsoleVisible && (
        <div className="transition-all duration-300">
          <ConsoleMenu
            input={inputValue}
            setInputValue={setInputValue}
            result={result}
            selected={selected}
            // @ts-expect-error(')
            setSelected={setSelected}
            output={outputValue}
            setOutputValue={setOutputValue}
          />
        </div>
      )}
      <div>
        <SubmitCode
          toggleConsole={toggleConsole}
          submitCode={submitCode}
          runCode={runCode}
          loading={loading}
        />
      </div>
    </Card>
  );
}
