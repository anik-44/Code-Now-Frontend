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
import { ResetIcon } from "@radix-ui/react-icons";

type languages = "java" | "cpp";
export default function EditorHeader() {
  const [position, setPosition] = React.useState<languages>("bottom");
  console.log(position);

  return (
    <div className="w-full  flex justify-between items-center">
      <div className="ml-5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{position}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-10">
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={position}
              onValueChange={setPosition}
            >
              <DropdownMenuRadioItem value="Top">Top</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Bottom">
                Bottom
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="mr-5">
        <button>
          <ResetIcon />
        </button>
      </div>
    </div>
  );
}
