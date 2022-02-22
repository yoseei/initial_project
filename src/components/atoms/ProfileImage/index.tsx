import React, { FC, useEffect, useState } from "react";
import styles from "./style.module.scss";
import classNames from "classnames";
import UploadIcon from "components/atoms/ProfileImage/UploadIcon";
import DefaultImage from "./checker.png";

type ProfileImageProps = {
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setImage?: React.Dispatch<React.SetStateAction<File | undefined>>;
  avatarImage?: string;
};
const ProfileImage: FC<ProfileImageProps> = ({ className, onChange, setImage, avatarImage }) => {
  const [previewImage, setPreviewImage] = useState<string>();

  useEffect(() => {
    if (!avatarImage) return;

    setPreviewImage(avatarImage);
  }, [avatarImage]);

  const processImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const imageFile = event.target.files[0];

    const imageUrl = URL.createObjectURL(imageFile);
    if (!imageFile) return;
    if (setImage) {
      setImage(imageFile);
    }

    setPreviewImage(imageUrl);
  };

  return (
    <div className={classNames(styles.root, className)}>
      <div className={styles.previewImage}>
        <img src={previewImage ?? DefaultImage} alt="preview" />
      </div>
      <UploadIcon onChange={processImage} name="avatarUrl" />
    </div>
  );
};

export default ProfileImage;
