export const Rule = {
  username: [
    {
      required: true,
      message: '请输入用户名',
    },
  ],
  email: [
    {
      message: '请输入正确的邮箱',
      pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    },
  ],
  phone: [
    {
      message: '请输入正确的手机号码',
      pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
    },
  ],
  password: [
    {
      required: true,
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/,
      message: '请输入密码,必须包含大小写字母和数字',
    },
  ],
  title: [
    {
      required: true,
      message: '请输入标题',
    },
  ],
  content: [
    {
      required: true,
      message: '请输入内容',
    },
  ],
};
