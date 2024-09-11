import { Provider } from "react-redux";
import "./App.css";
import Protected from "./components/auth/Protected";
import ProblemAndEditorWrapper from "./components/Coding/ProblemAndEditorWrapper";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "@/components/ui/toaster";
// import ProblemAndEditorWrapper from "./components/Coding/ProblemAndEditorWrapper";
// import ProblemNavBar from "./components/Coding/ProblemNavBar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./store/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected authentication={true}>
        <HomePage />,
      </Protected>
    ),
  },
  {
    path: "/register",
    element: (
      <Protected authentication={false}>
        <Register />,
      </Protected>
    ),
  },
  {
    path: "/login",
    element: (
      <Protected authentication={false}>
        <Login />
      </Protected>
    ),
  },
  {
    path: "/problems/:slug_id",
    element: (
      <Protected authentication={true}>
        <ProblemAndEditorWrapper />
      </Protected>
    ),
  },
]);

function App() {
  return (
    <>
      <Provider store={store}>
        <Toaster />
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
