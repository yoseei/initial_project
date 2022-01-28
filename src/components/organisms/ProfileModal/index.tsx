import React, { FC } from "react";
import Button from "components/atoms/Button";

const ProfileModal: FC = () => {
  return (
    <div>
      <p>プロフィール</p>
      <div>画像</div>
      <div></div>
      <div></div>
      <div></div>
      <div>カレンダー</div>
      <div>
        <Button color="primary" type="button">
          キャンセル
        </Button>
        <Button type="submit">更新</Button>
      </div>
    </div>
  );
};

export default ProfileModal;
