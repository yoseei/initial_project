import React from "react";
import styles from "./style.module.scss";
import Button from "components/atoms/Button";
import { BodyText, BodyTextLarge, BodyTextSmall } from "components/atoms/Text";
import classNames from "classnames";

const HistoryRow = () => {
  return (
    <div className={styles.root}>
      <div className={styles.spaceBetween}>
        <div className={styles.row}>
          <div className={classNames(styles.alignItemsCenter)}>
            <BodyTextSmall color="darkGray" className={styles.smMarginRight}>
              2020-01 - 現在
            </BodyTextSmall>
          </div>
          <div>
            <BodyTextLarge bold className={styles.xsMarginBottom}>
              Simula.labs
            </BodyTextLarge>
            <BodyText color="darkGray">エンジニア</BodyText>
          </div>
        </div>
        <div className={styles.alignItemsCenter}>
          <Button size="small" color="lightGray" type="button">
            編集する
          </Button>
        </div>
      </div>
      <BodyTextLarge color="darkGray" className={styles.xsMarginTop}>
        大手広告のコンサルティングを担当
      </BodyTextLarge>
    </div>
  );
};

export default HistoryRow;
