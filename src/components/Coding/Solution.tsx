import {useState} from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import * as Select from "@radix-ui/react-select";
import {ChevronDownIcon, CheckIcon} from "@radix-ui/react-icons";

interface SolutionTabProps {
    referenceSolution: Record<string, string>;
}

const SolutionTab = ({referenceSolution}: SolutionTabProps) => {
    const languages = Object.keys(referenceSolution);
    const [selectedLang, setSelectedLang] = useState<string>("JAVA");

    const solution = referenceSolution[selectedLang];

    return (
        <div className="w-full h-full p-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Solution</h2>

                <Select.Root value={selectedLang} onValueChange={setSelectedLang}>
                    <Select.Trigger
                        className="inline-flex items-center justify-between border border-gray-300 rounded px-3 py-1.5 text-sm bg-white text-gray-700 shadow-sm hover:border-gray-400 transition"
                    >
                        <Select.Value/>
                        <Select.Icon className="ml-2">
                            <ChevronDownIcon/>
                        </Select.Icon>
                    </Select.Trigger>

                    <Select.Portal>
                        <Select.Content className="bg-white border border-gray-200 rounded shadow-md">
                            <Select.Viewport className="p-1">
                                {languages.map((lang) => (
                                    <Select.Item
                                        key={lang}
                                        value={lang}
                                        className="cursor-pointer px-3 py-1.5 text-sm rounded hover:bg-gray-100 flex items-center justify-between"
                                    >
                                        <Select.ItemText>{lang}</Select.ItemText>
                                        <Select.ItemIndicator>
                                            <CheckIcon className="w-4 h-4 text-blue-500"/>
                                        </Select.ItemIndicator>
                                    </Select.Item>
                                ))}
                            </Select.Viewport>
                        </Select.Content>
                    </Select.Portal>
                </Select.Root>
            </div>

            <ScrollArea.Root className="w-full h-[400px] rounded overflow-hidden border border-gray-300 bg-white">
                <ScrollArea.Viewport className="w-full h-full p-4">
          <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
            {solution}
          </pre>
                </ScrollArea.Viewport>

                <ScrollArea.Scrollbar
                    orientation="vertical"
                    className="w-2 bg-gray-100 hover:bg-gray-200"
                >
                    <ScrollArea.Thumb className="bg-gray-500 rounded-full"/>
                </ScrollArea.Scrollbar>

                <ScrollArea.Scrollbar
                    orientation="horizontal"
                    className="h-2 bg-gray-100 hover:bg-gray-200"
                >
                    <ScrollArea.Thumb className="bg-gray-500 rounded-full"/>
                </ScrollArea.Scrollbar>

                <ScrollArea.Corner className="bg-gray-200"/>
            </ScrollArea.Root>
        </div>
    );
};

export default SolutionTab;
