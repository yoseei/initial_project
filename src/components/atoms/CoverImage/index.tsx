import React, { VFC } from "react";
import classNames from "classnames";
import styles from "components/atoms/ProfileImage/style.module.scss";
import UploadIcon from "components/atoms/ProfileImage/UploadIcon";

type CoverImageProps = {
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
};
const CoverImage: VFC<CoverImageProps> = ({ className, onChange }) => {
  return (
    <div className={classNames(styles.root, className)}>
      <UploadIcon onChange={onChange} name="coverImageUrl" />
    </div>
  );
};

export default CoverImage;
