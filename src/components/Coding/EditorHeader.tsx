"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoonIcon, ResetIcon } from "@radix-ui/react-icons";

export default function EditorHeader() {
  const [position, setPosition] = React.useState("bottom");
  console.log(position);

  return (
    <div className="w-full  flex justify-between items-center">
      <div className="ml-5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{position}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={position}
              onValueChange={setPosition}
            >
              <DropdownMenuRadioItem value="Top">Top</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Bottom">
                Bottom
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Right">Right</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="mr-5">
        <button className="px-10">
          <ResetIcon />
        </button>
        <button>
          <MoonIcon />
        </button>
      </div>
    </div>
  );
}
