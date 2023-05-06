import './MenuBar.scss';

import { unloadSheet } from 'actions/sheetActions';

import {
  GoldOutlined,
  LeftOutlined,
  MessageOutlined,
  ReadOutlined,
  SettingOutlined,
  SolutionOutlined,
} from '@ant-design/icons';

import { Divider, Menu, Popover } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

const ComingSoon = ({ children }) => {
  return (
    <Popover content="Coming Soon!" placement="right">
      {children}
    </Popover>
  );
};

const MenuBar = ({ demo = false }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const { character, _id } = useSelector(state => state.sheet);

  const backToSheetSelector = () => {
    dispatch(unloadSheet());
    history.push('/app');
  };

  const toSpellBook = () => {
    if (demo) {
      history.push(`/demo/spells`);
    } else {
      history.push(`/app/character/${_id}/spells`);
    }
  };
  const toInventory = () => {
    if (demo) {
      history.push(`/demo/inventory`);
    } else {
      history.push(`/app/character/${_id}/inventory`);
    }
  };

  const toSheet = () => {
    if (demo) {
      history.push(`/demo/`);
    } else {
      history.push(`/app/character/${_id}/`);
    }
  };
  const toContact = () => {
    if (!demo) {
      history.push(`/app/contact-us`);
    }
  };

  return (
    <div className="MenuBar">
      <ul>
        {location.pathname !== '/app' && (
          <li className="MenuBar-interactable" onClick={backToSheetSelector}>
            <LeftOutlined /> Sheet Selector
          </li>
        )}
        {character && (
          <>
            <li className="MenuBar-section">{character.name}</li>
            <li className="MenuBar-interactable" onClick={toSheet}>
              <SolutionOutlined /> Sheet
            </li>
            <li className="MenuBar-interactable" onClick={toSpellBook}>
              <ReadOutlined /> Spellbook
            </li>
            <li className="MenuBar-interactable" onClick={toInventory}>
              <GoldOutlined /> Inventory
            </li>
          </>
        )}

        <li className="MenuBar-section">Account</li>
        <ComingSoon>
          <li className="MenuBar-interactable">
            <SettingOutlined /> Settings
          </li>
        </ComingSoon>

        <li className="MenuBar-section">Other</li>
        <li className="MenuBar-interactable" onClick={toContact}>
          <MessageOutlined /> Contact us!
        </li>
      </ul>
    </div>
  );
};

export default MenuBar;
