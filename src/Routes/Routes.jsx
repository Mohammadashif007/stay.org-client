import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";

export const route = createBrowserRouter([
    {
        path: "/",
        element: <HomePage></HomePage>,
    },
    {
        path: "/register",
        element: <RegisterPage></RegisterPage>
    }, 
    {
        path: "/login",
        element: <LoginPage></LoginPage>
    }
])