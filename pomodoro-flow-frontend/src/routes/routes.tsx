import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/auth/login";
import LandingPage from "../pages/landing/landing";
import RegisterPage from "../pages/auth/register";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/register",
        element: <RegisterPage />
    },
    {
        path: "/forgot-password",
        element: <LandingPage /> // for now...
    }
])