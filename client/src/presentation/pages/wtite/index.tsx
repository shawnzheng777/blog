import { FC } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import styles from './index.module.scss';
import { useRequest } from 'ahooks';
import { createDashboard } from '@/infrastructure/service/dashboard';
import { useHistory } from 'react-router-dom';
import { Rule } from '@/presentation/config/rule';

const Write: FC = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const { run } = useRequest(createDashboard, {
    onSuccess() {
      message.success('提交成功');
      setTimeout(() => {
        history.push('/home');
      }, 1000);
    },
    manual: true,
  });
  const onSubmit = async () => {
    await form.validateFields();
    const formValue = form.getFieldsValue();
    run(formValue);
  };

  return (
    <Card className={styles.card}>
      <Form layout={'vertical'} form={form}>
        <Form.Item label={'标题'} name={'title'} rules={Rule.title} required>
          <Input />
        </Form.Item>
        <Form.Item label={'内容'} name={'content'} rules={Rule.content} required>
          <Input.TextArea />
        </Form.Item>
        <Form.Item label={'标签'} name={'tag'}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type={'primary'} onClick={onSubmit}>
            提交
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Write;
