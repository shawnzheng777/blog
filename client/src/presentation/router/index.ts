import { RouteConfig } from "react-router-config";
import Home from "@/presentation/pages/home";
import Some from "@/presentation/pages/some";
import Other from "@/presentation/pages/other";
import Login from "@/presentation/pages/login";
import Register from "@/presentation/pages/register";

export const routerConfig: RouteConfig[] = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/some",
    component: Some,
  },
  {
    path: "/other",
    component: Other,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
];
