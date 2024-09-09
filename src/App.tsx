import "./App.css";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import ProblemAndEditorWrapper from "./components/Coding/ProblemAndEditorWrapper";
// import ProblemNavBar from "./components/Coding/ProblemNavBar";

function App() {
  return (
    <>
      <div className="h-screen w-screen flex justify-center">
        {/* <ProblemNavBar /> */}
        {/* <div className="p-2">
          <ProblemAndEditorWrapper />
        </div> */}
        <div className=" p-10 h-screen my-auto flex justify-center items-center ">
          {/* <Register /> */}
          <Login />
        </div>
        {/* <HomePage /> */}
      </div>
    </>
  );
}

export default App;
