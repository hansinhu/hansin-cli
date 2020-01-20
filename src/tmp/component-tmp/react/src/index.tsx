import React from 'react';
import classNames from 'classnames';

export interface DemoProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
}

const Demo: React.FC<DemoProps> = ({
  prefixCls = 'hansin-rc-demo',
  className,
  style,
  ...restProps
}) => {
  const cls = classNames(`${prefixCls}`, className);
  return (
    <div
      className={cls}
      style={style}
      {...restProps}
    >
      <div className={`${prefixCls}-container`}>Hansin-Rc-Demo</div>
    </div>
  );
};

export default Demo;
