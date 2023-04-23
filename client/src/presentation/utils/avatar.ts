/**
 * 根据用户名生成随机背景的头像
 * 正方形
 * @param userName
 * @param size
 */
export function genAvatar(userName: string, size = 48): string {
  const color = randomColor(userName);
  const center = size / 2;

  const firstChar = userName.substring(0, 1);
  const cvs = document.createElement('canvas');
  cvs.setAttribute('width', `${size}`);
  cvs.setAttribute('height', `${size}`);
  const context = cvs.getContext('2d');

  if (context) {
    context.fillStyle = color;
    context.fillRect(0, 0, size, size);
    context.fillStyle = '#fff';
    context.font = `${size * 0.5}px TencentSans`;
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.fillText(firstChar, center, center);
  }

  return cvs.toDataURL('image/jpeg', 1);
}

const randomColor = (userName: string) => {
  let color = '';
  for (let i = 0; i < userName.length; i++) {
    color += parseInt(String(userName[i].charCodeAt(0)), 10).toString(16);
  }

  return `#${color.slice(1, 4)}`;
};
