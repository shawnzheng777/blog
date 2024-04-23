import React, { FC, useEffect } from 'react';
import { Popover, Button, Space, Typography, message } from 'antd';
import { CaretDownOutlined, ProfileOutlined, QuestionCircleOutlined, CreditCardOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import { useStores } from '@/presentation/store';
import { useHistory } from 'react-router-dom';

export const Publish: FC = () => {
  const { loadLogin, isLogin } = useStores().AuthStore;
  const history = useHistory();

  const getContentMap = (isLogin: boolean) => [
    {
      key: 'write',
      text: '写文章',
      getIcon: () => <ProfileOutlined style={{ fontSize: '30px' }} />,
      onClick: () => {
        if (!isLogin) {
          setTimeout(() => {
            message.warning('请先登录');
            history.push('/login');
          }, 1000);
          return;
        }
        history.push('/write');
      },
    },
    {
      key: 'question',
      text: '提问题',
      getIcon: () => <QuestionCircleOutlined style={{ fontSize: '30px' }} />,
      onClick: () => {
        message.info('功能暂未开放');
      },
    },
    {
      key: 'project',
      text: '建项目',
      getIcon: () => <CreditCardOutlined style={{ fontSize: '30px' }} />,
      onClick: () => {
        message.info('功能暂未开放');
      },
    },
  ];

  useEffect(() => {
    loadLogin(localStorage.getItem('token'));
    // eslint-disable-next-line
  }, []);

  const content = (
    <Space size={50}>
      {getContentMap(isLogin).map((item) => (
        <div className={styles.publishItem} onClick={item.onClick} key={item.key} data-id={item.key}>
          {item.getIcon()}
          <Typography.Text>{item.text}</Typography.Text>
        </div>
      ))}
    </Space>
  );

  return (
    <Popover trigger={'hover'} content={content}>
      <Button className={styles.publishBtn}>
        创作
        <CaretDownOutlined />
      </Button>
    </Popover>
  );
};
