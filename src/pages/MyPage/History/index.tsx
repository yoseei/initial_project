import React, { FC } from "react";
import styles from "pages/MyPage/History/style.module.scss";
import HistoryRow from "pages/MyPage/History/HistoryRow";
import Button from "components/atoms/Button";
import { SectionTitle } from "components/atoms/Text";
import { WorkHistoryData, WorkHistoryFormData } from "pages/MyPage/index";

type HistoryProps = {
  historyType: "職歴" | "学歴";
  className?: string;
  setIsWorkHistoryModal?: any;
  isWorkHistoryModal?: boolean;
  workHistoryData?: WorkHistoryData[];
};
const History: FC<HistoryProps> = ({
  historyType,
  className,
  setIsWorkHistoryModal,
  isWorkHistoryModal,
  workHistoryData,
}) => {
  return (
    <div className={className}>
      <SectionTitle className={styles.mdMarginBottom}>{historyType}</SectionTitle>
      <HistoryRow workHistoryData={workHistoryData} />
      <Button
        color="lightGray"
        type="button"
        className={styles.mdMarginTop}
        onClick={() => setIsWorkHistoryModal(!isWorkHistoryModal)}
      >
        {`${historyType}を追加`}
      </Button>
    </div>
  );
};

export default History;
