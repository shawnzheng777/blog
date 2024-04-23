import React, { FC } from 'react';
import { Card, Spin, Typography, Space } from 'antd';
import { useRequest } from 'ahooks';
import { getDashboard } from '@/infrastructure/service/dashboard';
import { LikeOutlined } from '@ant-design/icons';
import moment from 'moment';
import styles from './index.module.scss';
import { useHistory } from 'react-router-dom';
import { EmptyData } from '@/presentation/components/empty';
import { isEmpty } from 'lodash-es';

const Home: FC = () => {
  const { data: dashboardData, loading } = useRequest(() => getDashboard());
  const history = useHistory();

  if (isEmpty(dashboardData)) {
    return <EmptyData />;
  }

  return (
    <Spin spinning={loading}>
      <Space direction="vertical">
        {dashboardData?.map((item, index) => (
          <Card className={styles.dashboardCard} key={index} onClick={() => history.push('/detail')}>
            <Typography.Title level={4} className={styles.title}>
              <Typography.Text>{item.title}</Typography.Text>
              <Typography.Text className={styles.text}>
                {moment(item.create_time).format('YYYY/MM/DD')}
              </Typography.Text>
            </Typography.Title>
            <Typography.Paragraph>{item.content}</Typography.Paragraph>
            <Typography.Paragraph className={styles.like}>
              <LikeOutlined className={styles.likeIcon} />
              <Typography.Text className={styles.likeNum}>{item.like}</Typography.Text>
            </Typography.Paragraph>
            <Typography.Text className={styles.author}>{item.user.username}</Typography.Text>
          </Card>
        ))}
      </Space>
    </Spin>
  );
};

export default Home;
