"use client";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {CaretDownIcon, ResetIcon} from "@radix-ui/react-icons";

export default function EditorHeader({
                                         supported_languages,
                                         language,
                                         setLanguage,
                                         resetEditor,
                                     }: any) {
    return (
        <div className="w-full  flex justify-between items-center">
            <div className="ml-5">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            {language}
                            <span>
                <CaretDownIcon/>
              </span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-10">
                        <DropdownMenuSeparator/>
                        <DropdownMenuRadioGroup
                            value={language}
                            onValueChange={setLanguage}
                        >
                            {supported_languages &&
                                supported_languages.map((support_lan: any) => {
                                    return <DropdownMenuRadioItem key={support_lan}
                                                                  value={support_lan}>{support_lan}</DropdownMenuRadioItem>
                                })

                            }
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="mr-5">
                <button onClick={resetEditor}>
                    <ResetIcon/>
                </button>
            </div>
        </div>
    );
}
