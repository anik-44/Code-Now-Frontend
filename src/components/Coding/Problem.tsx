import {Difficulty} from "@/types/problemTypes";

interface ProblemProps {
    problem: any;
}

const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
        case Difficulty.Easy:
            return "bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-semibold";
        case Difficulty.Medium:
            return "bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs font-semibold";
        case Difficulty.Hard:
            return "bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-semibold";
        default:
            return "bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-semibold";
    }
};

function Problem({problem}: ProblemProps) {

    return (
        <>
            <div className="my-8 space-y-6">
                {/* Title and Difficulty */}
                <div>
                    <h1 className="text-3xl font-semibold text-gray-900 mb-1">{problem?.title}</h1>
                    {problem?.difficulty && (
                        <span
                            className={`inline-block px-1 py-1 text-sm font-medium rounded-full ${getDifficultyColor(
                                problem.difficulty
                            )}`}
                        >
        {problem.difficulty}
      </span>
                    )}
                </div>

                {/* Description */}
                <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
                    <p>{problem?.description}</p>
                </div>
            </div>

            {/* ✅ Test cases UI */}
            <div className="space-y-4 mt-4">
                <p className="text-xl font-bold">Test Cases</p>

                {problem?.examples &&
                    Object.entries(problem.examples).map(([lang, data]:[string, any]) => (
                        <div
                            key={lang}
                            className="bg-[#F4F4F4] rounded-lg p-4 border border-gray-300 shadow-sm"
                        >
                            <div className="space-y-2">
                                <div>
                                    <span className="font-medium text-gray-700">Input: </span>
                                    <code className="bg-white px-2 py-1 rounded text-gray-800">{data.input}</code>
                                </div>

                                <div>
                                    <span className="font-medium text-gray-700">Output: </span>
                                    <code className="bg-white px-2 py-1 rounded text-gray-800">{data.output}</code>
                                </div>

                                <div>
                                    <span className="font-medium text-gray-700">Explanation: </span>
                                    <p className="mt-1 text-gray-800">{data.explanation}</p>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            {/* Constraints */}
            {problem?.constraints && (
                <div className="mt-4">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Constraints</h2>
                    <ul className="list-disc list-inside space-y-1 text-gray-800">
                        {problem.constraints
                            .split("\n")
                            .filter(Boolean)
                            .map((constraint, idx) => (
                                <li key={idx}>{constraint}</li>
                            ))}
                    </ul>
                </div>
            )}

        </>
    );
}

export default Problem;
