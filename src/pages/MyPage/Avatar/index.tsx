import React, { VFC } from "react";
import styles from "components/atoms/ProfileImage/style.module.scss";
import DefaultImage from "components/atoms/ProfileImage/checker.png";

type AvatarProps = {
  avatar: string;
};
const Avatar: VFC<AvatarProps> = ({ avatar }) => {
  return (
    <div className={styles.root}>
      <div className={styles.previewImage}>
        <img src={avatar ?? DefaultImage} alt="preview" />
      </div>
    </div>
  );
};

export default Avatar;
