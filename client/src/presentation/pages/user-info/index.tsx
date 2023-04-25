import React, { FC, useState, useEffect } from 'react';
import { Descriptions, Card } from 'antd';
import { getUserInfo, IUserInfo } from '@/infrastructure/service/user';
import { useStores } from '@/presentation/store';
import { observer } from 'mobx-react-lite';

const UserInfo: FC = observer(() => {
  const { userInfo } = useStores().AuthStore;
  const [info, setInfo] = useState<IUserInfo>({});

  useEffect(() => {
    const load = async () => {
      const info = await getUserInfo(userInfo.username);
      setInfo(info);
    };

    if (userInfo?.username) {
      load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo?.username]);

  return (
    <Card>
      <Descriptions column={2}>
        <Descriptions.Item label="用户名">{info.username}</Descriptions.Item>
        <Descriptions.Item label="UUID">{info.uuid}</Descriptions.Item>
        <Descriptions.Item label="邮箱">{info.email || '-'}</Descriptions.Item>
        <Descriptions.Item label="手机">{info.phone || ''}</Descriptions.Item>
        <Descriptions.Item label="注册时间">{info.createTime}</Descriptions.Item>
        <Descriptions.Item label="描述">{info.desc || '-'}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
});

export default UserInfo;
