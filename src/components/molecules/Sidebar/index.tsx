import React, { FC } from "react";
import styles from "components/molecules/Sidebar/style.module.scss";
import { BodyTextSmall } from "components/atoms/Text";
import classNames from "classnames";
import { useCurrentAccount } from "hooks/useCurrentAccount";

type SidebarProps = {
  className?: string;
};
const Sidebar: FC<SidebarProps> = ({ className }) => {
  const { isLoggedIn } = useCurrentAccount();
  return (
    <div className={classNames(styles.root, styles.lgPadding, className)}>
      <BodyTextSmall color="darkGray" className={styles.mdMarginBottom}>
        募集一覧
      </BodyTextSmall>
      {isLoggedIn ? (
        <>
          <BodyTextSmall color="darkGray" className={styles.mdMarginBottom}>
            マイページ
          </BodyTextSmall>
          <BodyTextSmall color="darkGray">企業ページへ</BodyTextSmall>
        </>
      ) : (
        <BodyTextSmall color="darkGray">ログイン</BodyTextSmall>
      )}
    </div>
  );
};

export default Sidebar;
