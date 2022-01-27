import React, { FC } from "react";
import styles from "components/atoms/Text/BaseText/style.module.scss";
import classNames from "classnames";

export type TextColor = "darkGray" | "danger";

export type BaseTextProps = {
  color?: TextColor;
  size?: number;
  htmlNode?: string;
  bold?: boolean;
  block?: boolean;
  className?: string;
};
const BaseText: FC<BaseTextProps> = ({
  size = "md",
  htmlNode = "div",
  children,
  bold,
  block,
  color = "black",
  className,
}) => {
  const Component = htmlNode as React.ElementType;

  return (
    <Component
      style={{ fontSize: size }}
      className={classNames(styles.base, className)}
      data-bold={bold}
      data-block={block}
      data-color={color}
    >
      {children}
    </Component>
  );
};

export default BaseText;
