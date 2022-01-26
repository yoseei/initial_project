import React, { FC } from "react";
import styles from "./style.module.scss";
import classNames from "classnames";

type TextProps = {
  color?: "darkGray" | "danger";
  text: string;
  fontSize: "12px" | "32px";
  bold?: boolean;
  className?: string;
};
const Text: FC<TextProps> = ({ color, text, fontSize, bold, className }) => {
  return (
    <>
      <p
        className={classNames(
          styles.root,
          { [styles.darkGray]: color === "darkGray" },
          { [styles.danger]: color === "danger" },
          { [styles.label]: fontSize === "12px" },
          { [styles.pageTitle]: fontSize === "32px" },
          { [styles.bold]: bold },
          className
        )}
      >
        {text}
      </p>
    </>
  );
};

export default Text;
