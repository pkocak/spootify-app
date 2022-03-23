import { Navigate, Outlet } from "react-router-dom"
import { Auth, Discover, ErrorPage } from "../pages"

const routes = (token) => [
  {
    element: token ? <Outlet /> : <Navigate to="/login" />,
    path: "/",
    children: [
      { path: "*", element: <ErrorPage /> },
      { path: "/", element: <Navigate to="discover" /> },
      { path: "discover", element: <Discover /> }
    ]
  },
  {
    element: !token ? <Outlet /> : <Navigate to="/discover" />,
    path: "/",
    children: [
      { path: "*", element: <Navigate to="login" /> },
      { path: "login", element: <Auth /> }
    ]
  }
]

export default routes;