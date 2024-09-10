import { Textarea } from "../ui/textarea";
import { Card, CardHeader } from "../ui/card";
import { useState } from "react";
import { Badge } from "../ui/badge";

interface ConsoleMenuProps {
  input: string;
  output: string;
}

type selected = "input" | "output";
function ConsoleMenu({ input, output }: ConsoleMenuProps) {
  const [selected, setSelected] = useState<selected>("input");
  return (
    <Card className="flex flex-col w-full h-full">
      <CardHeader className="flex flex-row items-center border-b-2 justify-between h-5 text-lg">
        <ul className="list-none flex ">
          <Badge
            className="ml-2 mr-5"
            variant={selected !== "input" ? "secondary" : undefined}
            onClick={() => {
              setSelected("input");
            }}
          >
            <li className="w-10 text-center cursor-pointer">Input</li>
          </Badge>
          <Badge
            variant={selected !== "output" ? "secondary" : undefined}
            onClick={() => {
              setSelected("output");
            }}
          >
            <li className="w-10 text-center cursor-pointer">Output</li>
          </Badge>
        </ul>
        <div>
          <span>Wrong</span>
        </div>
      </CardHeader>
      {selected === "input" && (
        <Textarea
          rows={10}
          className="text-md resize-none max-h-[300px] w-full focus-visible:ring-0 focus:outline-none "
          value={input}
        />
      )}
      {selected === "output" && (
        <>
          <Textarea
            rows={10}
            className="text-md resize-none max-h-[300px] w-full focus-visible:ring-0 focus:outline-none "
            disabled
            value={output}
          />
        </>
      )}
    </Card>
  );
}

export default ConsoleMenu;
