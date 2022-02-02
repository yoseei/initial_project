import React, { VFC } from "react";
import classNames from "classnames";
import styles from "./style.module.scss";
import { SectionTitle } from "components/atoms/Text";
import FlexBox from "components/atoms/FlexBox";
import Input from "components/atoms/Input";
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
        <Input text="企業名" {...register("companyName", { required: true })} />
        <Input
          text="部署・役職"
          className={styles.smMarginBottom}
          {...register("position", { required: true })}
        />
        <FlexBox>
          <Input
            type="date"
            text="日程"
            className={classNames(styles.smMarginBottom, styles.calender)}
            {...register("dateFrom", { required: true })}
          />
          <Input
            type="date"
            className={classNames(styles.smMarginBottom, styles.calender)}
            {...register("dateTo", { required: true })}
          />
        </FlexBox>
        <FlexBox>
          <Button color="black" type="button" onClick={() => console.log("削除ぼたんクリック！")}>
            削除する
          </Button>
          <FlexBox gap="xs" justify="end">
            <Button
              color="black"
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
