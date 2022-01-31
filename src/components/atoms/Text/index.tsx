import React, { FC } from "react";
import BaseText, { BaseTextProps } from "components/atoms/Text/BaseText";

export const PageTitle: FC<BaseTextProps> = (props) => {
  return <BaseText size={32} bold htmlNode={"h1"} {...props} />;
};
export const SectionTitle: FC<BaseTextProps> = (props) => {
  return <BaseText size={21} bold htmlNode={"h2"} {...props} />;
};

export const ContentTitle: FC<BaseTextProps> = (props) => {
  return <BaseText size={14} bold block htmlNode={"b"} {...props} />;
};
export const Label: FC<BaseTextProps> = (props) => {
  return <BaseText size={12} bold htmlNode={"span"} {...props} />;
};

// normal font
export const BodyTextLarge: FC<BaseTextProps> = (props) => {
  return <BaseText size={16} htmlNode={"p"} {...props} />;
};

export const BodyText: FC<BaseTextProps> = (props) => {
  return <BaseText size={14} htmlNode={"p"} {...props} />;
};

export const BodyTextSmall: FC<BaseTextProps> = (props) => {
  return <BaseText size={12} htmlNode={"p"} {...props} />;
};

const Text = BaseText;
export default Text;
