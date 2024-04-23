import React, { FC, useState } from 'react';
import { Menu, Button, Avatar, Space, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { useHistory } from 'react-router';
import favicon from '@/assets/image/favicon.png';
import styles from '@/presentation/layouts/index.module.scss';
import { useStores } from '@/presentation/store';
import { observer } from 'mobx-react-lite';
import { Publish } from '@/presentation/components/publish';
import { genAvatar } from '@/presentation/utils/avatar';

enum IMenu {
  UserInfo = 'userInfo',
  LoginOut = 'loginOut',
}

export const Header: FC = observer(() => {
  const defaultKey = window.location.pathname.replace('/', '') || 'home';
  const [key, setKey] = useState(defaultKey);
  const history = useHistory();
  const { isLogin, loginOut, userInfo } = useStores().AuthStore;
  const tabs = [
    { label: 'HOME', key: 'home' },
    { label: 'SOME', key: 'some' },
    { label: 'OTHER', key: 'other' },
  ];

  const handClick = (key: string) => {
    if (key === IMenu.UserInfo) {
      history.push('/user-info');
    }
    if (key === IMenu.LoginOut) {
      loginOut();
      history.push('/login');
    }
  };

const items: MenuProps['items'] = [
  {
    key: IMenu.UserInfo,
    label: <Button type='link' onClick={() => handClick(IMenu.UserInfo)}>个人信息</Button>,
  },
  {
    key: IMenu.LoginOut,
    label: <Button type='link' onClick={() => handClick(IMenu.LoginOut)}>退出登录</Button>,
  }
];

  return (
    <>
      <img
        className={styles.headerIcon}
        src={favicon}
        alt={''}
        width={38}
        height={38}
        onClick={() => {
          history.push('/home');
        }}
      />
      <Menu
        mode="horizontal"
        items={tabs}
        onClick={(val) => {
          setKey(val.key);
          history.push(`${val.key}`);
        }}
        activeKey={key}
      />
      <Space size={40}>
        <Publish />
        {isLogin ? (
          <Dropdown menu={{ items }}>
            <Avatar src={genAvatar(userInfo?.username || '')} />
          </Dropdown>
        ) : (
          <Button
            type="primary"
            onClick={() => {
              history.push('/login');
            }}
          >
            登录
          </Button>
        )}
      </Space>
    </>
  );
});
