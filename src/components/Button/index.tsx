import React, { FC } from "react";
import classNames from "classnames";
import styles from "./style.module.scss";

type ButtonProps = {
  type: "button" | "submit";
  backGround?: "primary";
  children: string;
  color: "white" | "darkGray";
  className?: string;
};
const Button: FC<ButtonProps> = ({ type, backGround, color, children, className }) => {
  return (
    <>
      <button
        type={type}
        className={classNames(
          styles.root,
          className,
          { [styles.primary]: backGround === "primary" },
          { [styles.darkGray]: color === "darkGray" },
          { [styles.white]: color === "white" }
        )}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
