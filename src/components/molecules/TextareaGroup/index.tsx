import React, { VFC } from "react";
import styles from "./style.module.scss";

type TextareaGroupProps = {
  className?: string;
};
const TextareaGroup: VFC<TextareaGroupProps> = ({ className }) => {
  return (
    <div className={className}>
      <textarea className={styles.textArea}></textarea>
    </div>
  );
};

export default TextareaGroup;
