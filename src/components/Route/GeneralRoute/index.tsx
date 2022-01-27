import React, { FC } from "react";
import { useCurrentAccount } from "hooks/useCurrentAccount";
import { Navigate, Outlet } from "react-router-dom";
import { routes } from "constants/routes";

const GeneralRoute: FC = () => {
  const { isLoggedIn } = useCurrentAccount();
  return isLoggedIn ? <Navigate to={routes.myPage()} /> : <Outlet />;
};

export default GeneralRoute;
