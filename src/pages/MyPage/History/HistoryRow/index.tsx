import React, { VFC } from "react";
import styles from "pages/MyPage/History/HistoryRow/style.module.scss";
import Button from "components/atoms/Button";
import { BodyText, BodyTextLarge, BodyTextSmall } from "components/atoms/Text";
import classNames from "classnames";
import FlexBox from "components/atoms/FlexBox";
import { WorkHistoryData } from "pages/MyPage/index";

type HistoryRowProps = {
  workHistoryData?: WorkHistoryData[];
};
const HistoryRow: VFC<HistoryRowProps> = ({ workHistoryData }) => {
  return (
    <>
      {workHistoryData?.map((workHistory) => (
        <div className={styles.root} key={workHistory.id}>
          <div className={styles.spaceBetween}>
            <FlexBox>
              <div className={classNames(styles.alignItemsCenter)}>
                <BodyTextSmall color="darkGray" className={styles.smMarginRight}>
                  {workHistory.sinceDate} - {workHistory.untilDate}
                </BodyTextSmall>
              </div>
              <div>
                <BodyTextLarge bold className={styles.xsMarginBottom}>
                  {workHistory.name}
                </BodyTextLarge>
                <BodyText color="darkGray">{workHistory.position}</BodyText>
              </div>
            </FlexBox>
            <div className={styles.alignItemsCenter}>
              <Button size="small" color="lightGray" type="button">
                編集する
              </Button>
            </div>
          </div>
          <BodyTextLarge color="darkGray" className={styles.xsMarginTop}>
            {workHistory.department}
          </BodyTextLarge>
        </div>
      ))}
    </>
  );
};

export default HistoryRow;
