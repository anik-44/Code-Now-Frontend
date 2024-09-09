import React from "react";
import Problem from "./Problem";
import CodeEditor from "./CodeEditor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function ProblemAndEditorWrapper() {
  return (
    <>
      <ResizablePanelGroup direction="horizontal" className="flex w-screen">
        <ResizablePanel minSize={20} className="flex-1 px-2">
          <Problem />
        </ResizablePanel>
        <ResizableHandle className="bg-gray-300 cursor-col-resize" />
        <ResizablePanel className="flex-1" minSize={20}>
          <CodeEditor />
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}
