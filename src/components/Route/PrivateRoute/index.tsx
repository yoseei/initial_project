import React, { FC } from "react";
import { useCurrentAccount } from "hooks/useCurrentAccount";
import { Navigate, Outlet } from "react-router-dom";
import { routes } from "constants/routes";

const PrivateRoute: FC = () => {
  const { isLoggedIn } = useCurrentAccount();
  return isLoggedIn ? <Outlet /> : <Navigate to={routes.signIn()} />;
};

export default PrivateRoute;
