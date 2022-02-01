import { useState, VFC } from "react";
import { useCurrentAccount } from "hooks/useCurrentAccount";
import styles from "./style.module.scss";
import MyPageTop from "pages/MyPage/History/MyPageTop";
import History from "pages/MyPage/History";
import Sidebar from "components/molecules/Sidebar";
import classNames from "classnames";
import FlexBox from "components/atoms/FlexBox";
import ProfileModal from "pages/MyPage/ProfileModal";

export type ProfileFormData = {
  lastName: string;
  firstName: string;
  address: string;
  gender: string;
  date: string;
};

const MyPage: VFC = () => {
  const [profileData, setProfileData] = useState<ProfileFormData>();
  const [isModal, setIsModal] = useState<boolean>(true);
  const { signOut } = useCurrentAccount();
  return (
    <>
      <FlexBox>
        <div className={styles.sidebarContainer}>
          <Sidebar />
        </div>
        <FlexBox
          className={classNames(styles.profileContainer)}
          direction="column"
          style={{ flex: "1" }}
        >
          <MyPageTop isModal={isModal} setIsModal={setIsModal} profileData={profileData} />
          <History
            historyType="職歴"
            className={classNames(styles.mdMarginTop, styles.lgMarginBottom)}
          />
          <History historyType="学歴" />
        </FlexBox>
      </FlexBox>
      {isModal ? (
        <>
          <div className={styles.overLay} />
          <ProfileModal setIsModal={setIsModal} isModal={isModal} setProfileData={setProfileData} />
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default MyPage;
