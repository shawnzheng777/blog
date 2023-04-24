import React, { FC } from 'react';
import { Descriptions, Card } from 'antd';
// import { useRequest } from 'ahooks';

const UserInfo: FC = () => {
  return (
    <Card>
      <Descriptions column={2}>
        <Descriptions.Item label="UserName">{'1'}</Descriptions.Item>
        <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
        <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
        <Descriptions.Item label="Remark">empty</Descriptions.Item>
        <Descriptions.Item label="Address">
          No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default UserInfo;
