import React, { FC } from "react";
import ProfileRow from "pages/MyPage/History/ProfileRow";
import { BodyTextSmall, SectionTitle } from "components/atoms/Text";
import Button from "components/atoms/Button";
import styles from "pages/MyPage/History/MyPageTop/style.module.scss";
import ProfileImage from "components/atoms/ProfileImage";
import classNames from "classnames";
import FlexBox from "components/atoms/FlexBox";
import { ProfileFormData } from "pages/MyPage/index";

type MyPageProps = {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  isModal: boolean;
  profileData?: ProfileFormData;
};
const MyPageTop: FC<MyPageProps> = ({ setIsModal, isModal, profileData }) => {
  const openModal = () => {
    setIsModal(!isModal);
  };
  return (
    <div className={classNames(styles.root, styles.spaceBetween)}>
      <FlexBox>
        <ProfileImage />
        <div className={styles.smMarginLeft}>
          <BodyTextSmall className={styles.xsMarginBottom}>かな</BodyTextSmall>
          <SectionTitle className={styles.xsMarginBottom}>
            {profileData?.lastName}
            {profileData?.firstName}
          </SectionTitle>
          <ProfileRow
            className={styles.xsMarginBottom}
            title="性別"
            content={profileData?.gender}
          />
          <ProfileRow
            className={styles.xsMarginBottom}
            title="住まい"
            content={profileData?.address}
          />
          <ProfileRow className={styles.xsMarginBottom} title="最終学歴" content="" />
          <ProfileRow title="誕生日" content="" />
        </div>
      </FlexBox>
      <FlexBox gap="xs">
        <Button type="button" color="danger" className={styles.xsMarginRight} size="small">
          ログアウト
        </Button>
        <Button type="button" color="lightGray" size="small" onClick={openModal}>
          プロフィールを編集
        </Button>
      </FlexBox>
    </div>
  );
};

export default MyPageTop;
