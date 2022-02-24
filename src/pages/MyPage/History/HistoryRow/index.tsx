import React, { useState, VFC } from "react";
import styles from "pages/MyPage/History/HistoryRow/style.module.scss";
// import Button from "components/atoms/Button";
import { BodyText, BodyTextLarge, BodyTextSmall } from "components/atoms/Text";
import classNames from "classnames";
import FlexBox from "components/atoms/FlexBox";
import { WorkHistoryData } from "pages/MyPage/index";
import WorkHistoryEditModal from "pages/MyPage/WorkHistoryEditModal";
import { Button as AntButton, Modal } from "antd";
import "antd/dist/antd.css";

type HistoryRowProps = {
  workHistoryData?: WorkHistoryData[];
  setIsWorkHistoryModal: React.Dispatch<React.SetStateAction<boolean>>;
  isWorkHistoryModal: boolean;
};
const HistoryRow: VFC<HistoryRowProps> = ({
  workHistoryData,
}) => {
  const [mappedWorkHistory, setMappedWorkHistory] = useState<WorkHistoryData>();
  const [isWorkHistoryEditModal, setIsWorkHistoryEditModal] = useState(false);
  const editWorkHistory = (workHistory: WorkHistoryData) => {
    setIsWorkHistoryEditModal(!isWorkHistoryEditModal);
    setMappedWorkHistory(workHistory);
  };
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
              <AntButton onClick={() => editWorkHistory(workHistory)}>編集する</AntButton>
            </div>
          </div>
          <BodyTextLarge color="darkGray" className={styles.xsMarginTop}>
            {workHistory.department}
          </BodyTextLarge>
        </div>
      ))}
      {isWorkHistoryEditModal && (
        <Modal
          closable={false}
          footer={null}
          centered
          visible={isWorkHistoryEditModal}
          onCancel={() => setIsWorkHistoryEditModal(false)}
        >
          <WorkHistoryEditModal
            setIsWorkHistoryEditModal={setIsWorkHistoryEditModal}
            isWorkHistoryEditModal={isWorkHistoryEditModal}
            mappedWorkHistory={mappedWorkHistory}
          />
        </Modal>
      )}
    </>
  );
};

export default HistoryRow;
