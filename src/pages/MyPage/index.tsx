import { useEffect, useState, VFC } from "react";
import { useCurrentAccount } from "hooks/useCurrentAccount";
import styles from "./style.module.scss";
import MyPageTop from "pages/MyPage/History/MyPageTop";
import History from "pages/MyPage/History";
import Sidebar from "components/molecules/Sidebar";
import classNames from "classnames";
import FlexBox from "components/atoms/FlexBox";
import ProfileModal from "pages/MyPage/ProfileModal";
import WorkHistoryModal from "pages/MyPage/WorkHistoryModal";
import { HttpClient } from "lib/axios";
import { APIBaseUrl } from "constants/apiBaseUrl";

export type ProfileFormData = {
  lastName: string;
  firstName: string;
  address: string;
  gender: string;
  date: string;
  avatarUrl: string;
  birthday: string;
};

export type WorkHistoryFormData = {
  name: string;
  position: string;
  sinceDate: string;
  untilDate: string;
  isEmployed: boolean;
  department: string;
};

export type WorkHistoryData = {
  id: string;
  name: string;
  position: string;
  sinceDate: string;
  untilDate: string;
  isEmployed: boolean;
  department: string;
  createdAt: string;
  updatedAt: string;
};

const MyPage: VFC = () => {
  const [profileData, setProfileData] = useState<ProfileFormData>();
  const [workHistoryData, setWorkHistoryData] = useState<WorkHistoryData[]>();
  const [isModal, setIsModal] = useState<boolean>(true);
  const [isWorkHistoryModal, setIsWorkHistoryModal] = useState<boolean>(false);
  const { signOut } = useCurrentAccount();
  const { account } = useCurrentAccount();

  useEffect(() => {
    (async () => {
      if (account) {
        const res = await HttpClient.request({
          method: "GET",
          url: `${APIBaseUrl.APP}/accounts/${account?.id}/work_histories`,
          headers: { ContentType: "application/json" },
        });
        setWorkHistoryData(res.data.workHistories);
      }
    })();
  }, [account?.id, isWorkHistoryModal]);

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
          <MyPageTop
            isModal={isModal}
            setIsModal={setIsModal}
            profileData={profileData}
            signOut={signOut}
          />
          <History
            historyType="職歴"
            className={classNames(styles.mdMarginTop, styles.lgMarginBottom)}
            setIsWorkHistoryModal={setIsWorkHistoryModal}
            isWorkHistoryModal={isWorkHistoryModal}
            workHistoryData={workHistoryData}
          />
          <History
            historyType="学歴"
            setIsWorkHistoryModal={setIsWorkHistoryModal}
            isWorkHistoryModal={isWorkHistoryModal}
          />
        </FlexBox>
      </FlexBox>
      {isModal ? (
        <>
          <div className={styles.overLay} />
          <ProfileModal
            setIsModal={setIsModal}
            isModal={isModal}
            setProfileData={setProfileData}
            profileData={profileData}
          />
        </>
      ) : (
        ""
      )}
      {isWorkHistoryModal ? (
        <>
          <div className={styles.overLay} />
          <WorkHistoryModal
            setIsWorkHistoryModal={setIsWorkHistoryModal}
            isWorkHistoryModal={isWorkHistoryModal}
          />
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default MyPage;
