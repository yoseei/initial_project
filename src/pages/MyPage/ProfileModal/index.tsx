import React, { FC, useState } from "react";
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
import { CloudUploadOutlined, InboxOutlined } from "@ant-design/icons";
import { Upload, message, Button as AntButton } from "antd";
import { HttpClient } from "lib/axios";
import { APIBaseUrl } from "constants/apiBaseUrl";
import { Account } from "data/account";
import { useCurrentAccount } from "hooks/useCurrentAccount";
import axios from "axios";

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
  const { account } = useCurrentAccount();

  const closeModal = () => {
    setIsModal(!isModal);
  };

  const onSubmit: SubmitHandler<ProfileFormData> = async (data) => {
    if (!account?.id) return;

    setProfileData(data);
    setIsModal(!isModal);
    const fData = new FormData();

    if (image) {
      fData.append("account[avatar]", image);
    }

    for (let value of fData.entries()) {
      console.log(value);
    }

    await HttpClient.request<Account>({
      method: "PATCH",
      url: `${APIBaseUrl.APP}/accounts/${account.id}`,
      data: fData,
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    reset();
  };

  const processImage = (event: any) => {
    const imageFile = event.target.files[0];
    setImage(imageFile);
  };

  return (
    <div className={classNames(styles.rightInTheMiddle, styles.profileModal)}>
      <SectionTitle className={classNames(styles.textCenter, styles.smMarginBottom)}>
        プロフィール
      </SectionTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.coverImage}>
          {/*<Upload className={styles.rightInTheMiddle} {...props}>*/}
          {/*  <AntButton icon={<CloudUploadOutlined />} />*/}
          {/*</Upload>*/}
          <input type="file" onChange={processImage} accept="image/*" />
          {/*{image}*/}
          <ProfileImage className={classNames(styles.horizontalCenter, styles.profileImage)} />
        </div>
        <FlexBox align="bottom" gap="lg" className={styles.smMarginBottom}>
          <Input text="名前" {...register("lastName")} />
          <ErrorMessage errors={errors} name="lastName" />
          <Input {...register("firstName")} />
        </FlexBox>
        <Input text="住まい" className={styles.smMarginBottom} {...register("address")} />
        <Input text="性別" className={styles.smMarginBottom} {...register("gender")} />
        <Input
          type="date"
          text="日程"
          className={classNames(styles.smMarginBottom, styles.calender)}
          {...register("date")}
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
