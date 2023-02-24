import React, { FC } from 'react';
import { Header as LayoutsHeader } from '@/presentation/layouts/header';
import { Footer as LayoutsFooter } from '@/presentation/layouts/footer';
import { Layout } from 'antd';
import styles from './index.module.scss';
import { observer } from 'mobx-react-lite';
import UseWatermark from '@/presentation/utils/watermark';

const { Header, Content, Footer } = Layout;

interface IProps {
  component: any;
}

export const AppLayouts: FC<IProps> = observer((props) => {
  const { component: LayoutsContent } = props;

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <LayoutsHeader />
      </Header>
      <UseWatermark>
        <Content className={styles.content}>
          <LayoutsContent />
        </Content>
      </UseWatermark>
      <Footer className={styles.footer}>
        <LayoutsFooter />
      </Footer>
    </Layout>
  );
});
