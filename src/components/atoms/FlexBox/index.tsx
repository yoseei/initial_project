import React, { FC } from "react";
import classNames from "classnames";
import styles from "./style.module.scss";

export type GapSize = "xs" | "sm" | "md" | "lg" | "xl";

type FlexBoxProps = JSX.IntrinsicElements["div"] & {
  align?: "top" | "middle" | "bottom";
  justify?: "start" | "end" | "center" | "space-around" | "space-between";
  gap?: GapSize;
  isWrap?: boolean;
  direction?: "row" | "column";
  className?: string;
};
const FlexBox: FC<FlexBoxProps> = ({
  align,
  justify,
  gap,
  className,
  isWrap,
  direction,
  children,
  ...props
}) => {
  return (
    <div
      className={classNames(styles.flexBox, className, { [styles.wrap]: isWrap })}
      data-justify={justify}
      data-align={align}
      data-gap={gap}
      data-direction={direction}
      {...props}
    >
      {children}
    </div>
  );
};

export default FlexBox;
