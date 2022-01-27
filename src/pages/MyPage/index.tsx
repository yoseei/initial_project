import { VFC } from "react";
import { useCurrentAccount } from "hooks/useCurrentAccount";
import styles from "./style.module.scss";
import MyPageTop from "components/organisms/MyPageTop";

const MyPage: VFC = () => {
  const { signOut } = useCurrentAccount();
  return (
    <div className={styles.root}>
      <MyPageTop />
      {/*<History />*/}
    </div>
  );
};

export default MyPage;
