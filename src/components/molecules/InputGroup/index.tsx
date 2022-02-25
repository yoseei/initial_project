import React, { ReactElement, ReactNode } from "react";
import styles from "components/molecules/InputGroup/style.module.scss";
import { BodyTextSmall } from "components/atoms/Text";
import classNames from "classnames";
import TextareaGroup from "components/molecules/TextareaGroup";

type InputProps = {
  textArea?: boolean;
  placeholder?: string;
  icon?: ReactNode;
  type?: "date" | "file" | "password";
  text?: string;
  className?: string;
  defaultValue?: string;
  children?: ReactNode;
};

const InputGroup = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { textArea, placeholder, icon, type = "text", text, className, defaultValue, ...props },
    ref
  ) => {
    return (
      <div className={classNames(styles.root, className)}>
        <div className={styles.xsMarginBottom}>
          <BodyTextSmall color="darkGray">{text}</BodyTextSmall>
        </div>
        {textArea ? (
          <TextareaGroup />
        ) : (
          <input
            defaultValue={defaultValue}
            placeholder={placeholder}
            ref={ref}
            type={type}
            {...props}
          />
        )}
        <span>{icon}</span>
      </div>
    );
  }
);
export default InputGroup;
