import React, { VFC } from "react";
import classNames from "classnames";
import styles from "./style.module.scss";
import { BodyTextSmall, SectionTitle } from "components/atoms/Text";
import FlexBox from "components/atoms/FlexBox";
import InputGroup from "components/molecules/InputGroup";
import Button from "components/atoms/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { WorkHistoryFormData } from "pages/MyPage/index";

type WorkHistoryModalProps = {
  setIsWorkHistoryModal: React.Dispatch<React.SetStateAction<boolean>>;
  isWorkHistoryModal: boolean;
  setWorkHistoryData: React.Dispatch<React.SetStateAction<WorkHistoryFormData | undefined>>;
};

const WorkHistoryModal: VFC<WorkHistoryModalProps> = ({
  setIsWorkHistoryModal,
  isWorkHistoryModal,
  setWorkHistoryData,
}) => {
  const { register, handleSubmit, reset } = useForm<WorkHistoryFormData>();

  const onSubmit: SubmitHandler<WorkHistoryFormData> = (data) => {
    setWorkHistoryData(data);
    setIsWorkHistoryModal(!isWorkHistoryModal);
    reset();
  };

  return (
    <div className={classNames(styles.rightInTheMiddle, styles.workHistoryModal)}>
      <SectionTitle className={classNames(styles.textCenter, styles.smMarginBottom)}>
        職歴
      </SectionTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup
          text="企業名"
          {...register("companyName", { required: true })}
          className={styles.smMarginBottom}
        />
        <InputGroup
          text="部署・役職"
          className={styles.smMarginBottom}
          {...register("position", { required: true })}
        />
        <FlexBox direction="column">
          <BodyTextSmall color="darkGray">入社期間</BodyTextSmall>
          <FlexBox gap="md">
            <InputGroup
              type="date"
              className={classNames(styles.smMarginBottom, styles.calender)}
              {...register("sinceDate", { required: true })}
            />
            <InputGroup
              type="date"
              text=""
              className={classNames(styles.calender)}
              {...register("untilDate", { required: true })}
            />
          </FlexBox>
        </FlexBox>
        <FlexBox justify="space-between">
          <Button color="danger" type="button" onClick={() => console.log("削除ぼたんクリック！")}>
            削除する
          </Button>

          <FlexBox gap="xs" justify="end">
            <Button
              color="white"
              type="button"
              onClick={() => setIsWorkHistoryModal(!isWorkHistoryModal)}
            >
              キャンセル
            </Button>
            <Button color="primary" type="submit">
              更新
            </Button>
          </FlexBox>
        </FlexBox>
      </form>
    </div>
  );
};

export default WorkHistoryModal;
