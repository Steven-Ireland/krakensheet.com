import './MagicalEffects.css';

import { updateEffect } from 'actions/characterActions';
import { Switch } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const MagicalEffects = () => {
  const dispatch = useDispatch();
  const effects = useSelector(state => state.sheet.character.effects);
  return (
    <div className="MagicalEffects Section">
      <p className="SectionTitle">Effects</p>
      <div className="EffectsContainer">
        {Object.keys(effects).map(effect => (
          <div className="Effect" key={effect}>
            <p>{effect}</p>
            <Switch
              checked={effects[effect]}
              onChange={active => dispatch(updateEffect(effect, active))}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MagicalEffects;
