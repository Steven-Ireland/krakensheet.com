import './SpellsKnown.scss';

import {
  addSpell,
  castSpell,
  prepareSpell,
  removeSpell,
  restResetSpells,
  unPrepareSpell
} from 'actions/spellcastingActions';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { PlusOutlined } from '@ant-design/icons';
import { Popover, Tag } from 'antd';
import cx from 'classnames';
import AuxButtons from 'components/AuxButtons/AuxButtons';
import SpellDetail from 'components/SpellDetail/SpellDetail';
import {
  useClassName,
  useKnownSpellLevels,
  useSpells,
  useTotalSpellsPerDay
} from 'hooks/statistics';
import React, { useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';

import SpellSelector from './SpellSelector';

const TooltipIcon = ({ text, ...rest }) => {
  return (
    <Popover placement="top" content={text}>
      <LegacyIcon style={{ fontSize: '18px' }} {...rest} />
    </Popover>
  );
};

const spellsKnownReducer = (state, action) => {
  switch (action.type) {
    case 'openSelector':
      return {
        ...state,
        showSelector: true,
        spellLevel: action.spellLevel
      };
    case 'closeSelector':
      return {
        ...state,
        showSelector: false
      };
    case 'openDetail':
      return {
        ...state,
        showDetail: true,
        spell: action.spell
      };
    case 'closeDetail':
      return {
        ...state,
        showDetail: false
      };
    default: {
      return state;
    }
  }
};

const handleCast = ({ e, dispatch, spell: { _id } }) => {
  e.preventDefault();
  e.stopPropagation();
  dispatch(castSpell(_id));
};
const handlePrepare = ({ e, dispatch, spell: { _id } }) => {
  e.preventDefault();
  e.stopPropagation();
  dispatch(prepareSpell(_id));
};
const handleUnprepare = ({ e, dispatch, spell: { _id } }) => {
  e.preventDefault();
  e.stopPropagation();
  dispatch(unPrepareSpell(_id));
};
const handleRemove = ({ e, dispatch, spell: { _id } }) => {
  e.preventDefault();
  e.stopPropagation();
  dispatch(removeSpell(_id));
};

const SpellsKnown = () => {
  const dispatch = useDispatch();
  const totalSpellsPerDay = useTotalSpellsPerDay();
  const spellLevelsKnown = useKnownSpellLevels();
  const myClassKey = useClassName('wizard');
  const spells = useSpells();

  const [state, localDispatch] = useReducer(spellsKnownReducer, {
    showSelector: false,
    showDetail: false
  });

  return (
    <div className="SpellsKnown">
      <SpellSelector
        isVisible={state.showSelector}
        casterLevel={parseInt(state.spellLevel)}
        onClose={() => localDispatch({ type: 'closeSelector' })}
        onSelect={spell => {
          dispatch(addSpell(spell));
          localDispatch({ type: 'closeSelector' });
        }}
      />

      <SpellDetail
        isVisible={state.showDetail}
        spell={state.spell}
        onClose={() => localDispatch({ type: 'closeDetail' })}
      />

      {spellLevelsKnown.map(spellLevel => {
        const spellsOfThisLevel = spells.filter(
          spell => spell.casterLevels[myClassKey] == parseInt(spellLevel)
        );
        const spellsUsed = spellsOfThisLevel.reduce(
          (accumulator, curr) => accumulator + curr.exhausted,
          0
        );
        return (
          <section className="SpellLevel">
            <p>
              {spellLevel} level spells —{' '}
              {totalSpellsPerDay[spellLevel] - spellsUsed} /{' '}
              {totalSpellsPerDay[spellLevel]}
            </p>
            <ul>
              {spellsOfThisLevel.map(spell => (
                <li
                  key={spell._id}
                  className={cx('Spell', { 'is-prepared': spell.prepared > 0 })}
                  onClick={() => localDispatch({ type: 'openDetail', spell })}>
                  <div className="Spell-container">
                    <p className="Title">{spell.name}</p>
                    {spell.tags.map(tag => (
                      <Tag>{tag}</Tag>
                    ))}
                    <div className="Description">
                      <p>{spell.description}</p>
                    </div>
                    <div className="ContextMenu">
                      <TooltipIcon
                        text="Cast"
                        type="fire"
                        onClick={e => handleCast({ e, dispatch, spell })}
                      />
                      <TooltipIcon
                        text="Prepare"
                        type="read"
                        onClick={e => handlePrepare({ e, dispatch, spell })}
                      />
                      <TooltipIcon
                        text="Un-Prepare"
                        type="book"
                        onClick={e => handleUnprepare({ e, dispatch, spell })}
                      />
                      <TooltipIcon
                        text="Remove"
                        type="delete"
                        onClick={e => handleRemove({ e, dispatch, spell })}
                      />
                    </div>
                  </div>
                  <div className="CastingStatus">
                    {Array.from({ length: spell.exhausted }).map((_, i) => (
                      <span key={i} className="CastingStatus-exhausted" />
                    ))}
                    {Array.from({
                      length: Math.max(spell.prepared - spell.exhausted, 0)
                    }).map((_, i) => (
                      <span key={i} className="CastingStatus-prepared" />
                    ))}
                  </div>
                </li>
              ))}
              <li
                className="AddMore"
                onClick={() =>
                  localDispatch({ type: 'openSelector', spellLevel })
                }>
                <PlusOutlined /> Add a Spell
              </li>
            </ul>
          </section>
        );
      })}

      <AuxButtons horizontal onReset={() => dispatch(restResetSpells())} />
    </div>
  );
};

export default SpellsKnown;
