import React, { FC } from "react";
import classNames from "classnames";
import styles from "components/atoms/Button/style.module.scss";

type ButtonProps = {
  type: "button" | "submit";
  color?: "primary" | "darkGray" | "lightGray" | "danger" | "black";
  children: string;
  className?: string;
  size?: "small";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};
const Button: FC<ButtonProps> = ({ type, color, children, className, size, onClick }) => {
  return (
    <div>
      <button
        type={type}
        className={classNames(
          styles.root,
          className,
          { [styles.primary]: color === "primary" },
          { [styles.darkGray]: color === "darkGray" },
          { [styles.lightGray]: color === "lightGray" },
          { [styles.danger]: color === "danger" },
          { [styles.black]: color === "black" },
          { [styles.small]: size === "small" }
        )}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
