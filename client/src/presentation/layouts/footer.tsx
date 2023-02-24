import React, { FC } from 'react';

export const Footer: FC = () => {
  return (
    <div
      onClick={() => window.open('https://beian.miit.gov.cn')}
      style={{ cursor: 'pointer', textDecorationLine: 'underline' }}
    >
      粤ICP备2022146655号-1
    </div>
  );
};
