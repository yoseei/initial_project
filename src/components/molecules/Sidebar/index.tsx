import React, { FC } from "react";
import styles from "components/molecules/Sidebar/style.module.scss";
import { ContentTitle } from "components/atoms/Text";
import classNames from "classnames";

type SidebarProps = {
  className?: string;
};
const Sidebar: FC<SidebarProps> = ({ className }) => {
  return (
    <div className={classNames(styles.root, styles.lgPadding, className)}>
      <ContentTitle color="darkGray" className={styles.mdMarginBottom}>
        募集一覧
      </ContentTitle>
      <ContentTitle color="darkGray">ログイン</ContentTitle>
    </div>
  );
};

export default Sidebar;
