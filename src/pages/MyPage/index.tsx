import React, { useEffect, useState, VFC } from "react";
import { useCurrentAccount } from "hooks/useCurrentAccount";
import styles from "./style.module.scss";
import MyPageTop from "pages/MyPage/History/MyPageTop";
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
import "antd/dist/antd.css";

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
  const [workHistoryData, setWorkHistoryData] = useState<WorkHistoryData[] | undefined>();
  const [mappedWorkHistory, setMappedWorkHistory] = useState<WorkHistoryData>();
  const [isModal, setIsModal] = useState<boolean>(true);
  const [isEditWorkHistoryModal, setIsEditWorkHistoryModal] = useState<boolean>(false);
  const [isCreateWorkHistoryModal, setIsCreateWorkHistoryModal] = useState<boolean>(false);
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
  }, [account?.id, isCreateWorkHistoryModal]);

  const openEditWorkHistoryModal = (workHistory: WorkHistoryData) => {
    setIsEditWorkHistoryModal(!isEditWorkHistoryModal);
    setMappedWorkHistory(workHistory);
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

  const createWorkHistory: SubmitHandler<WorkHistoryFormData> = async (data) => {
    await HttpClient.request<WorkHistoryFormData>({
      method: "POST",
      url: `${APIBaseUrl.APP}/accounts/${account?.id}/work_histories`,
      data: { workHistory: data },
      headers: {
        "content-type": "application/json",
      },
    });
    setIsCreateWorkHistoryModal(!isCreateWorkHistoryModal);
  };

  const editWorkHistory: SubmitHandler<WorkHistoryData> = async (data) => {
    const res = await HttpClient.request<WorkHistoryData>({
      method: "PATCH",
      url: `${APIBaseUrl.APP}/work_histories/${mappedWorkHistory?.id}`,
      data: { work_history: data },
      headers: {
        "Content-type": "application/json",
      },
    });
    const newWorkHistories = workHistoryData?.map((workHistory) => {
      if (workHistory.id === res.data.id) return res.data;
      else return workHistory;
    });
    if (!newWorkHistories) return;
    setWorkHistoryData(newWorkHistories);
    setIsEditWorkHistoryModal(!isEditWorkHistoryModal);
  };

  const deleteWorkHistory = async (workHistory: WorkHistoryData) => {
    await HttpClient.request({
      method: "DELETE",
      url: `${APIBaseUrl.APP}/work_histories/${mappedWorkHistory?.id}`,
    });
    const newWorkHistory = workHistoryData?.filter((filteredWorkHistory) => {
      return filteredWorkHistory.id !== workHistory.id;
    });

    setWorkHistoryData(newWorkHistory);
    setIsEditWorkHistoryModal(!isEditWorkHistoryModal);
  };

  const workHistory = workHistoryData?.map((workHistory) => (
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
            {workHistory}
            <Button
              color="lightGray"
              type="button"
              className={styles.mdMarginTop}
              onClick={openCreateWorkHistoryModal}
            >
              職歴を追加
            </Button>
          </>
          {/*<History*/}
          {/*  historyType="学歴"*/}
          {/*  setIsWorkHistoryModal={setIsWorkHistoryModal}*/}
          {/*  isWorkHistoryModal={isWorkHistoryModal}*/}
          {/*/>*/}
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
          mappedWorkHistory={mappedWorkHistory}
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
