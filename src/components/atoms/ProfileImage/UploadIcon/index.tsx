import React, { VFC } from "react";
import classNames from "classnames";
import styles from "./style.module.scss";
type UploadIconProps = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
};
const UploadIcon: VFC<UploadIconProps> = ({ onChange, name }) => {
  return (
    <>
      <label htmlFor="image">
        <div className={classNames(styles.uploadIcon, styles.rightInTheMiddle)} />
      </label>
      <input
        type="file"
        id="image"
        name={name}
        style={{ display: "none" }}
        accept="image/*"
        onChange={onChange}
      />
    </>
  );
};

export default UploadIcon;
