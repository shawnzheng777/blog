export const Rule = {
  username: [
    {
      required: true,
      message: '请输入用户名',
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
