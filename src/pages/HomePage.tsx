import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import * as ScrollArea from "@radix-ui/react-scroll-area";

import NavBar from "@/components/NavBar";
import problemService from "@/services/problemService";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {CaretDownIcon} from "@radix-ui/react-icons";
import {Difficulty} from "@/types/problemTypes";

function HomePage() {
    const [problems, setProblems] = useState<any>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [difficultyFilter, setDifficultyFilter] = useState("ALL");
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProblems() {
            const response = await problemService.getAllProblems({searchQuery, difficultyFilter, page});
            setProblems(response.problems);
            setTotalPage(response.total)
        }

        fetchProblems();
    }, [difficultyFilter, page, searchQuery]);


    const clickHandler = (id: string) => navigate(`/problems/${id}`);


    const previousHandler = () => {
        setPage((prev) => Math.max(prev - 1, 1));
    };

    const nextHandler = () => {
        setPage((prev) => Math.min(prev + 1, totalPage));
    };

    return (
        <div className="flex flex-col min-h-screen w-screen bg-gray-100">
            <NavBar/>

            {/* Main Content */}
            <main className="flex-grow w-full max-w-5xl mx-auto p-4">
                {/* Search + Sort */}
                <div className="flex flex-wrap items-end justify-between mb-6 gap-4">
                    <div className="flex flex-col">
                        <span className="mb-2 text-sm text-gray-700 font-medium">Search:</span>
                        <input
                            type="text"
                            placeholder="Search problems..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-md w-full max-w-sm"
                        />
                    </div>

                    <div className="flex flex-col">
                        <span className="mb-2 text-sm text-gray-700 font-medium">Sort by:</span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-[140px] justify-between">
                                    {difficultyFilter}
                                    <CaretDownIcon className="ml-2"/>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuRadioGroup
                                    value={difficultyFilter}
                                    onValueChange={(value) => setDifficultyFilter(value)}
                                >
                                    <DropdownMenuRadioItem value="ALL">All</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value={Difficulty.Easy}>Easy</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value={Difficulty.Medium}>Medium</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value={Difficulty.Hard}>Hard</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Table */}
                <ScrollArea.Root className="rounded border bg-white shadow-md overflow-auto">
                    <ScrollArea.Viewport className="w-full">
                        <table className="w-full table-auto border-collapse text-left">
                            <thead className="bg-gray-200 text-gray-800 text-sm uppercase">
                            <tr>
                                <th className="px-4 py-2">Difficulty</th>
                                <th className="px-4 py-2">Title</th>
                                <th className="px-4 py-2">Tags</th>
                                <th className="px-4 py-2 text-right">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {problems.map((problem) => (
                                <tr key={problem.id} className="border-t hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium text-sm text-gray-700">
                                        {problem.difficulty}
                                    </td>
                                    <td className="px-4 py-3 text-blue-700 font-semibold text-md">
                                        {problem.title}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex flex-wrap gap-1">
                                            {problem.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2 py-0.5 text-xs bg-gray-200 rounded-full text-gray-700"
                                                >
                          {tag}
                        </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <Button
                                            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded"
                                            onClick={() => clickHandler(problem.id)}
                                        >
                                            Code
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </ScrollArea.Viewport>
                </ScrollArea.Root>
            </main>

            <div className="flex justify-center gap-4">
                <Button variant="outline" className="w-24" onClick={previousHandler}
                        disabled={page == 1}>Previous</Button>
                <Button variant="outline" className="w-24" onClick={nextHandler}
                        disabled={totalPage === 0 || page == totalPage}>Next</Button>
            </div>
            {/* Footer */}
            <footer className="w-full border-t bg-white py-4 px-6 mt-8">
                <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-5xl mx-auto">
                    <span className="text-sm text-gray-500 mb-2 md:mb-0">&copy; 2025 Code Now. All rights reserved.</span>
                </div>
            </footer>
        </div>
    );
}

export default HomePage;
