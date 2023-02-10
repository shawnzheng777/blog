import React, { FC, useState } from "react";
import { Menu, Button, Avatar } from "antd";
import { useHistory } from "react-router";
import { getParamFromUrl } from "@/infrastructure/history";
import favicon from "@/assets/image/favicon.png";
import styles from "@/presentation/layouts/index.module.scss";
import { useStores } from "@/presentation/store";
import { UnderlineOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";

export const Header: FC = observer(() => {
  const defaultKey = getParamFromUrl("tab") || "home";
  const [key, setKey] = useState(defaultKey);
  const history = useHistory();
  const { isLogin } = useStores().AuthStore;
  const items = [
    { label: "HOME", key: "home" },
    { label: "SOME", key: "some" },
    { label: "OTHER", key: "other" },
  ];

  return (
    <>
      <img
        className={styles.headerIcon}
        src={favicon}
        alt={""}
        width={38}
        height={38}
        onClick={() => {
          history.push("home?tab=home");
        }}
      />
      <Menu
        mode="horizontal"
        items={items}
        onClick={(val) => {
          setKey(val.key);
          history.push(`${val.key}?tab=${val.key}`);
        }}
        activeKey={key}
      />
      {isLogin ? (
        <Avatar icon={<UnderlineOutlined />} />
      ) : (
        <Button
          type="primary"
          onClick={() => {
            history.push("login");
          }}
        >
          登录
        </Button>
      )}
    </>
  );
});
