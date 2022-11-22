import React, { FC, useState } from 'react';
import { Form, Input, Modal, Button } from 'antd';
import { LoginParams, login, register } from '@/api/auth';
import { useRequest, useLocalStorageState } from 'ahooks';
import { isEmpty } from 'lodash-es';

enum Mode {
    Login = 'login',
    Register = 'register',
}

export const UserLogin: FC = () => {
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState(Mode.Login)
    const [, setStorage] = useLocalStorageState('token');
    const [form] = Form.useForm();

    const onResetForm = () => form.resetFields();

    const { run } = useRequest(mode === Mode.Login ? login : register, {
        onSuccess: (data) => {
            if (mode === Mode.Login) {
                if (!!data?.token) {
                    setStorage(data?.token);
                    setOpen(false);
                    onResetForm();
                }
            }
        },
        manual: true,
    });

    const onFinish = (values: LoginParams) => {
        if (isEmpty(values)) {
            return;
        }
        run(values);
    };

    const changeMode = (mode: Mode) => {
        setMode(mode);
    };

    const usernameRules = [
        {
            required: true,
            message: '请输入用户名'
        },
    ];

    const passwordRules = [
        {
            required: true,
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/,
            message: '请输入密码,必须包含中文、大小写字母、和数字'
        },
    ];

    return <>
        <Button
            type={'link'}
            onClick={() => setOpen(true)}
            style={{ lineHeight: '53px' }}
        >
            登陆
        </Button>
        <Modal
            title={mode === Mode.Login ? '用户登陆' : '账号注册'}
            open={open}
            footer={null}
            onCancel={() => {
                setOpen(false);
                onResetForm();
            }}
        >
            {mode === Mode.Login
                ? <Form
                    name="basic"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onFinish}
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item
                        label={'用户名'}
                        name={'username'}
                        rules={usernameRules}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label={'密码'}
                        name={'password'}
                        rules={passwordRules}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 5 }}>
                        <Button type='primary' htmlType='submit'>
                            登陆
                        </Button>
                        <Button type='link' style={{ marginLeft: '88px' }} onClick={() => changeMode(Mode.Register)}>
                            {'>>没有账号？立即注册'}
                        </Button>
                    </Form.Item>
                </Form>
                : <Form
                    name="basic"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item
                        label={'用户名'}
                        name={'username'}
                        rules={usernameRules}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label={'密码'}
                        name={'password'}
                        rules={passwordRules}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item label={'描述'} name={'desc'}>
                        <Input.TextArea/>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 5 }}>
                        <Button type='primary' htmlType='submit'>
                            注册
                        </Button>
                        <Button type='link' style={{ marginLeft: '160px' }} onClick={() => changeMode(Mode.Login)}>
                            {'返回登陆'}
                        </Button>
                    </Form.Item>
                </Form>
            }
        </Modal>
    </>;
}