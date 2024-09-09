import { RocketIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function NavBar() {
  return (
    <div className="flex flex-row justify-between items-center h-16 border-b-2 border-gray px-2">
      <div className="flex flex-row text-4xl ml-5">
        <button>
          <RocketIcon className="w-10 h-10" />
        </button>
      </div>
      <div className="flex flex-row text-4xl mr-5">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
