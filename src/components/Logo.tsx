import { RocketIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

function Logo() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-row text-4xl ml-5">
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          <RocketIcon className="w-9 h-9" />
        </button>
      </div>
    </>
  );
}

export default Logo;
