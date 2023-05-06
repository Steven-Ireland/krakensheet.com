import './Feats.css';

import React from 'react';
import { useSelector } from 'react-redux';

import DSList from '../DSList';

const Feats = () => {
  const feats = useSelector(state => state.sheet.character.feats);

  const featsToSpan = numFeats => Math.ceil((numFeats + 1) / 7);
  return (
    <div
      className="Feats Section"
      style={{ gridRow: `span ${featsToSpan(feats.length)}` }}>
      <DSList
        api="/api/feat/search/"
        title="Feats"
        singular="Feat"
        characterProperty="feats"
      />
    </div>
  );
};

export default Feats;
