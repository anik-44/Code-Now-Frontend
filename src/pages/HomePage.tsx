import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import problemService from "@/services/problemService";
import { Problem } from "@/types/problemTypes";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [problems, setProblems] = useState<Array<Problem>>([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchProblems() {
      const problems = await problemService.getAllProblems();
      setProblems(problems);
    }
    fetchProblems();
  }, [setProblems]);

  const clickHandler = (slug_id: string) => {
    navigate(`/problems/${slug_id}`);
  };

  return (
    <div className="w-screen h-screen">
      <NavBar />
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
    </div>
  );
}

export default HomePage;
