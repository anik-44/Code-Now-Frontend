import { Button } from "../ui/button";
import { Badge } from "@/components/ui/badge";
import { CaretDownIcon } from "@radix-ui/react-icons";

interface SubmitCodeProps {
  toggleConsole: () => void;
}
function SubmitCode({ toggleConsole }: SubmitCodeProps) {
  return (
    <div className="flex justify-between px-4 items-center border-2 border-gray-200">
      <div className="ml-1">
        <Badge
          variant="secondary"
          className="cursor-pointer flex "
          onClick={() => {
            toggleConsole();
          }}
        >
          <span>Console</span>
          <span>
            <CaretDownIcon />
          </span>
        </Badge>
      </div>
      <div className="flex py-2 ">
        <Button variant="outline" className="mr-2">
          Run
        </Button>
        <Button className="bg-green-400 hover:bg-white-100 text-black">
          Submit
        </Button>
      </div>
    </div>
  );
}

export default SubmitCode;
