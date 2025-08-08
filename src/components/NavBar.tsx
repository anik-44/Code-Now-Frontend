import {RocketIcon} from "@radix-ui/react-icons";
import AvatarComponent from "./Avatar";
import Logo from "./Logo";

export default function NavBar() {
  return (
    <div className="flex flex-row justify-between items-center h-16 border-b-2 border-gray px-2">
      <Logo />
      <div>
        <h1 className="flex flex-row justify-center items-center text-3xl font-bold font-serif text-blue-900">
          <span>Code Now</span>
          <RocketIcon className="w-5 h-5 mx-2" />
        </h1>
      </div>
      <div className="flex flex-row justify-around items-center text-4xl mr-12">
        <AvatarComponent />
      </div>
    </div>
  );
}
