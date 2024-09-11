"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CaretDownIcon, ResetIcon } from "@radix-ui/react-icons";
import { Languages } from "@/types/submissionTypes";

interface EditorHeaderProps {
  language: Languages;
  setLanguage: (value: Languages) => void;
  resetEditor: () => void;
}
export default function EditorHeader({
  language,
  setLanguage,
  resetEditor,
}: EditorHeaderProps) {
  return (
    <div className="w-full  flex justify-between items-center">
      <div className="ml-5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {language}
              <span>
                <CaretDownIcon />
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-10">
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={language}
              // @ts-expect-error('')
              onValueChange={setLanguage}
            >
              <DropdownMenuRadioItem value="Java">Java</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Cpp">Cpp</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="mr-5">
        <button onClick={resetEditor}>
          <ResetIcon />
        </button>
      </div>
    </div>
  );
}
