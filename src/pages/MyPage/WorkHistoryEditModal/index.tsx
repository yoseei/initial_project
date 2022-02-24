import React, { VFC } from "react";
import classNames from "classnames";
import styles from "./style.module.scss";
import { BodyTextSmall, SectionTitle } from "components/atoms/Text";
import FlexBox from "components/atoms/FlexBox";
import InputGroup from "components/molecules/InputGroup";
import Button from "components/atoms/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { WorkHistoryData, WorkHistoryFormData } from "pages/MyPage/index";
import { DeleteOutlined } from "@ant-design/icons";
import { HttpClient } from "lib/axios";
import { APIBaseUrl } from "constants/apiBaseUrl";
import { useCurrentAccount } from "hooks/useCurrentAccount";

type WorkHistoryEditModalProps = {
  setIsWorkHistoryEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  isWorkHistoryEditModal?: boolean;
  mappedWorkHistory?: WorkHistoryData;
};

const WorkHistoryEditModal: VFC<WorkHistoryEditModalProps> = ({
  setIsWorkHistoryEditModal,
  isWorkHistoryEditModal,
  mappedWorkHistory,
}) => {
  const { register, handleSubmit } = useForm<WorkHistoryFormData>();

  const editWorkHistory: SubmitHandler<WorkHistoryFormData> = async (data) => {
    await HttpClient.request({
      method: "PATCH",
      url: `${APIBaseUrl.APP}/work_histories/${mappedWorkHistory?.id}`,
      data: { work_history: data },
      headers: {
        "Content-type": "application/json",
      },
    });
    setIsWorkHistoryEditModal(!isWorkHistoryEditModal);
  };

  const deleteWorkHistory = async () => {
    await HttpClient.request({
      method: "DELETE",
      url: `${APIBaseUrl.APP}/work_histories/${mappedWorkHistory?.id}`,
    });
    setIsWorkHistoryEditModal(!isWorkHistoryEditModal);
  };

  return (
    <>
      {mappedWorkHistory && (
        <div className={classNames(styles.rightInTheMiddle, styles.workHistoryEditModal)}>
          <SectionTitle className={classNames(styles.textCenter, styles.smMarginBottom)}>
            職歴
          </SectionTitle>
          <form onSubmit={handleSubmit(editWorkHistory)}>
            <InputGroup
              text="企業名"
              {...register("name", { required: true })}
              className={styles.smMarginBottom}
              defaultValue={mappedWorkHistory.name}
            />
            <InputGroup
              text="部署"
              className={styles.smMarginBottom}
              {...register("department", { required: true })}
              defaultValue={mappedWorkHistory.department}
            />
            <InputGroup
              text="役職"
              className={styles.smMarginBottom}
              {...register("position", { required: true })}
              defaultValue={mappedWorkHistory.position}
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
                  defaultValue={mappedWorkHistory.sinceDate}
                />
                <InputGroup
                  type="date"
                  text=""
                  className={classNames(styles.calender)}
                  {...register("untilDate", { required: true })}
                  defaultValue={mappedWorkHistory.untilDate}
                />
              </FlexBox>
            </FlexBox>
            <FlexBox justify="space-between">
              <Button
                color="danger"
                type="button"
                icon={<DeleteOutlined />}
                size="small"
                flex
                onClick={deleteWorkHistory}
              >
                削除する
              </Button>

              <FlexBox gap="xs" justify="end">
                <Button
                  color="white"
                  type="button"
                  onClick={() => setIsWorkHistoryEditModal(!isWorkHistoryEditModal)}
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
      )}
    </>
  );
};

export default WorkHistoryEditModal;
