import React, { VFC } from "react";
import classNames from "classnames";
import styles from "./style.module.scss";
import { BodyTextSmall, SectionTitle } from "components/atoms/Text";
import FlexBox from "components/atoms/FlexBox";
import InputGroup from "components/molecules/InputGroup";
import Button from "components/atoms/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { WorkHistoryFormData } from "pages/MyPage/index";
import { DeleteOutlined } from "@ant-design/icons";
import { HttpClient } from "lib/axios";
import { APIBaseUrl } from "constants/apiBaseUrl";
import { useCurrentAccount } from "hooks/useCurrentAccount";

type WorkHistoryModalProps = {
  setIsWorkHistoryModal: React.Dispatch<React.SetStateAction<boolean>>;
  isWorkHistoryModal: boolean;
};

const WorkHistoryModal: VFC<WorkHistoryModalProps> = ({
  setIsWorkHistoryModal,
  isWorkHistoryModal,
}) => {
  const { register, handleSubmit, reset } = useForm<WorkHistoryFormData>();
  const { account } = useCurrentAccount();
  const onSubmit: SubmitHandler<WorkHistoryFormData> = async (data) => {
    await HttpClient.request<WorkHistoryFormData>({
      method: "POST",
      url: `${APIBaseUrl.APP}/accounts/${account?.id}/work_histories`,
      data: { workHistory: data },
      headers: {
        "content-type": "application/json",
      },
    });
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
          {...register("name", { required: true })}
          className={styles.smMarginBottom}
        />
        <InputGroup
          text="部署"
          className={styles.smMarginBottom}
          {...register("department", { required: true })}
        />
        <InputGroup
          text="役職"
          className={styles.smMarginBottom}
          {...register("position", { required: true })}
        />

        <FlexBox direction="column">
          <BodyTextSmall color="darkGray">入社期間</BodyTextSmall>
          <FlexBox gap="xs">
            <FlexBox align="middle" gap="xs">
              <input type="radio" id="employed" {...register("isEmployed")} value="true" />
              <label htmlFor="employed">在職中</label>

              <input type="radio" id="notEmployed" {...register("isEmployed")} value="false" />
              <label htmlFor="notEmployed">離職中</label>
            </FlexBox>
          </FlexBox>
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
          <Button color="danger" type="button" icon={<DeleteOutlined />} size="small" flex>
            削除する
          </Button>

          <FlexBox gap="xs" justify="end">
            <Button
              color="white"
              type="button"
              onClick={() => setIsWorkHistoryModal(!isWorkHistoryModal)}
              size="small"
            >
              キャンセル
            </Button>
            <Button color="primary" type="submit" size="small">
              更新
            </Button>
          </FlexBox>
        </FlexBox>
      </form>
    </div>
  );
};

export default WorkHistoryModal;
