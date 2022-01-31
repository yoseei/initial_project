import React, { ReactNode } from "react";
import styles from "components/atoms/Input/style.module.scss";
import classNames from "classnames";

type InputProps = {
  placeholder?: string;
  icon?: ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ placeholder, icon }, ref) => {
  return (
    <div className={classNames(styles.root)}>
      <input placeholder={placeholder} ref={ref} />
      <span>{icon}</span>
    </div>
  );
});
export default Input;
