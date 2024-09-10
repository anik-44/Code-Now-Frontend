import { Button } from "../ui/button";
import { RocketIcon, SunIcon } from "@radix-ui/react-icons";
import AvatarComponent from "../Avatar";

function ProblemNavBar() {
  return (
    <div className="flex flex-row justify-between items-center h-16 border-b-2 border-gray px-2">
      <div className="flex flex-row text-4xl ml-5">
        <button>
          <RocketIcon className="w-10 h-10" />
        </button>
      </div>
      <div>
        <Button className="w-20 mr-2">Previous</Button>
        <Button className="w-20 ml-2">Next</Button>
      </div>
      <div className="flex flex-row items-center justify-center text-4xl mr-5">
        <button className="mr-5">
          <SunIcon className="w-5 h-5 " />
        </button>
        <AvatarComponent />
      </div>
    </div>
  );
}

export default ProblemNavBar;
