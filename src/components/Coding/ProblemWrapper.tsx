import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import Problem from "./Problem";
import Submission from "./Submission";
import Solution from "@/components/Coding/Solution";

interface ProblemWrapperProps {
    problem: any;
}

type Tab = "problem" | "solution" | "submission";

function ProblemWrapper({problem}: ProblemWrapperProps) {
    const [selected, setSelected] = useState<Tab>("problem");

    const tabs: { label: string; key: Tab }[] = [
        {label: "Problem", key: "problem"},
        {label: "Solution", key: "solution"},
        {label: "Submissions", key: "submission"},
    ];

    return (
        <Card className="h-full w-full shadow-sm bg-white">
            <CardHeader className="border-b border-gray-200 p-0">
                <div className="flex">
                    {tabs.map((tab) => (
                        <Button
                            key={tab.key}
                            onClick={() => setSelected(tab.key)}
                            variant={selected === tab.key ? "default" : "ghost"}
                            className={`flex-1 rounded-none py-3 text-base font-medium transition-all ${
                                selected === tab.key
                                    ? "border-b-2 border-blue-500 text-blue-600 bg-gray-50 hover:bg-gray-200"
                                    : "text-gray-500 hover:text-blue-500"
                            }`}
                        >
                            {tab.label}
                        </Button>
                    ))}
                </div>
            </CardHeader>

            <CardContent className="pt-4">
                {selected === "problem" && problem && <Problem problem={problem}/>}
                {selected === "solution" && <Solution referenceSolution={problem.referenceSolutions}/>}
                {selected === "submission" && <Submission/>}
            </CardContent>
        </Card>
    );
}

export default ProblemWrapper;
