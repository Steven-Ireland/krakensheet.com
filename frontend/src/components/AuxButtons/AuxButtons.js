import './AuxButtons.scss';

import {
  MinusCircleTwoTone,
  PlusCircleTwoTone,
  QuestionCircleOutlined,
  RedoOutlined,
  SettingOutlined,
  SwapOutlined,
} from '@ant-design/icons';

import { Popover } from 'antd';
import cx from 'classnames';
import React from 'react';

const AuxButtons = ({
  onPlus,
  onMinus,
  onSwap,
  infoMenu,
  infoMenuTitle,
  settingsMenu,
  settingsMenuTitle,
  onReset,
  swapActive,
  minusActive,
  horizontal = false
}) => {
  const grey = '#333';
  const lightgrey = '#888';
  const lightergrey = '#DDD';

  return (
    <div className={cx('AuxButtons', { 'AuxButtons--horizontal': horizontal })}>
      {onPlus && (
        <div onClick={onPlus}>
          <PlusCircleTwoTone twoToneColor={grey} />
        </div>
      )}
      {onMinus && (
        <div onClick={onMinus}>
          <MinusCircleTwoTone twoToneColor={minusActive ? lightgrey : grey} />
        </div>
      )}
      {onSwap && (
        <div onClick={onSwap}>
          <SwapOutlined style={{ color: swapActive ? lightergrey: lightgrey }} />
        </div>
      )}
      {infoMenu && (
        <Popover
          content={infoMenu}
          title={infoMenuTitle}
          trigger="hover"
          placement="topRight"
          overlayClassName="AuxButtons-menu">
          <div>
            <QuestionCircleOutlined style={{ color: lightgrey }} />
          </div>
        </Popover>
      )}
      {settingsMenu && (
        <Popover
          content={settingsMenu}
          title={settingsMenuTitle}
          trigger="click"
          placement="topRight"
          overlayClassName="AuxButtons-menu">
          <div>
            <SettingOutlined style={{ color: lightgrey }} />
          </div>
        </Popover>
      )}
      {onReset && (
        <div onClick={onReset}>
          <RedoOutlined style={{ color: lightgrey }} />
        </div>
      )}
    </div>
  );
};

export default AuxButtons;
