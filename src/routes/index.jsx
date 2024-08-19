import { createBrowserRouter } from "react-router-dom";

import Login from "@/pages/login.jsx";

import PrivateRoute from "@/routes/private-route.jsx";
import Home from "@/pages/home.jsx";
import NotFound from "@/pages/not-found.jsx";
import Register from "@/pages/register.jsx";
import Layouts from "@/layouts/index.jsx";
import Resource from "@/pages/resource.jsx";

const router = createBrowserRouter([
  {
    element: <Layouts />,
    children: [
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/resources/:resourceId",
            element: <Resource />,
          },
        ],
      },
    ],
  },
]);

export default router;
