import React, { FC } from "react";
import { BodyText } from "components/atoms/Text";
import styles from "./style.module.scss";
import classNames from "classnames";

type ProfileRowProps = {
  title: string;
  content: string;
  className?: string;
};
const ProfileRow: FC<ProfileRowProps> = ({ title, content, className }) => {
  return (
    <div className={classNames(styles.row, className)}>
      <BodyText color="darkGray" className={styles.mdMarginRight}>
        {title}
      </BodyText>
      <BodyText>{content}</BodyText>
    </div>
  );
};

export default ProfileRow;
