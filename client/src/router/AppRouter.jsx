import React, { useContext } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import SigninPage from "../modules/auth/SignInPage";
import AuthContext from "../config/context/auth-context";
import AdminLayout from "../components/layout/AdminLayout";
import AdminPage from "../components/layout/AdminPage";
import UserPage from "../components/layout/UserPage";
import Client from "../components/layout/Client";

const AppRouter = () => {
  const { user } = useContext(AuthContext);

  const validacionRole = (rolCorrecto) => {
    if (!user.signed) {
      return <Navigate to="/" />;
    }

    if (!rolCorrecto.includes(user.roles[0]?.name)) {
      return <Navigate to="/*" />;
    }

    return null;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {user.signed ? (
          <>
            {user.roles[0]?.name === "ADMIN_ROLE" && (
              <Route path="/" element={<AdminPage />}>
                {validacionRole(["ADMIN_ROLE"])}
                <Route path="admin" element={<>Bienvenido admin!</>} />
              </Route>
            )}
            {user.roles[0]?.name === "USER_ROLE" && (
              <Route path="/" element={<UserPage />}>
                {validacionRole(["USER_ROLE"])}
                <Route path="usuario" element={<>Bienvenido usuario!</>} />
              </Route>
            )}
            {user.roles[0]?.name === "CLIENT_ROLE" && (
              <Route path="/" element={<Client />}>
                {validacionRole(["CLIENT_ROLE"])}
                <Route path="client" element={<>Bienvenido cliente!</>} />
              </Route>
            )}
          </>
        ) : (
          <Route path="/" element={<SigninPage />} />
        )}
        <Route path="/*" element={<>404 not found</>} />
      </>
    )
  );
  return <RouterProvider router={router} />;
};

export default AppRouter;
