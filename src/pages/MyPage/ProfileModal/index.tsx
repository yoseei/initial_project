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
};

const ProfileModal: FC<ProfileModalProps> = ({ setIsModal, isModal, setProfileData }) => {
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
    setPreviewImage(data.avatarUrl);
    setProfileData(data);
    setIsModal(!isModal);
    const fData = new FormData();

    if (image) {
      fData.append("account[avatarUrl]", image);
    }

    // Object.entries(data).map(([key, value]) => fData.append(`account[${key}}`, value));

    const resAvatar = await HttpClient.request<Account>({
      method: "PATCH",
      url: `${APIBaseUrl.APP}/accounts/${account.id}`,
      data: fData,
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    const res = await HttpClient.request<Account>({
      method: "PATCH",
      url: `${APIBaseUrl.APP}/accounts/${account.id}`,
      data: { account: data },
      headers: {
        "content-type": "application/json",
      },
    });

    console.log(res);
    reset();
  };

  const processImage = (event: any) => {
    const imageFile = event.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setImage(imageFile);
    setPreviewImage(imageUrl);
  };

  return (
    <div className={classNames(styles.rightInTheMiddle, styles.profileModal)}>
      <SectionTitle className={styles.textCenter}>プロフィール</SectionTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.avatarWrapper}>
          <ProfileImage
            className={styles.horizontalCenter}
            onChange={processImage}
            src={previewImage}
          />
        </div>
        <FlexBox align="bottom" gap="lg" className={styles.smMarginBottom}>
          <InputGroup text="名前" {...register("lastName", { required: true })} />
          <InputGroup {...register("firstName", { required: true })} />
        </FlexBox>
        <InputGroup text="住まい" className={styles.smMarginBottom} {...register("address")} />

        <div className={styles.smMarginBottom}>
          <BodyTextSmall color="darkGray">性別</BodyTextSmall>
          <select
            id="genderSelect"
            className={styles.select}
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
          {...register("birthday")}
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
