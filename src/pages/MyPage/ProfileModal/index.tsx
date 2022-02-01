import React, { FC } from "react";
import Button from "components/atoms/Button";
import styles from "./style.module.scss";
import { SectionTitle } from "components/atoms/Text";
import Input from "components/atoms/Input";
import FlexBox from "components/atoms/FlexBox";
import classNames from "classnames";
import ProfileImage from "components/atoms/ProfileImage";
import { useForm, SubmitHandler } from "react-hook-form";
import { ProfileFormData } from "pages/MyPage/index";
import UploadIcon from "components/atoms/ProfileImage/UploadIcon";
import { ErrorMessage } from "@hookform/error-message";

type ProfileModalProps = {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  isModal: boolean;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileFormData | undefined>>;
};

const ProfileModal: FC<ProfileModalProps> = ({ setIsModal, isModal, setProfileData }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>();

  const closeModal = () => {
    setIsModal(!isModal);
  };
  //
  const onSubmit: SubmitHandler<ProfileFormData> = (data) => {
    setProfileData(data);
    setIsModal(!isModal);
    reset();
  };

  return (
    <div className={classNames(styles.rightInTheMiddle, styles.profileModal)}>
      <SectionTitle className={classNames(styles.textCenter, styles.smMarginBottom)}>
        プロフィール
      </SectionTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.coverImage}>
          <UploadIcon />
          <ProfileImage className={classNames(styles.horizontalCenter, styles.profileImage)} />
        </div>
        <FlexBox align="bottom" gap="lg" className={styles.smMarginBottom}>
          <Input text="名前" {...register("lastName", { required: true })} />
          <ErrorMessage errors={errors} name="lastName" />
          <Input {...register("firstName", { required: true })} />
        </FlexBox>
        <Input
          text="住まい"
          className={styles.smMarginBottom}
          {...register("address", { required: true })}
        />
        <Input
          text="性別"
          className={styles.smMarginBottom}
          {...register("gender", { required: true })}
        />
        <Input
          type="date"
          text="日程"
          className={classNames(styles.smMarginBottom, styles.calender)}
          {...register("date", { required: true })}
        />
        <FlexBox gap="xs" justify="end">
          <Button color="black" type="button" onClick={closeModal}>
            キャンセル
          </Button>
          <Button color="primary" type="submit">
            更新
          </Button>
        </FlexBox>
      </form>
    </div>
  );
};

export default ProfileModal;
