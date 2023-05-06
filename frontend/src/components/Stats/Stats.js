import './Stats.css';

import React from 'react';
import { useSelector } from 'react-redux';

import StatBlock from './StatBlock';

const Stats = () => {
  let stats = useSelector(state => Object.keys(state.sheet.character.stats));

  return (
    <div className="Stats Section">
      <p className="SectionTitle">Ability Scores</p>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Mod</th>
            <th>Base</th>
            <th>Racial</th>
            <th>Enh.</th>
            <th>Other</th>
          </tr>
        </thead>
        <tbody>
          {stats.map(key => {
            return <StatBlock key={key} attribute={key} />;
          })}
        </tbody>
      </table>
    </div>
  );
};
export default Stats;
