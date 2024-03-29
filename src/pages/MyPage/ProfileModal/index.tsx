import React, { FC, useState } from "react";
import Button from "components/atoms/Button";
import styles from "./style.module.scss";
import { BodyTextSmall, Label, SectionTitle } from "components/atoms/Text";
import FlexBox from "components/atoms/FlexBox";
import classNames from "classnames";
import ProfileImage from "components/atoms/ProfileImage";
import { useForm, SubmitHandler } from "react-hook-form";
import { ProfileFormData } from "pages/MyPage/index";
import { HttpClient } from "lib/axios";
import { APIBaseUrl } from "constants/apiBaseUrl";
import { Account } from "data/account";
import { useCurrentAccount } from "hooks/useCurrentAccount";
import InputGroup from "components/molecules/InputGroup";
import { ErrorMessage } from "@hookform/error-message";

type ProfileModalProps = {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  isModal: boolean;
  setProfileData: (account?: Account) => void;
  profileData?: Account;
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

    await HttpClient.request<Account>({
      method: "PATCH",
      url: `${APIBaseUrl.APP}/accounts/${account.id}`,
      data: fData,
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    const resProfileData = await HttpClient.request<Account>({
      method: "PATCH",
      url: `${APIBaseUrl.APP}/accounts/${account.id}`,
      data: { account: data },
      headers: {
        "content-type": "application/json",
      },
    });

    setProfileData(resProfileData.data);
    setIsModal(!isModal);
    reset();
  };

  return (
    <div className={classNames(styles.rightInTheMiddle, styles.profileModal)}>
      <SectionTitle className={styles.textCenter}>プロフィール</SectionTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.avatarWrapper}>
          <ProfileImage
            className={styles.horizontalCenter}
            setImage={setImage}
            avatarImage={profileData?.avatarUrl}
          />
        </div>
        <ErrorMessage
          errors={errors}
          name="lastName"
          render={({ message }) => <Label color="danger">{message}</Label>}
        />
        <FlexBox align="bottom" gap="lg" className={styles.smMarginBottom}>
          <InputGroup
            defaultValue={profileData?.lastName}
            text="名前"
            {...register("lastName", { required: "名前は必須です" })}
          />

          <InputGroup
            defaultValue={profileData?.firstName}
            {...register("firstName", { required: true })}
          />
        </FlexBox>

        <div className={styles.smMarginBottom}>
          <BodyTextSmall color="darkGray">性別</BodyTextSmall>
          <ErrorMessage
            errors={errors}
            name="gender"
            render={({ message }) => <Label color="danger">{message}</Label>}
          />
          <select
            id="genderSelect"
            className={styles.select}
            defaultValue={profileData?.gender}
            {...register("gender", { required: "性別は必須です" })}
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
