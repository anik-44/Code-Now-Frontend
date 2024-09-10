import Editor from "@monaco-editor/react";
import { useState } from "react";
import SubmitCode from "./SubmitCode";
import { Card } from "../ui/card";
import EditorHeader from "./EditorHeader";
import ConsoleMenu from "./ConsoleMenu";

interface codeEditorProps {
  input: string;
  output: string;
}
export default function CodeEditor({ input, output }: codeEditorProps) {
  // function handleEditorChange(value, event) {
  //   // here is the current value
  // }

  // function handleEditorDidMount(editor, monaco) {
  //   console.log("onMount: the editor instance:", editor);
  //   console.log("onMount: the monaco instance:", monaco);
  // }

  // function handleEditorWillMount(monaco) {
  //   console.log("beforeMount: the monaco instance:", monaco);
  // }

  // function handleEditorValidation(markers) {
  //   // model markers
  //   // markers.forEach(marker => console.log('onValidate:', marker.message));
  // }

  const [isConsoleVisible, setIsConsoleVisible] = useState(true);

  const toggleConsole = () => {
    setIsConsoleVisible((prev) => !prev);
  };

  return (
    <Card className="flex flex-col h-[92vh] mx-2">
      <Card className="py-2 flex rounded-b-none">
        <EditorHeader />
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
          defaultLanguage="javascript"
          defaultValue="// some comment"
        />
      </div>

      {isConsoleVisible && (
        <div className="transition-all duration-300">
          <ConsoleMenu input={input} output={output} />
        </div>
      )}
      <div>
        <SubmitCode toggleConsole={toggleConsole} />
      </div>
    </Card>
  );
}
