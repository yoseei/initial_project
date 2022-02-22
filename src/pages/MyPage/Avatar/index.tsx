import React from "react";
import styles from "components/atoms/ProfileImage/style.module.scss";
import DefaultImage from "components/atoms/ProfileImage/checker.png";

const Avatar = () => {
  return (
    <div className={styles.root}>
      <div className={styles.previewImage}>
        <img src={DefaultImage} alt="preview" />
      </div>
    </div>
  );
};

export default Avatar;
