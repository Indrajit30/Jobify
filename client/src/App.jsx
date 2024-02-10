import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddJob,
  Stats,
  AllJobs,
  Profile,
  Admin,
  EditJob
} from "./pages";

import {action as registerAction} from "./pages/Register"
import {action as loginAction} from "./pages/Login"
import {action as addjobAction} from "./pages/AddJob"
import {action as editjobAction} from "./pages/EditJob"
import {action as deletejobAction} from "./pages/DeleteJob"
import {action as profileAction} from "./pages/Profile"
import {loader as dashboardLoader} from "./pages/DashboardLayout"
import {loader as alljobsLoader} from "./pages/AllJobs"
import {loader as editjobLoader} from "./pages/EditJob"
import {loader as adminLoader} from "./pages/Admin"
import {loader as statsLoader} from "./pages/Stats"


const checkDarkTheme = () => {
  const isDarkTheme = localStorage.getItem("dark-theme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

checkDarkTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "dashboard",
        element: <DashboardLayout checkDarkTheme={checkDarkTheme} />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addjobAction,
          },
          {
            path: "stats",
            element: <Stats />,
            loader: statsLoader
          },
          {
            path: "all-jobs",
            element: <AllJobs />,
            loader: alljobsLoader,
          },
          {
            path: "profile",
            element: <Profile />,
            action: profileAction
          },
          {
            path: "admin",
            element: <Admin />,
            loader: adminLoader
          },
          {
            path: "edit-job/:id",
            element: <EditJob/>,
            loader: editjobLoader,
            action: editjobAction
          },
          {
            path: "delete-job/:id",
            action: deletejobAction
          }
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
