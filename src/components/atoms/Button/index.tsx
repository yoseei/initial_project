import React, { FC, ReactNode } from "react";
import classNames from "classnames";
import styles from "components/atoms/Button/style.module.scss";

type ButtonProps = {
  type: "button" | "submit";
  color?: "primary" | "darkGray" | "lightGray" | "danger" | "black" | "white";
  children: string | ReactNode;
  className?: string;
  size?: "small";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon?: ReactNode;
  flex?: boolean;
};
const Button: FC<ButtonProps> = ({
  type,
  color,
  children,
  className,
  size,
  onClick,
  icon,
  flex,
}) => {
  return (
    <div>
      <button
        type={type}
        className={classNames(
          styles.button,
          className,
          { [styles.primary]: color === "primary" },
          { [styles.darkGray]: color === "darkGray" },
          { [styles.lightGray]: color === "lightGray" },
          { [styles.danger]: color === "danger" },
          { [styles.black]: color === "black" },
          { [styles.white]: color === "white" },
          { [styles.small]: size === "small" },
          { [styles.flex]: flex }
        )}
        onClick={onClick}
      >
        {icon}
        {children}
      </button>
    </div>
  );
};

export default Button;
