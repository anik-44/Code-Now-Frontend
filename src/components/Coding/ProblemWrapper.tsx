import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ProblemDetail } from "@/types/problemTypes";
import Problem from "./Problem";
import Submission from "./Submission";

type selected = "question" | "submission";

interface ProblemWrapperProps {
  problem: ProblemDetail;
}
function ProblemWrapper({ problem }: ProblemWrapperProps) {
  const [selected, setSelected] = useState<selected>("question");
  return (
    <Card className="h-full">
      <CardHeader className="box-border border-b-2 items-center py-2 border-gray-100">
        <div className="w-full items-center">
          <ul className="flex justify-start list-none items-center ">
            <Button
              className={`mr-3
              `}
              variant={selected !== "question" ? "secondary" : undefined}
              onClick={() => {
                setSelected("question");
              }}
            >
              <span className="text-lg">Question</span>
            </Button>
            <Button variant={selected === "question" ? "secondary" : undefined}>
              <span
                className="text-lg"
                onClick={() => {
                  setSelected("submission");
                }}
              >
                Submissions
              </span>
            </Button>
          </ul>
        </div>
      </CardHeader>
      <CardContent className="pt-2 flex flex-col justify-around ">
        {selected === "question" && problem && <Problem problem={problem} />}

        {selected === "submission" && <Submission />}
      </CardContent>
    </Card>
  );
}
export default ProblemWrapper;
