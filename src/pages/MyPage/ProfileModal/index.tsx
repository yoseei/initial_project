import React, { FC, useState } from "react";
import Button from "components/atoms/Button";
import styles from "./style.module.scss";
import { BodyTextSmall, SectionTitle } from "components/atoms/Text";
import FlexBox from "components/atoms/FlexBox";
import classNames from "classnames";
import ProfileImage from "components/atoms/ProfileImage";
import { useForm, SubmitHandler } from "react-hook-form";
import { ProfileFormData } from "pages/MyPage/index";
import { HttpClient } from "lib/axios";
import { APIBaseUrl } from "constants/apiBaseUrl";
import { Account } from "data/account";
import { useCurrentAccount } from "hooks/useCurrentAccount";
import InputGroup from "components/atoms/InputGroup";

type ProfileModalProps = {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  isModal: boolean;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileFormData | undefined>>;
  profileData?: ProfileFormData;
};

const ProfileModal: FC<ProfileModalProps> = ({
  setIsModal,
  isModal,
  setProfileData,
  profileData,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>();
  const [image, setImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string>();
  const { account } = useCurrentAccount();

  const closeModal = () => {
    setIsModal(!isModal);
  };

  const onSubmit: SubmitHandler<ProfileFormData> = async (data) => {
    if (!account?.id) return;

    const fData = new FormData();

    if (image) {
      fData.append("account[avatar]", image);
    }

    Object.entries(data).map(([key, value]) => fData.append(`account[${key}]`, value));

    const resAvatar = await HttpClient.request<Account>({
      method: "PATCH",
      url: `${APIBaseUrl.APP}/accounts/${account.id}`,
      data: fData,
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    const resProfileData = await HttpClient.request<ProfileFormData>({
      method: "PATCH",
      url: `${APIBaseUrl.APP}/accounts/${account.id}`,
      data: { account: data },
      headers: {
        "content-type": "application/json",
      },
    });

    setPreviewImage(resAvatar.data.avatarUrl);
    setProfileData(resProfileData.data);
    setIsModal(!isModal);
    reset();
  };

  const processImage = (event: any) => {
    const imageFile = event.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setImage(imageFile);
    setPreviewImage(imageUrl);
  };

  console.log(previewImage);
  console.log(profileData);
  return (
    <div className={classNames(styles.rightInTheMiddle, styles.profileModal)}>
      <SectionTitle className={styles.textCenter}>プロフィール</SectionTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.avatarWrapper}>
          {profileData?.avatarUrl ? (
            <ProfileImage
              className={styles.horizontalCenter}
              onChange={processImage}
              src={profileData.avatarUrl}
            />
          ) : (
            <ProfileImage
              className={styles.horizontalCenter}
              onChange={processImage}
              src={previewImage}
            />
          )}
        </div>
        <FlexBox align="bottom" gap="lg" className={styles.smMarginBottom}>
          <InputGroup
            defaultValue={profileData?.lastName}
            text="名前"
            {...register("lastName", { required: true })}
          />
          <InputGroup
            defaultValue={profileData?.firstName}
            {...register("firstName", { required: true })}
          />
        </FlexBox>
        <InputGroup
          defaultValue={profileData?.address}
          text="住まい"
          className={styles.smMarginBottom}
          {...register("address")}
        />

        <div className={styles.smMarginBottom}>
          <BodyTextSmall color="darkGray">性別</BodyTextSmall>
          <select
            id="genderSelect"
            className={styles.select}
            defaultValue={profileData?.gender}
            {...register("gender", { required: true })}
          >
            <option value=""></option>
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </div>

        <InputGroup
          type="date"
          text="誕生日"
          className={classNames(styles.smMarginBottom, styles.calender)}
          defaultValue={profileData?.birthday}
          {...register("birthday")}
        />
        <FlexBox gap="xs" justify="end">
          <Button color="black" type="button" onClick={closeModal} size="small">
            キャンセル
          </Button>
          <Button color="primary" type="submit" size="small">
            更新
          </Button>
        </FlexBox>
      </form>
    </div>
  );
};

export default ProfileModal;
