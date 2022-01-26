import React, { FC } from "react";
import styles from "./style.module.scss";
import classNames from "classnames";

export type TextColor = "darkGray" | "danger";

export type BaseTextProps = {
  color?: TextColor;
  size?: number;
  htmlNode?: string;
  bold?: boolean;
  className?: string;
};
const BaseText: FC<BaseTextProps> = ({
  size = "md",
  htmlNode = "div",
  children,
  bold,
  color,
  className,
}) => {
  const Component = htmlNode as React.ElementType;

  return (
    <Component
      style={{ fontSize: size }}
      className={classNames(styles.base, className)}
      data-bold={bold}
      data-color={color}
    >
      {children}
    </Component>
  );
};

export default BaseText;
