import React from "react";
import { Form, Input, Button, Card, message } from "antd";
import { LoginParams, loginUser } from "@/api/auth";
import { useRequest } from "ahooks";
import { isEmpty } from "lodash-es";
import { Rule } from "@/presentation/config/rule";
import styles from "@/presentation/pages/login/index.module.scss";
import { useHistory } from "react-router";
import { useStores } from "@/presentation/store";

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const { loadLogin } = useStores().AuthStore;

  const { run } = useRequest(loginUser, {
    onSuccess: (data) => {
      if (!!data?.token) {
        message.success("登陆成功");
        loadLogin(data?.token);
        localStorage.setItem("token", data?.token);
        setTimeout(() => {
          history.push("/");
        }, 1000);
      }
    },
    manual: true,
  });

  const onFinish = (values: LoginParams) => {
    if (isEmpty(values)) {
      return;
    }
    run(values);
  };

  return (
    <Card title="登陆" className={styles.loginCard}>
      <Form
        name="basic"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        autoComplete="off"
        form={form}
      >
        <Form.Item label={"用户名"} name={"username"} rules={Rule.username}>
          <Input />
        </Form.Item>
        <Form.Item label={"密码"} name={"password"} rules={Rule.password}>
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 5 }}>
          <Button type="primary" htmlType="submit">
            登陆
          </Button>
          <Button
            type="link"
            className={styles.goRegister}
            onClick={() => {
              window.location.replace("/register");
            }}
          >
            {">>没有账号？立即注册"}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Login;
