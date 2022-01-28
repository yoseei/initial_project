import React, { FC } from "react";
import { BodyText } from "components/atoms/Text";
import styles from "pages/MyPage/History/ProfileRow/style.module.scss";
import FlexBox from "components/atoms/FlexBox";

type ProfileRowProps = {
  title: string;
  content: string;
  className?: string;
};
const ProfileRow: FC<ProfileRowProps> = ({ title, content, className }) => {
  return (
    <FlexBox className={className}>
      <BodyText color="darkGray" className={styles.mdMarginRight}>
        {title}
      </BodyText>
      <BodyText>{content}</BodyText>
    </FlexBox>
  );
};

export default ProfileRow;
