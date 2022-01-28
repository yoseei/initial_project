import React, { FC } from "react";
import classNames from "classnames";
import styles from "components/atoms/Button/style.module.scss";

type ButtonProps = {
  type: "button" | "submit";
  color?: "primary" | "darkGray" | "lightGray" | "danger";
  children: string;
  className?: string;
  size?: "small";
};
const Button: FC<ButtonProps> = ({ type, color, children, className, size }) => {
  return (
    <div className={className}>
      <button
        type={type}
        className={classNames(
          styles.root,
          { [styles.primary]: color === "primary" },
          { [styles.darkGray]: color === "darkGray" },
          { [styles.lightGray]: color === "lightGray" },
          { [styles.danger]: color === "danger" },
          { [styles.small]: size === "small" }
        )}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
