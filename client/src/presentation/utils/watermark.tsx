import React from 'react';
import Watermark, { WatermarkProps } from 'antd-watermark';

const UseWatermark: React.FC<WatermarkProps> = (props) => (
  <Watermark content={[]} style={{ minHeight: 'calc(100vh - 154px)' }}>
    {props.children}
  </Watermark>
);

export default UseWatermark;
