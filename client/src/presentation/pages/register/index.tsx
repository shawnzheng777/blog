import React from "react";
import { Form, Input, Button, Card, message } from "antd";
import { LoginParams, registerUser } from "@/api/auth";
import { useRequest } from "ahooks";
import { isEmpty } from "lodash-es";
import { Rule } from "@/presentation/config/rule";
import styles from "@/presentation/pages/register/index.module.scss";
import classnames from "classnames";
import { useHistory } from "react-router";
import moment from "moment";

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const history = useHistory();

  const { run } = useRequest(registerUser, {
    onSuccess: (data) => {
      if (data.id) {
        message.success("注册成功,正在跳转至登录页");
        setTimeout(() => {
          history.push("/login");
        }, 1000);
      } else {
        message.error("注册失败");
      }
    },
    manual: true,
  });

  const onFinish = (values: LoginParams) => {
    if (isEmpty(values)) {
      return;
    }
    run({
      ...values,
      createTime: moment().format(),
    });
  };

  return (
    <Card title="注册" className={classnames(styles.registerCard)}>
      <Form
        name="basic"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
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
        <Form.Item label={"描述"} name={"desc"}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 5 }}>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
          <Button
            type="link"
            className={classnames(styles.goLogin)}
            onClick={() => {
              window.location.replace("/login");
            }}
          >
            {">>返回登陆"}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Login;