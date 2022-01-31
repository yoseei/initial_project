import React from "react";
import styles from "pages/MyPage/History/HistoryRow/style.module.scss";
import Button from "components/atoms/Button";
import { BodyText, BodyTextLarge, BodyTextSmall } from "components/atoms/Text";
import classNames from "classnames";
import FlexBox from "components/atoms/FlexBox";

const HistoryRow = () => {
  return (
    <div className={styles.root}>
      <div className={styles.spaceBetween}>
        <FlexBox>
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
        </FlexBox>
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
