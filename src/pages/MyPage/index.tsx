import React, { useContext, useEffect, useState, VFC } from "react";
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
import AcademicHistoryModal from "pages/MyPage/AcademicHistoryModal";
import { currentAccountContext } from "hooks/useCurrentAccount/currentAccountContext";

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

export type AcademicHistoryData = {
  id: string;
  name: string;
  faculty: string;
  sinceDate: string;
  untilDate: string;
  type: string;
  created_at: string;
  updated_at: string;
};

const MyPage: VFC = () => {
  const { account } = useCurrentAccount();
  const { setAccount } = useContext(currentAccountContext);
  const [workHistoryData, setWorkHistoryData] = useState<WorkHistoryData[]>();
  const [academicHistoryData, setAcademicHistoryData] = useState<AcademicHistoryData[]>();
  const [workHistory, setWorkHistory] = useState<WorkHistoryData>();
  const [academicHistory, setAcademicHistory] = useState<AcademicHistoryData>();
  const [isModal, setIsModal] = useState<boolean>(true);
  const [isEditWorkHistoryModal, setIsEditWorkHistoryModal] = useState<boolean>(false);
  const [isEditAcademicHistoryModal, setIsEditAcademicHistoryModal] = useState<boolean>(false);
  const [isCreateWorkHistoryModal, setIsCreateWorkHistoryModal] = useState<boolean>(false);
  const [isCreateAcademicHistoryModal, setIsCreateAcademicHistoryModal] = useState<boolean>(false);
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

  const fetchAcademicHistory = async () => {
    if (account) {
      const res = await HttpClient.request({
        method: "GET",
        url: `${APIBaseUrl.APP}/accounts/${account?.id}/academic_histories`,
        headers: { ContentType: "application/json" },
      });
      setAcademicHistoryData(res.data.academicHistories);
    }
  };

  useEffect(() => {
    if (!account) return;
    fetchWorkHistory();
    fetchAcademicHistory();
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

  const openEditAcademicHistoryModal = (academicHistory: AcademicHistoryData) => {
    setIsEditAcademicHistoryModal(!isEditAcademicHistoryModal);
    setAcademicHistory(academicHistory);
  };
  const openCreateAcademicHistoryModal = () => {
    setIsCreateAcademicHistoryModal(!isCreateAcademicHistoryModal);
  };
  const closeEditAcademicHistoryModal = () => {
    setIsEditAcademicHistoryModal(!isEditAcademicHistoryModal);
  };
  const closeCreateAcademicHistoryModal = () => {
    setIsCreateAcademicHistoryModal(!isCreateAcademicHistoryModal);
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

  const editAcademicHistory: SubmitHandler<AcademicHistoryData> = async (data) => {
    const res = await HttpClient.request({
      method: "PATCH",
      url: `${APIBaseUrl.APP}/academic_histories/${academicHistory?.id}`,
      data: { academic_history: data },
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!academicHistoryData) return;
    const newAcademicHistories = academicHistoryData.map((academicHistory) => {
      if (academicHistory.id === res.data.id) return res.data;
      return academicHistory;
    });
    setAcademicHistoryData(newAcademicHistories);
    setIsEditAcademicHistoryModal(!isEditAcademicHistoryModal);
  };

  const deleteAcademicHistory = async (academicHistory: AcademicHistoryData) => {
    await HttpClient.request({
      method: "DELETE",
      url: `${APIBaseUrl.APP}/academic_histories/${academicHistory?.id}`,
    });

    if (!academicHistoryData) return;
    const newAcademicHistories = academicHistoryData.filter((filteredAcademicHistory) => {
      return filteredAcademicHistory.id !== academicHistory.id;
    });
    setAcademicHistoryData(newAcademicHistories);
    setIsEditAcademicHistoryModal(!isEditAcademicHistoryModal);
  };

  const createAcademicHistory: SubmitHandler<AcademicHistoryData> = async (data) => {
    const res = await HttpClient.request<AcademicHistoryData>({
      method: "POST",
      url: `${APIBaseUrl.APP}/accounts/${account?.id}/academic_histories`,
      data: { academicHistory: data },
      headers: {
        "content-type": "application/json",
      },
    });
    if (!academicHistoryData) return;
    setAcademicHistoryData([...academicHistoryData, res.data]);
    setIsCreateAcademicHistoryModal(!isCreateAcademicHistoryModal);
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

  const academicHistoryTables = academicHistoryData?.map((academicHistory) => (
    <div className={styles.root} key={academicHistory.id}>
      <div className={styles.spaceBetween}>
        <FlexBox>
          <div className={classNames(styles.alignItemsCenter)}>
            <BodyTextSmall color="darkGray" className={styles.smMarginRight}>
              {academicHistory.sinceDate} - {academicHistory.untilDate}
            </BodyTextSmall>
          </div>
          <div>
            <BodyTextLarge bold className={styles.xsMarginBottom}>
              {academicHistory.name}
            </BodyTextLarge>
            <BodyText color="darkGray">{academicHistory.faculty}</BodyText>
          </div>
        </FlexBox>
        <div className={styles.alignItemsCenter}>
          <AntButton onClick={() => openEditAcademicHistoryModal(academicHistory)}>
            編集する
          </AntButton>
        </div>
      </div>
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
            profileData={account}
            signOut={signOut}
          />
          <div className={styles.lgMarginTop}>
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
          </div>

          <div className={styles.lgMarginTop}>
            <SectionTitle className={styles.mdMarginBottom}>学歴</SectionTitle>
            {academicHistoryTables}
            <Button
              color="lightGray"
              type="button"
              className={styles.mdMarginTop}
              onClick={openCreateAcademicHistoryModal}
            >
              学歴を追加
            </Button>
          </div>
        </FlexBox>
      </FlexBox>
      {isModal ? (
        <>
          <div className={styles.overLay} />
          <ProfileModal
            setIsModal={setIsModal}
            isModal={isModal}
            setProfileData={setAccount}
            profileData={account}
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
      {isEditAcademicHistoryModal && (
        <AcademicHistoryModal
          academicHistory={academicHistory}
          onSubmit={editAcademicHistory}
          deleteAcademicHistory={deleteAcademicHistory}
          cancel={closeEditAcademicHistoryModal}
          visible={isEditAcademicHistoryModal}
        />
      )}
      {isCreateAcademicHistoryModal && (
        <AcademicHistoryModal
          cancel={closeCreateAcademicHistoryModal}
          onSubmit={createAcademicHistory}
          visible={isCreateAcademicHistoryModal}
        />
      )}
    </>
  );
};

export default MyPage;
