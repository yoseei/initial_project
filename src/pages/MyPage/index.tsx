import { VFC } from "react";
import { useCurrentAccount } from "hooks/useCurrentAccount";
import styles from "./style.module.scss";
import MyPageTop from "pages/MyPage/History/MyPageTop";
import History from "pages/MyPage/History";
import Sidebar from "components/molecules/Sidebar";
import classNames from "classnames";
import FlexBox from "components/atoms/FlexBox";

const MyPage: VFC = () => {
  const { signOut } = useCurrentAccount();
  return (
    <FlexBox>
      <div className={styles.sidebarContainer}>
        <Sidebar />
      </div>
      <FlexBox
        className={classNames(styles.profileContainer)}
        direction="column"
        style={{ flex: "1" }}
      >
        <MyPageTop />
        <History
          historyType="職歴"
          className={classNames(styles.mdMarginTop, styles.lgMarginBottom)}
        />
        <History historyType="学歴" />
      </FlexBox>
    </FlexBox>
  );
};

export default MyPage;
