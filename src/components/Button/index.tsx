import React, { FC } from "react";
import classNames from "classnames";
import styles from "./style.module.scss";

type ButtonProps = {
  type: "button" | "submit";
  color?: "primary" | "darkGray";
  children: string;
  className?: string;
};
const Button: FC<ButtonProps> = ({ type, color, children, className }) => {
  return (
    <>
      <button
        type={type}
        className={classNames(
          styles.root,
          className,
          { [styles.primary]: color === "primary" },
          { [styles.darkGray]: color === "darkGray" }
        )}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
