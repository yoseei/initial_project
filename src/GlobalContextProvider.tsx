import { FC } from "react";
import CurrentAccountProvider from "hooks/useCurrentAccount/currentAccountContext";

const GlobalContextProvider: FC = ({ children }) => {
  return <CurrentAccountProvider>{children}</CurrentAccountProvider>;
};

export default GlobalContextProvider;
