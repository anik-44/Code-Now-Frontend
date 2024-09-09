import { Textarea } from "../ui/textarea";
import { Card, CardHeader } from "../ui/card";

function ConsoleMenu() {
  return (
    <Card className="flex flex-col w-full h-full">
      <CardHeader className="flex flex-row items-center border-b-2 justify-between h-5 text-lg">
        <ul className="list-none flex ">
          <li className="mx-5 cursor-pointer">Input</li>
          <li className="mx-5 cursor-pointer">Output</li>
        </ul>
        <div>
          <span>Wrong</span>
        </div>
      </CardHeader>
      <Textarea
        rows={10}
        className="text-md resize-none max-h-[300px] w-full focus-visible:ring-0 focus:outline-none "
      />
    </Card>
  );
}

export default ConsoleMenu;
