import React from "react";
import { Button } from "../ui/button";
import { RocketIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function NavBar() {
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
      <div className="flex flex-row text-4xl mr-5">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      {/* <div></div> */}
    </div>
  );
}

export default NavBar;
