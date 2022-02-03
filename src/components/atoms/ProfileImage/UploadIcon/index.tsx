import React from "react";
import classNames from "classnames";
import styles from "./style.module.scss";

const UploadIcon = () => {
  return (
    <>
      <label htmlFor="image">
        <div className={classNames(styles.uploadIcon, styles.rightInTheMiddle)} />
      </label>
      <input type="file" id="image" name="avatarUrl" style={{ display: "none" }} />
    </>
  );
};

export default UploadIcon;
