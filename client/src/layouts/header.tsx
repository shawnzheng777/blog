import React, { FC } from 'react';
import { Menu } from 'antd'

export const Header: FC = () => {
    const items = [
        { label: 'HOME', key: '1' },
        { label: 'SOME', key: '2' },
        { label: 'OTHER', key: '3' },
    ];

    return (
        <Menu
            mode="horizontal"
            defaultSelectedKeys={['1']}
        >
            {items.map(item => (<Menu.Item key={item.key}>{item.label}</Menu.Item>))}
        </Menu>
    );
}
