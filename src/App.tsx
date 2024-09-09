import "./App.css";
import NavBar from "./components/Coding/NavBar";
import ProblemAndEditorWrapper from "./components/Coding/ProblemAndEditorWrapper";

function App() {
  return (
    <>
      <div className="h-screen w-screen ">
        <NavBar />
        <div className="p-2">
          <ProblemAndEditorWrapper />
        </div>
      </div>
    </>
  );
}

export default App;
