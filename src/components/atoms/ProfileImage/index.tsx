import React, { FC } from "react";
import styles from "./style.module.scss";
import classNames from "classnames";
import UploadIcon from "components/atoms/ProfileImage/UploadIcon";

type ProfileImageProps = {
  className?: string;
};
const ProfileImage: FC<ProfileImageProps> = ({ className }) => {
  return (
    <div className={classNames(styles.root, className)}>
      <div className={styles.image} />
      <UploadIcon />
    </div>
  );
};

export default ProfileImage;
