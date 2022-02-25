import React, { useEffect, useState, VFC } from "react";
import { useCurrentAccount } from "hooks/useCurrentAccount";
import styles from "./style.module.scss";
import MyPageTop from "pages/MyPage/MyPageTop";
import Sidebar from "components/molecules/Sidebar";
import classNames from "classnames";
import FlexBox from "components/atoms/FlexBox";
import ProfileModal from "pages/MyPage/ProfileModal";
import WorkHistoryModal from "pages/MyPage/WorkHistoryModal";
import { HttpClient } from "lib/axios";
import { APIBaseUrl } from "constants/apiBaseUrl";
import { BodyText, BodyTextLarge, BodyTextSmall, SectionTitle } from "components/atoms/Text";
import { Button as AntButton } from "antd";
import Button from "components/atoms/Button";
import { SubmitHandler } from "react-hook-form";
import { Account } from "data/account";

export type ProfileFormData = {
  lastName: string;
  firstName: string;
  gender: string;
  date: string;
  avatarUrl: string;
  birthday: string;
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
  const { account } = useCurrentAccount();
  const [profileData, setProfileData] = useState<Account | undefined>(account);
  const [workHistoryData, setWorkHistoryData] = useState<WorkHistoryData[]>();
  const [workHistory, setWorkHistory] = useState<WorkHistoryData>();
  const [isModal, setIsModal] = useState<boolean>(true);
  const [isEditWorkHistoryModal, setIsEditWorkHistoryModal] = useState<boolean>(false);
  const [isCreateWorkHistoryModal, setIsCreateWorkHistoryModal] = useState<boolean>(false);
  const { signOut } = useCurrentAccount();

  const fetchWorkHistory = async () => {
    if (account) {
      const res = await HttpClient.request({
        method: "GET",
        url: `${APIBaseUrl.APP}/accounts/${account?.id}/work_histories`,
        headers: { ContentType: "application/json" },
      });
      setWorkHistoryData(res.data.workHistories);
    }
  };

  useEffect(() => {
    if (!account) return;
    setProfileData(account);
    fetchWorkHistory();
  }, [account?.id]);

  const openEditWorkHistoryModal = (workHistory: WorkHistoryData) => {
    setIsEditWorkHistoryModal(!isEditWorkHistoryModal);
    setWorkHistory(workHistory);
  };

  const openCreateWorkHistoryModal = () => {
    setIsCreateWorkHistoryModal(!isCreateWorkHistoryModal);
  };

  const closeEditWorkHistoryModal = () => {
    setIsEditWorkHistoryModal(!isEditWorkHistoryModal);
  };
  const closeCreateWorkHistoryModal = () => {
    setIsCreateWorkHistoryModal(!isCreateWorkHistoryModal);
  };

  const createWorkHistory: SubmitHandler<WorkHistoryData> = async (data) => {
    const res = await HttpClient.request<WorkHistoryData>({
      method: "POST",
      url: `${APIBaseUrl.APP}/accounts/${account?.id}/work_histories`,
      data: { workHistory: data },
      headers: {
        "content-type": "application/json",
      },
    });
    if (!workHistoryData) return;
    setWorkHistoryData([...workHistoryData, res.data]);
    setIsCreateWorkHistoryModal(!isCreateWorkHistoryModal);
  };

  const editWorkHistory: SubmitHandler<WorkHistoryData> = async (data) => {
    const res = await HttpClient.request<WorkHistoryData>({
      method: "PATCH",
      url: `${APIBaseUrl.APP}/work_histories/${workHistory?.id}`,
      data: { work_history: data },
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!workHistoryData) return;

    const newWorkHistories = workHistoryData.map((workHistory) => {
      if (workHistory.id === res.data.id) return res.data;
      else return workHistory;
    });

    setWorkHistoryData(newWorkHistories);
    setIsEditWorkHistoryModal(!isEditWorkHistoryModal);
  };

  const deleteWorkHistory = async (workHistory: WorkHistoryData) => {
    await HttpClient.request({
      method: "DELETE",
      url: `${APIBaseUrl.APP}/work_histories/${workHistory?.id}`,
    });

    if (!workHistoryData) return;
    const newWorkHistory = workHistoryData.filter((filteredWorkHistory) => {
      return filteredWorkHistory.id !== workHistory.id;
    });

    setWorkHistoryData(newWorkHistory);
    setIsEditWorkHistoryModal(!isEditWorkHistoryModal);
  };

  const workHistoryTables = workHistoryData?.map((workHistory) => (
    <div className={styles.root} key={workHistory.id}>
      <div className={styles.spaceBetween}>
        <FlexBox>
          <div className={classNames(styles.alignItemsCenter)}>
            <BodyTextSmall color="darkGray" className={styles.smMarginRight}>
              {workHistory.sinceDate} - {workHistory.untilDate}
            </BodyTextSmall>
          </div>
          <div>
            <BodyTextLarge bold className={styles.xsMarginBottom}>
              {workHistory.name}
            </BodyTextLarge>
            <BodyText color="darkGray">{workHistory.position}</BodyText>
          </div>
        </FlexBox>
        <div className={styles.alignItemsCenter}>
          <AntButton onClick={() => openEditWorkHistoryModal(workHistory)}>編集する</AntButton>
        </div>
      </div>
      <BodyTextLarge color="darkGray" className={styles.xsMarginTop}>
        {workHistory.department}
      </BodyTextLarge>
    </div>
  ));

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
          <>
            <SectionTitle className={styles.mdMarginBottom}>職歴</SectionTitle>
            {workHistoryTables}
            <Button
              color="lightGray"
              type="button"
              className={styles.mdMarginTop}
              onClick={openCreateWorkHistoryModal}
            >
              職歴を追加
            </Button>
          </>
          // Todo: 上記職歴のように学歴を記述していく
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
      {isEditWorkHistoryModal && (
        <WorkHistoryModal
          workHistory={workHistory}
          onSubmit={editWorkHistory}
          deleteWorkHistory={deleteWorkHistory}
          cancel={closeEditWorkHistoryModal}
          visible={isEditWorkHistoryModal}
        />
      )}
      {isCreateWorkHistoryModal && (
        <WorkHistoryModal
          cancel={closeCreateWorkHistoryModal}
          onSubmit={createWorkHistory}
          visible={isCreateWorkHistoryModal}
        />
      )}
    </>
  );
};

export default MyPage;
