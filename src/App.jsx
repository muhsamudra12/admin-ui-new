import "./App.css";
import SignInPage from "./pages/SignIn.jsx";
import SignUpPage from "./pages/SignUp.jsx";
import ErrorPage from "./pages/error.jsx";
import DashboardPage from "./pages/dashboard.jsx";
import BalancePage from "./pages/balance.jsx"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Link } from "react-router-dom";


function App() {
  const myRouter = createBrowserRouter([
    /*{
      path: "/",
      element: (				
        <div className="flex justify-center items-center min-h-screen">
          <Link to="/login" className="p-2 m-5 bg-primary text-white">
            Login
          </Link>
          |
          <Link to="/register" className="p-2 m-5 bg-primary text-white">
            Register
          </Link>
        </div>
        ),
      errorElement: <ErrorPage/>,
    },*/
    {
      path: "/",
      element: <DashboardPage/>,
      errorElement: <ErrorPage/>,
    },
    {
      path: "/login",
      element: <SignInPage/>,
    },
    {
      path: "/register",
      element: <SignUpPage/>,
    },
    {
      path: "/balance",
      element: <BalancePage/>,
    },
  ]);

  return (
    <>
      <RouterProvider router={myRouter} />
    </>
  );
}

export default App;