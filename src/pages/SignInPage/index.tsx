import { VFC } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { HttpClient } from "lib/axios";
import { APIHost } from "constants/APIHost";
import { Account } from "data/account";
import PersistenceKeys from "constants/persistenceKeys";
import { useCurrentAccount } from "hooks/useCurrentAccount";
import Button from "components/Button";
import Input from "components/Input";
import { Label, PageTitle } from "components/Text";
import { EyeOutlined } from "@ant-design/icons";
import styles from "./style.module.scss";
import classNames from "classnames";
import Sidebar from "components/Sidebar";

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

  const onSubmit = handleSubmit(async (prams) => {
    const res = await HttpClient.request<SignInResponse>({
      method: "POST",
      url: `${APIHost.AUTH}/sign_in`,
    });
    if (!res.data.token) return;

    localStorage.setItem(PersistenceKeys.TOKEN, res.data.token);
    await refetchAccount();
  });

  return (
    <div className={classNames(styles.root, styles.alignItemsCenter)}>
      <div className={classNames(styles.signInContainer, styles.row)}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <div className={styles.formContainer}>
          <PageTitle bold className={classNames(styles.lgMarginBottom, styles.textCenter)}>
            ログイン
          </PageTitle>
          <form onSubmit={onSubmit}>
            <div className={styles.xxlMarginBottom}>
              <div className={styles.xsMarginBottom}>
                <Label color="darkGray" className={styles.xsMarginBottom}>
                  メールアドレス
                </Label>
              </div>
              <Input
                {...register("email", {
                  required: "メールアドレスは必須です",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "無効なメールアドレスです",
                  },
                })}
                placeholder={"test@test.com"}
                icon={""}
              />
              <ErrorMessage
                errors={errors}
                name="email"
                render={({ message }) => <Label color="danger">{message}</Label>}
              />
            </div>
            <div className={styles.lgMarginBottom}>
              <div className={styles.xsMarginBottom}>
                <Label color="darkGray">パスワード</Label>
              </div>
              <Input
                {...register("password", {
                  required: "パスワードは必須です",
                  pattern: {
                    value: /\A(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])\w{6,12}\z/,
                    message:
                      "パスワードは半角6~12文字英大文字・小文字・数字それぞれ１文字以上含む必要があります",
                  },
                })}
                icon={<EyeOutlined />}
              />
              <ErrorMessage
                errors={errors}
                name="password"
                render={({ message }) => <Label color="danger">{message}</Label>}
              />
            </div>
            <Button type="submit" color="primary" className={styles.lgMarginBottom}>
              ログイン
            </Button>
            <Button type="button" color="darkGray" className={styles.lgMarginBottom}>
              新規登録はこちら
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
