import { Input, List, Modal } from 'antd';
import axios from 'axios';
import debounce from 'debounce';
import { useClassName } from 'hooks/statistics';
import React, { useReducer } from 'react';

const searchUrl = '/api/spell/search/';

const spellSelectorReducer = (state, action) => {
  switch (action.type) {
    case 'startLoading':
      return {
        ...state,
        loading: true
      };
    case 'loaded':
      return {
        ...state,
        spells: action.spells
      };
    default:
      return state;
  }
};

const SpellSelector = ({ isVisible, casterLevel, onSelect, onClose }) => {
  const [state, dispatch] = useReducer(spellSelectorReducer, {
    loading: false,
    spells: []
  });
  const myClassKey = useClassName();
  const fetchData = debounce(async searchName => {
    if (searchName) {
      dispatch({ type: 'startLoading' });

      const shouldIgnoreFilter = searchName.startsWith('!');
      const params = {
        spellName: shouldIgnoreFilter ? searchName.toLowerCase().substring(1) : searchName.toLowerCase(),
      };

      if (!shouldIgnoreFilter) {
        params.casterLevel = casterLevel;
        params.className = myClassKey;
      }
      const response = await axios.get(searchUrl, {params});

      dispatch({ type: 'loaded', spells: response.data });
    }
  }, 75);

  return (
    <Modal
      className="BigOmniModal"
      title={
        <Input
          ref={input => input && input.focus()}
          placeholder="Search for a spell"
          size="large"
          onChange={e => fetchData(e.target.value)}
        />
      }
      visible={isVisible}
      closable={false}
      onCancel={onClose}
      onOk={onClose}>
      <List size="large">
        {state.spells.map((spell, idx) => {
          return (
            <List.Item
              className="SearchAdderResult"
              key={idx}
              onClick={() => onSelect(spell)}>
              {spell.name}
            </List.Item>
          );
        })}
      </List>
    </Modal>
  );
};

export default SpellSelector;
