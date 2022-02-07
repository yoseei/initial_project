import React, { ReactNode } from "react";
import styles from "components/atoms/Input/style.module.scss";
import { BodyTextSmall } from "components/atoms/Text";
import classNames from "classnames";

type InputProps = {
  placeholder?: string;
  icon?: ReactNode;
  type?: "date" | "file" | "password";
  text?: string;
  className?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, icon, type = "text", text, className, ...props }, ref) => {
    return (
      <div className={classNames(styles.root, className)}>
        <div className={styles.xsMarginBottom}>
          <BodyTextSmall color="darkGray">{text}</BodyTextSmall>
        </div>
        <input placeholder={placeholder} ref={ref} type={type} {...props} />
        <span>{icon}</span>
      </div>
    );
  }
);
export default Input;
