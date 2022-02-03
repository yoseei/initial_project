import { createContext, FC, useCallback, useEffect, useState } from "react";
import { Account } from "data/account";
import { HttpClient } from "lib/axios";
import { APIBaseUrl } from "constants/apiBaseUrl";
import PersistenceKeys from "constants/persistenceKeys";

type CurrentAccountContext = {
  account?: Account;
  isLoggedIn: boolean;
  setAccount: (account?: Account) => void;
  fetchMe: () => Promise<void>;
};

export const currentAccountContext = createContext<CurrentAccountContext>(
  {} as CurrentAccountContext
);

const CurrentAccountProvider: FC = ({ children }) => {
  const [account, setAccount] = useState<Account>();
  const token = localStorage.getItem(PersistenceKeys.TOKEN);

  const fetchMe = useCallback(async () => {
    console.log("fetchMe", token);
    if (!token) return;

    const [, p] = token.split(".");
    const payload = JSON.parse(atob(p));
    const accountId = payload.sub;

    if (typeof accountId !== "string") throw new Error("不正なtokenです");

    await HttpClient.get<Account>(`${APIBaseUrl.APP}/accounts/${accountId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setAccount(res.data);
    });
  }, [token, setAccount]);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);
  console.log("isLoggedIn", !!token);

  return (
    <currentAccountContext.Provider value={{ account, isLoggedIn: !!token, setAccount, fetchMe }}>
      {children}
    </currentAccountContext.Provider>
  );
};

export default CurrentAccountProvider;
