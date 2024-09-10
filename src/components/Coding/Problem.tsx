import { CardDescription, CardTitle } from "../ui/card";
import { Difficulty, ProblemDetail } from "@/types/problemTypes";

interface ProblemProps {
  problem: ProblemDetail;
}
function Problem({ problem }: ProblemProps) {
  const decodedInput = problem?.input
    ? atob(problem.input)
    : "No input available";

  const decodedOutput = problem?.output
    ? atob(problem.output)
    : "No output available";

  const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case Difficulty.Easy:
        return "text-green-500";
      case Difficulty.Medium:
        return "text-yellow-500";
      case Difficulty.Hard:
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <>
      <div className="my-5">
        <CardTitle className="text-xl py-2">{problem?.title}</CardTitle>
        <p
          className={
            problem?.difficulty && getDifficultyColor(problem?.difficulty)
          }
        >
          {problem?.difficulty}
        </p>
      </div>
      <CardDescription className="my-10 mt-5">
        <p className="text-lg text-black">{problem?.description}</p>
      </CardDescription>
      <div className="my-5">
        <div className="bg-[#F4F4F4] p-3 text-lg rounded-lg">
          <p className="font-bold">Input:</p>
          <p className="bg-[#F4F4F4] w-full h-max">{decodedInput}</p>
        </div>
        <div className="bg-[#F4F4F4] my-5 p-3 text-lg rounded-lg">
          <p className="font-bold">Output:</p>
          <p className="bg-[#F4F4F4] w-full h-max">{decodedOutput}</p>
        </div>
      </div>
    </>
  );
}

export default Problem;
