import React, { VFC } from "react";
import classNames from "classnames";
import styles from "./style.module.scss";
import { BodyTextSmall, Label, SectionTitle } from "components/atoms/Text";
import FlexBox from "components/atoms/FlexBox";
import InputGroup from "components/molecules/InputGroup";
import Button from "components/atoms/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { AcademicHistoryData } from "pages/MyPage/index";
import { DeleteOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { ErrorMessage } from "@hookform/error-message";

type AcademicHistoryModalProps = {
  academicHistory?: AcademicHistoryData;
  onSubmit: SubmitHandler<AcademicHistoryData>;
  deleteAcademicHistory?: (academicHistory: AcademicHistoryData) => Promise<void>;
  cancel: () => void;
  visible: boolean;
};

const AcademicHistoryModal: VFC<AcademicHistoryModalProps> = ({
  academicHistory,
  onSubmit,
  deleteAcademicHistory,
  cancel,
  visible,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AcademicHistoryData>();

  return (
    <>
      <Modal closable={false} footer={null} onCancel={cancel} visible={visible} centered={true}>
        {academicHistory ? (
          <div className={classNames(styles.rightInTheMiddle, styles.academicHistoryModal)}>
            <SectionTitle className={classNames(styles.textCenter, styles.smMarginBottom)}>
              学歴
            </SectionTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ErrorMessage
                errors={errors}
                name="name"
                render={({ message }) => <Label color="danger">{message}</Label>}
              />
              <InputGroup
                text="学校名"
                {...register("name", { required: "学校名は必須です" })}
                className={styles.smMarginBottom}
                defaultValue={academicHistory.name}
              />
              <ErrorMessage
                errors={errors}
                name="faculty"
                render={({ message }) => <Label color="danger">{message}</Label>}
              />
              <InputGroup
                text="学部・学科"
                className={styles.smMarginBottom}
                {...register("faculty", { required: "学部・学科は必須です" })}
                defaultValue={academicHistory.faculty}
              />
              <ErrorMessage
                errors={errors}
                name="position"
                render={({ message }) => <Label color="danger">{message}</Label>}
              />

              <FlexBox direction="column">
                <BodyTextSmall color="darkGray">入学期間</BodyTextSmall>
                <FlexBox gap="md">
                  <InputGroup
                    type="date"
                    className={classNames(styles.smMarginBottom, styles.calender)}
                    {...register("sinceDate", { required: true })}
                    defaultValue={academicHistory.sinceDate}
                  />
                  <InputGroup
                    type="date"
                    className={classNames(styles.calender)}
                    {...register("untilDate", { required: true })}
                    defaultValue={academicHistory.untilDate}
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
                  onClick={() => deleteAcademicHistory && deleteAcademicHistory(academicHistory)}
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
          <div className={classNames(styles.rightInTheMiddle, styles.academicHistoryModal)}>
            <SectionTitle className={classNames(styles.textCenter, styles.smMarginBottom)}>
              学歴
            </SectionTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ErrorMessage
                name="name"
                errors={errors}
                render={({ message }) => <Label color="danger">{message}</Label>}
              />
              <InputGroup
                text="学校名"
                {...register("name", { required: "学校名は必須です" })}
                className={styles.smMarginBottom}
              />
              <ErrorMessage
                name="faculty"
                errors={errors}
                render={({ message }) => <Label color="danger">{message}</Label>}
              />
              <InputGroup
                text="学部・学科"
                className={styles.smMarginBottom}
                {...register("faculty", { required: "学部・学科は必須です" })}
              />

              <FlexBox direction="column">
                <BodyTextSmall color="darkGray">入学期間</BodyTextSmall>
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

export default AcademicHistoryModal;
