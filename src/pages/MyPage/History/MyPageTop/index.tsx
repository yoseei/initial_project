import React from "react";
import ProfileRow from "pages/MyPage/History/ProfileRow";
import { BodyTextSmall, SectionTitle } from "components/atoms/Text";
import Button from "components/atoms/Button";
import styles from "pages/MyPage/History/MyPageTop/style.module.scss";
import ProfileImage from "components/atoms/ProfileImage";
import classNames from "classnames";
import FlexBox from "components/atoms/FlexBox";

const MyPageTop = () => {
  return (
    <div className={classNames(styles.root, styles.spaceBetween)}>
      <FlexBox>
        <ProfileImage />
        <div className={styles.smMarginLeft}>
          <BodyTextSmall className={styles.xsMarginBottom}>ほげ</BodyTextSmall>
          <SectionTitle className={styles.xsMarginBottom}>ほけ</SectionTitle>
          <ProfileRow className={styles.xsMarginBottom} title="hoge" content="hoge" />
          <ProfileRow className={styles.xsMarginBottom} title="hoge" content="hoge" />
          <ProfileRow className={styles.xsMarginBottom} title="hoge" content="hoge" />
          <ProfileRow title="hoge" content="hoge" />
        </div>
      </FlexBox>
      <FlexBox gap="xs">
        <Button type="button" color="danger" className={styles.xsMarginRight} size="small">
          ログアウト
        </Button>
        <Button type="button" color="lightGray" size="small">
          プロフィールを編集
        </Button>
      </FlexBox>
    </div>
  );
};

export default MyPageTop;
