import "./App.css";
import SignInPage from "./pages/signIn.jsx";
import SignUpPage from "./pages/signUp.jsx";
import ErrorPage from "./pages/error.jsx";
import DashboardPage from "./pages/dashboard.jsx";
import BalancePage from "./pages/balance.jsx";
import ExpensesPage from "./pages/expense.jsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/authContext.jsx";

function App() {
  const { user } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  const NotRequireAuth = ({ children }) => {
    return user ? <Navigate to="/" /> : children;
  };

  const myRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <RequireAuth>
          <DashboardPage />
        </RequireAuth>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: (
        <NotRequireAuth>
          <SignInPage />
        </NotRequireAuth>
      ),
    },
    {
      path: "/register",
      element: (
        <NotRequireAuth>
          <SignUpPage />
        </NotRequireAuth>
      ),
    },
    {
      path: "/balance",
      element: (
        <RequireAuth>
          <BalancePage />
        </RequireAuth>
      ),
    },
    {
      path: "/expense",
      element: (
        <RequireAuth>
          <ExpensesPage />
        </RequireAuth>
      ),
    },
  ]);

  return <RouterProvider router={myRouter} />;
}

export default App;
