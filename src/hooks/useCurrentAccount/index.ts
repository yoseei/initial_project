import { useCallback, useContext } from "react";
import { currentAccountContext } from "hooks/useCurrentAccount/currentAccountContext";
import { Account } from "data/account";
import { useNavigate } from "react-router-dom";
import { routes } from "constants/routes";

interface CurrentAccountUseCase {
  account?: Account;
  isLoggedIn: boolean;
  refetchAccount: () => Promise<void>;
  signOut: () => void;
}

export const useCurrentAccount = (): CurrentAccountUseCase => {
  const { account, isLoggedIn, setAccount, fetchMe } = useContext(currentAccountContext);
  const navigate = useNavigate();

  const signOut = useCallback(() => {
    localStorage.clear();
    setAccount(undefined);
    navigate(routes.signIn());
  }, [setAccount, navigate]);

  return { account, isLoggedIn, refetchAccount: fetchMe, signOut };
};
