import React, { FC } from "react";
import ProfileRow from "pages/MyPage/ProfileRow";
import { BodyTextSmall, SectionTitle } from "components/atoms/Text";
import Button from "components/atoms/Button";
import styles from "pages/MyPage/MyPageTop/style.module.scss";
import classNames from "classnames";
import FlexBox from "components/atoms/FlexBox";
import Avatar from "pages/MyPage/Avatar";
import { Account } from "data/account";

type MyPageProps = {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  isModal: boolean;
  profileData?: Account;
  signOut: () => void;
};
const MyPageTop: FC<MyPageProps> = ({ setIsModal, isModal, profileData, signOut }) => {
  const openModal = () => {
    setIsModal(!isModal);
  };

  const loading = () => {
    if (!profileData) return <div>Loading...</div>;
  };

  return (
    <div className={classNames(styles.root, styles.spaceBetween)}>
      {profileData ? (
        <FlexBox>
          <Avatar avatar={profileData.avatarUrl} />
          <div className={styles.smMarginLeft}>
            <BodyTextSmall className={styles.xsMarginBottom}>かな</BodyTextSmall>
            <SectionTitle className={styles.xsMarginBottom}>
              {profileData.lastName}
              {profileData.firstName}
            </SectionTitle>
            <ProfileRow
              className={styles.xsMarginBottom}
              title="性別"
              content={profileData.gender}
            />

            <ProfileRow className={styles.xsMarginBottom} title="最終学歴" content="" />
            <ProfileRow title="誕生日" content={profileData.birthday} />
          </div>
        </FlexBox>
      ) : (
        loading()
      )}

      <FlexBox gap="xs">
        <Button
          type="button"
          color="danger"
          className={styles.xsMarginRight}
          size="small"
          onClick={signOut}
        >
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
