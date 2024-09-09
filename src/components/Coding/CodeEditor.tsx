import Editor from "@monaco-editor/react";
import ConsoleMenu from "./ConsoleMenu";
import { useState } from "react";
import SubmitCode from "./SubmitCode";
import { Card } from "../ui/card";
import EditorHeader from "./EditorHeader";

export default function CodeEditor() {
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

  //   setIsConsoleVisible((prev) => !prev);
  // };
  return (
    <Card className="flex flex-col h-[90vh]">
      {/* Top Panel (Editor) */}
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

      {/* Toggle Button
      <button
        onClick={toggleConsole}
        className="bg-blue-500 text-white p-2 w-full"
      >
        {isConsoleVisible ? "Hide Console" : "Show Console"}
      </button> */}
      {/* Bottom Panel (Console) */}
      {isConsoleVisible && (
        <div className="transition-all duration-300">
          <ConsoleMenu />
        </div>
      )}
      <div>
        <SubmitCode />
      </div>
    </Card>
  );
}
