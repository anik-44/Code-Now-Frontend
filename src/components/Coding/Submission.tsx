import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
function Submission() {
  return (
    <>
      <div className="w-[45%] h-[90%] flex justify-center my-24 mx-auto ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-justify text-md">Tag</TableHead>
              <TableHead className="text-justify text-md">Problem</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {problems.map((problem: Problem) => (
              <TableRow key={problem.id} className="px-3">
                <TableCell className="font-medium">
                  {problem.difficulty}
                </TableCell>
                <TableCell>
                  <p className="font-medium text-xl text-justify">
                    {problem.title}
                  </p>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    className="bg-green-400"
                    onClick={
                      problem.slug !== undefined
                        ? clickHandler.bind(null, problem.slug)
                        : undefined
                    }
                  >
                    Code
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      ;
    </>
  );
}

export default Submission;
