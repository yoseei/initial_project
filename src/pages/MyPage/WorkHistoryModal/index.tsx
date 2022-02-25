import React, { VFC } from "react";
import classNames from "classnames";
import styles from "./style.module.scss";
import { BodyTextSmall, Label, SectionTitle } from "components/atoms/Text";
import FlexBox from "components/atoms/FlexBox";
import InputGroup from "components/molecules/InputGroup";
import Button from "components/atoms/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { WorkHistoryData } from "pages/MyPage/index";
import { DeleteOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { ErrorMessage } from "@hookform/error-message";

type WorkHistoryModalProps = {
  workHistory?: WorkHistoryData;
  onSubmit: SubmitHandler<WorkHistoryData>;
  deleteWorkHistory?: (workHistory: WorkHistoryData) => Promise<void>;
  cancel: () => void;
  visible: boolean;
};

const WorkHistoryModal: VFC<WorkHistoryModalProps> = ({
  workHistory,
  onSubmit,
  deleteWorkHistory,
  cancel,
  visible,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WorkHistoryData>();

  return (
    <>
      <Modal closable={false} footer={null} onCancel={cancel} visible={visible} centered={true}>
        {workHistory ? (
          <div className={classNames(styles.rightInTheMiddle, styles.workHistoryModal)}>
            <SectionTitle className={classNames(styles.textCenter, styles.smMarginBottom)}>
              職歴
            </SectionTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ErrorMessage
                errors={errors}
                name="name"
                render={({ message }) => <Label color="danger">{message}</Label>}
              />
              <InputGroup
                text="企業名"
                {...register("name", { required: "企業名は必須です" })}
                className={styles.smMarginBottom}
                defaultValue={workHistory.name}
              />
              <ErrorMessage
                errors={errors}
                name="department"
                render={({ message }) => <Label color="danger">{message}</Label>}
              />
              <InputGroup
                text="部署"
                className={styles.smMarginBottom}
                {...register("department", { required: "部署は必須です" })}
                defaultValue={workHistory.department}
              />
              <ErrorMessage
                errors={errors}
                name="position"
                render={({ message }) => <Label color="danger">{message}</Label>}
              />
              <InputGroup
                text="役職"
                className={styles.smMarginBottom}
                {...register("position", { required: "役職は必須です" })}
                defaultValue={workHistory.position}
              />

              <FlexBox direction="column">
                <BodyTextSmall color="darkGray">入社期間</BodyTextSmall>
                <FlexBox gap="xs">
                  <FlexBox align="middle" gap="xs">
                    <input type="radio" id="employed" {...register("isEmployed")} value="true" />
                    <label htmlFor="employed">在職中</label>

                    <input
                      type="radio"
                      id="notEmployed"
                      {...register("isEmployed")}
                      value="false"
                    />
                    <label htmlFor="notEmployed">離職中</label>
                  </FlexBox>
                </FlexBox>
                <FlexBox gap="md">
                  <InputGroup
                    type="date"
                    className={classNames(styles.smMarginBottom, styles.calender)}
                    {...register("sinceDate", { required: true })}
                    defaultValue={workHistory.sinceDate}
                  />
                  <InputGroup
                    type="date"
                    className={classNames(styles.calender)}
                    {...register("untilDate", { required: true })}
                    defaultValue={workHistory.untilDate}
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
                  onClick={() => deleteWorkHistory && deleteWorkHistory(workHistory)}
                >
                  削除する
                </Button>

                <FlexBox gap="xs" justify="end">
                  <Button color="white" type="button" onClick={cancel} size="small">
                    キャンセル
                  </Button>
                  <Button color="primary" type="submit" size="small">
                    更新
                  </Button>
                </FlexBox>
              </FlexBox>
            </form>
          </div>
        ) : (
          <div className={classNames(styles.rightInTheMiddle, styles.workHistoryModal)}>
            <SectionTitle className={classNames(styles.textCenter, styles.smMarginBottom)}>
              職歴
            </SectionTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ErrorMessage
                name="name"
                errors={errors}
                render={({ message }) => <Label color="danger">{message}</Label>}
              />
              <InputGroup
                text="企業名"
                {...register("name", { required: "企業名は必須です" })}
                className={styles.smMarginBottom}
              />
              <ErrorMessage
                name="department"
                errors={errors}
                render={({ message }) => <Label color="danger">{message}</Label>}
              />
              <InputGroup
                text="部署"
                className={styles.smMarginBottom}
                {...register("department", { required: "部署は必須です" })}
              />
              <ErrorMessage
                errors={errors}
                name="position"
                render={({ message }) => <Label color="danger">{message}</Label>}
              />
              <InputGroup
                text="役職"
                className={styles.smMarginBottom}
                {...register("position", { required: "役職は必須です" })}
              />

              <FlexBox direction="column">
                <BodyTextSmall color="darkGray">入社期間</BodyTextSmall>
                <FlexBox gap="xs">
                  <FlexBox align="middle" gap="xs">
                    <input type="radio" id="employed" {...register("isEmployed")} value="true" />
                    <label htmlFor="employed">在職中</label>

                    <input
                      type="radio"
                      id="notEmployed"
                      {...register("isEmployed")}
                      value="false"
                    />
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
                <FlexBox gap="xs" justify="end">
                  <Button color="white" type="button" onClick={cancel} size="small">
                    キャンセル
                  </Button>
                  <Button color="primary" type="submit" size="small">
                    作成
                  </Button>
                </FlexBox>
              </FlexBox>
            </form>
          </div>
        )}
      </Modal>
    </>
  );
};

export default WorkHistoryModal;
