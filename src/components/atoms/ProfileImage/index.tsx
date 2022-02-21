import React, { FC } from "react";
import styles from "./style.module.scss";
import classNames from "classnames";
import UploadIcon from "components/atoms/ProfileImage/UploadIcon";

type ProfileImageProps = {
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  src?: string;
};
const ProfileImage: FC<ProfileImageProps> = ({ className, onChange, src }) => {
  return (
    <div className={classNames(styles.root, className)}>
      {src ? (
        <div className={styles.previewImage}>
          <img src={src} alt="preview" />
        </div>
      ) : (
        <div className={styles.image} />
      )}
      <UploadIcon onChange={onChange} name="avatarUrl" />
    </div>
  );
};

export default ProfileImage;
