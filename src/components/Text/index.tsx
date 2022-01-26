import React, { FC } from "react";
import BaseText, { BaseTextProps } from "./BaseText";

export const PageTitle: FC<BaseTextProps> = (props) => {
  return <BaseText size={32} bold htmlNode={"h1"} {...props} />;
};
export const Label: FC<BaseTextProps> = (props) => {
  return <BaseText size={12} bold htmlNode={"span"} {...props} />;
};
const Text = BaseText;
export default Text;
