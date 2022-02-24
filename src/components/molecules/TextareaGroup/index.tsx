import React, { VFC } from "react";
import styles from "./style.module.scss";
import { BodyTextSmall } from "components/atoms/Text";

type TextareaGroupProps = {
  text: string;
  className?: string;
};
const TextareaGroup: VFC<TextareaGroupProps> = ({ text, className }) => {
  return (
    <div className={className}>
      <div className={styles.xsMarginBottom}>
        <BodyTextSmall color="darkGray">{text}</BodyTextSmall>
      </div>
      <textarea name="" id="" className={styles.textArea}></textarea>
    </div>
  );
};

export default TextareaGroup;
