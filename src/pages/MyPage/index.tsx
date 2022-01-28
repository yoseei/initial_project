import { VFC } from "react";
import { useCurrentAccount } from "hooks/useCurrentAccount";
import styles from "./style.module.scss";
import MyPageTop from "components/organisms/MyPageTop";
import History from "components/organisms/History";
import Sidebar from "components/molecules/Sidebar";
import classNames from "classnames";

const MyPage: VFC = () => {
  const { signOut } = useCurrentAccount();
  return (
    <div className={classNames(styles.root, styles.row)}>
      <div className={styles.sidebarContainer}>
        <Sidebar />
      </div>
      <div className={classNames(styles.flex1, styles.profileContainer)}>
        <MyPageTop />
        <History historyType="職歴" className={styles.lgMarginBottom} />
        <History historyType="学歴" />
      </div>
    </div>
  );
};

export default MyPage;
