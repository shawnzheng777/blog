import React, { FC } from 'react';
import { Header as LayoutsHeader } from '@/layouts/header';
import { Content as LayoutsContent } from '@/layouts/content';
import { Footer as LayoutsFooter } from '@/layouts/footer';
import { Layout } from 'antd';
import style from './index.module.scss';

const { Header, Content, Footer } = Layout;


export const Layouts: FC = () => {
    return <Layout className={style.layout}>
        <Header className={style.header}>
          <LayoutsHeader/>
        </Header>
        <Content className={style.content}>
          <LayoutsContent/>
        </Content>
        <Footer className={style.footer}>
          <LayoutsFooter/>
        </Footer>
    </Layout>;
};
