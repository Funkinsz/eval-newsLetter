import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Errorpage from "../pages/errorpage/Errorpage";
import Homepage from "../pages/homepage/Homepage";
import Login from "../pages/logs/Login";
import Register from "../pages/logs/Register";
import { userLoader } from "../Loader/userLoader";
import Profile from "../pages/profile/profile";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import Admin from "../pages/admin/Admin";
import Insert from "../pages/admin/Insert";
import ProtectedAdmin from "../components/ProtectedRoute/ProtectedAdmin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: userLoader,
    errorElement: <Errorpage />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Register />,
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin",
        element: (
          <ProtectedAdmin>
            <Admin />
          </ProtectedAdmin>
        ),
      },
      {
        path: "/insert",
        element: (
          <ProtectedAdmin>
            <Insert />
          </ProtectedAdmin>
        ),
      },
    ],
  },
]);
