import {Textarea} from "../ui/textarea";
import {Card, CardHeader} from "../ui/card";
import {Badge} from "../ui/badge";
import {SubmissionStatus} from "@/types/submissionTypes";

interface ConsoleMenuProps {
    input: string;
    output: string | undefined;
    expected: string | undefined;
    setInputValue: (input: string) => void;
    result: any;
    selected: string;
    setSelected: (input: string) => void;
}

function ConsoleMenu({
                         input,
                         output,
                         setInputValue,
                         result,
                         selected,
                         setSelected,
                         expected

                     }: ConsoleMenuProps) {
    const showResult = (status: any) => {
        switch (status) {
            case SubmissionStatus.accepted:
                return "text-green-500";
            case SubmissionStatus.wrong:
                return "text-red-500";
            case SubmissionStatus.error:
                return "text-red-500";
            default:
                return "text-gray-500";
        }
    };

    return (
        <Card className="flex flex-col w-full h-full">
            <CardHeader className="flex flex-row items-center border-b-2 justify-between h-5 text-lg">
                <ul className="list-none flex ">
                    <Badge
                        className="ml-2 mr-5"
                        variant={selected !== "input" ? "secondary" : undefined}
                        onClick={() => {
                            setSelected("input");
                        }}
                    >
                        <li className="w-10 text-center cursor-pointer">Input</li>
                    </Badge>
                    <Badge
                        variant={selected !== "output" ? "secondary" : undefined}
                        onClick={() => {
                            setSelected("output");
                        }}
                    >
                        <li className="w-10 text-center cursor-pointer">Output</li>
                    </Badge>
                    <Badge
                        variant={selected !== "expected" ? "secondary" : undefined}
                        onClick={() => {
                            setSelected("expected");
                        }}
                        className={expected === "" ? "hidden" : ''}
                    >
                        <li className="px-2 text-center cursor-pointer">Expected Output</li>
                    </Badge>
                </ul>
                <div>
                    <p
                        className={`
              ${
                            result?.submissionStatus && showResult(result?.submissionStatus)
                        }
              text-xl font-semibold mr-5 font-sans
              `}
                    >
                        {result?.submissionStatus}
                    </p>
                </div>
            </CardHeader>
            {selected === "input" && (
                <Textarea
                    rows={10}
                    className="cursor-pointer text-md resize-none max-h-[300px] w-full focus-visible:ring-0 focus:outline-none "
                    value={input}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                    }}
                />
            )}
            {selected === "output" && (
                <>
                    <Textarea
                        rows={10}
                        className={`cursor-pointer text-md resize-none max-h-[300px] w-full focus-visible:ring-0 focus:outline-none ${
                            result?.submissionStatus && showResult(result?.submissionStatus)
                        }`}
                        readOnly
                        value={output}
                    />
                </>
            )}
            {selected === "expected" && (
                <>
                    <Textarea
                        rows={10}
                        className={`cursor-pointer text-md resize-none max-h-[300px] w-full focus-visible:ring-0 focus:outline-none ${
                            result?.submissionStatus && showResult(result?.submissionStatus)
                        }`}
                        readOnly
                        value={expected}
                    />
                </>
            )}
        </Card>
    );
}

export default ConsoleMenu;
