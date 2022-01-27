import React from "react";
import ProfileRow from "components/molecules/ProfileRow";
import { BodyTextSmall, SectionTitle } from "components/atoms/Text";
import Button from "components/atoms/Button";
import styles from "./style.module.scss";
import ProfileImage from "components/atoms/ProfileImage";
import classNames from "classnames";

const MyPageTop = () => {
  return (
    <div className={classNames(styles.root, styles.spaceBetween)}>
      <div className={styles.row}>
        <ProfileImage />
        <div className={styles.smMarginLeft}>
          <BodyTextSmall className={styles.xsMarginBottom}>ほげ</BodyTextSmall>
          <SectionTitle className={styles.xsMarginBottom}>ほけ</SectionTitle>
          <ProfileRow className={styles.xsMarginBottom} title="hoge" content="hoge" />
          <ProfileRow className={styles.xsMarginBottom} title="hoge" content="hoge" />
          <ProfileRow className={styles.xsMarginBottom} title="hoge" content="hoge" />
          <ProfileRow title="hoge" content="hoge" />
        </div>
      </div>
      <div className={styles.row}>
        <Button type="button" color="danger" className={styles.xsMarginRight} size="small">
          ログアウト
        </Button>
        <Button type="button" color="darkGray" size="small">
          プロフィールを編集
        </Button>
      </div>
    </div>
  );
};

export default MyPageTop;
