import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function Problem() {
  return (
    <Card className="h-full">
      <CardHeader className="box-border border-b-2 items-center py-2 border-gray-100">
        <div className="w-full items-center">
          <ul className="flex justify-start list-none items-center ">
            <Button variant="link">
              <span className="text-lg">Question</span>
            </Button>
            <Button variant="link">
              <span className="text-lg">Submissions</span>
            </Button>
          </ul>
        </div>
      </CardHeader>
      <CardContent className="pt-2 flex flex-col justify-around ">
        <div className="my-5">
          <CardTitle className="text-xl py-2">Title</CardTitle>
          <p>Tag</p>
        </div>
        <CardDescription className="my-10 mt-5">
          <p className="text-lg text-black">
            Deploy your new project in one-click.
          </p>
        </CardDescription>
        <div className="my-5">
          <div className="bg-[#F4F4F4] p-3 text-lg rounded-lg">
            <p className="font-bold">Input:</p>
            <p className="bg-[#F4F4F4] w-full h-max">1 5 6 5</p>
          </div>
          <div className="bg-[#F4F4F4] my-5 p-3 text-lg rounded-lg">
            <p className="font-bold">Output:</p>
            <p className="bg-[#F4F4F4] w-full h-max">1 5 6 5</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
export default Problem;
