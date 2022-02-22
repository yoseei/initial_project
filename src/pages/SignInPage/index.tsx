import { VFC } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { HttpClient } from "lib/axios";
import { APIBaseUrl } from "constants/apiBaseUrl";
import { Account } from "data/account";
import PersistenceKeys from "constants/persistenceKeys";
import { useCurrentAccount } from "hooks/useCurrentAccount";
import Button from "components/atoms/Button";
import Input from "components/molecules/InputGroup";
import { Label, PageTitle } from "components/atoms/Text";
import { EyeOutlined } from "@ant-design/icons";
import styles from "./style.module.scss";
import classNames from "classnames";
import Sidebar from "components/molecules/Sidebar";
import FlexBox from "components/atoms/FlexBox";
import { Link } from "react-router-dom";

type SignInFormData = {
  email: string;
  password: string;
};

type SignInResponse = {
  account: Account;
  token: string;
};

const SignInPage: VFC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const { refetchAccount } = useCurrentAccount();

  const onSubmit = handleSubmit(async (params) => {
    const res = await HttpClient.post<SignInResponse>(
      `${APIBaseUrl.AUTH}/sign_in`,
      {
        account: params,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.data.token) return;
    localStorage.setItem(PersistenceKeys.TOKEN, res.data.token);
    await refetchAccount();
  });

  return (
    <FlexBox className={styles.root} align="middle">
      <FlexBox className={styles.signInContainer}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <div className={styles.formContainer} style={{ flex: "1" }}>
          <PageTitle bold className={classNames(styles.lgMarginBottom, styles.textCenter)}>
            ログイン
          </PageTitle>
          <form onSubmit={onSubmit}>
            <div className={styles.xxlMarginBottom}>
              <Input
                {...register("email", {
                  required: "メールアドレスは必須です",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "無効なメールアドレスです",
                  },
                })}
                placeholder={"test@test.com"}
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
                {...register("password", {
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
              ログイン
            </Button>
            <Button
              type="button"
              color="darkGray"
              className={classNames(styles.lgMarginBottom, styles.sPadding)}
            >
              <Link to="/sign_up">新規登録はこちら</Link>
            </Button>
          </form>
        </div>
      </FlexBox>
    </FlexBox>
  );
};

export default SignInPage;
