import React, { useContext, createContext } from "react";
import { Outlet, redirect, useLoaderData , useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { SmallSideBar, BigSideBar, Navbar } from "../components/index";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-user");
    return data;
  } catch (error) {
    return redirect("/");
  }
};

const DashboardContext = createContext();

export default function DashboardLayout({ checkDarkTheme }) {
  const { user } = useLoaderData();
  const navigate = useNavigate()

  const [showSideBar, setShowSideBar] = React.useState(false);
  const [darkTheme, setDarkTheme] = React.useState(checkDarkTheme());

  const toggleDarkTheme = (event) => {
    const newDarkTheme = !darkTheme;
    setDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("dark-theme", newDarkTheme);
  };
  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  const logoutUser = async () => {
    navigate("/")
    await customFetch.get("/auth/logout")
    toast.success("Logging Out..")
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSideBar,
        darkTheme,
        toggleDarkTheme,
        toggleSideBar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSideBar />
          <BigSideBar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet context={{ user }} /> 
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
}
export const useDashboardContext = () => useContext(DashboardContext);
