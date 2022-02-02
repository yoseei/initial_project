import { VFC } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { HttpClient } from "lib/axios";
import { APIBaseUrl } from "constants/apiBaseUrl";
import { Account } from "data/account";
import PersistenceKeys from "constants/persistenceKeys";
import { useCurrentAccount } from "hooks/useCurrentAccount";
import Button from "components/atoms/Button";
import Input from "components/atoms/Input";
import { Label, PageTitle } from "components/atoms/Text";
import { EyeOutlined } from "@ant-design/icons";
import styles from "./style.module.scss";
import classNames from "classnames";
import Sidebar from "components/molecules/Sidebar";
import FlexBox from "components/atoms/FlexBox";

type SignUpFormData = {
  account: {
    email: string;
    password: string;
  };
};

type SignUpResponse = {
  account: Account;
  token: string;
};

const SignUpPage: VFC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const { refetchAccount } = useCurrentAccount();

  const onSubmit = handleSubmit(async (params) => {
    const res = await HttpClient.request<SignUpResponse>({
      method: "POST",
      url: `${APIBaseUrl.AUTH}/sign_up`,
      data: params,
    });
    if (!res.data.token) return;

    localStorage.setItem(PersistenceKeys.TOKEN, res.data.token);
    await refetchAccount();
  });

  return (
    <FlexBox className={styles.root} align="middle">
      <FlexBox className={styles.signUpContainer}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <div className={styles.formContainer} style={{ flex: "1" }}>
          <PageTitle bold className={classNames(styles.lgMarginBottom, styles.textCenter)}>
            新規登録
          </PageTitle>
          <form onSubmit={onSubmit}>
            <div className={styles.xxlMarginBottom}>
              <Input
                {...register("account.email", {
                  required: "メールアドレスは必須です",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "無効なメールアドレスです",
                  },
                })}
                placeholder={"test@test.com"}
                icon={""}
                text="メールアドレス"
              />
              <ErrorMessage
                errors={errors}
                name="email"
                render={({ message }) => <Label color="danger">{message}</Label>}
              />
            </div>
            <div className={styles.lgMarginBottom}>
              <Input
                {...register("account.password", {
                  required: "パスワードは必須です",
                  // pattern: {
                  //   value: /\A(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])\w{6,12}\z/,
                  //   message:
                  //     "パスワードは半角6~12文字英大文字・小文字・数字それぞれ１文字以上含む必要があります",
                  // },
                })}
                icon={<EyeOutlined />}
                text="パスワード"
              />
              <ErrorMessage
                errors={errors}
                name="password"
                render={({ message }) => <Label color="danger">{message}</Label>}
              />
            </div>
            <Button
              type="submit"
              color="primary"
              className={classNames(styles.lgMarginBottom, styles.sPadding)}
            >
              新規登録
            </Button>
            <Button
              type="button"
              color="darkGray"
              className={classNames(styles.lgMarginBottom, styles.sPadding)}
            >
              ログインはこちら
            </Button>
          </form>
        </div>
      </FlexBox>
    </FlexBox>
  );
};

export default SignUpPage;
