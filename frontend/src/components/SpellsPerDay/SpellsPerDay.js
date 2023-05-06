import './SpellsPerDay.scss';

import { updateBonusSpellsPerDayInteger } from 'actions/spellcastingActions';
import { Select } from 'antd';
import CenteredPlaceholder from 'components/CenteredPlaceholder/CenteredPlaceholder';
import {
  useCastingStatBonus,
  useCurrentCharacterProgression,
  useStatBonuses,
  useTotalSpellsPerDay
} from 'hooks/statistics';
import React from 'react';
import ContentEditable from 'react-contenteditable';
import { useDispatch, useSelector } from 'react-redux';
import { calculateAbilityScoreBonusSpells } from 'util/statcalc';

const SpellsPerDay = () => {
  const dispatch = useDispatch();
  const { spells_per_day } = useCurrentCharacterProgression({
    spells_per_day: false
  });

  const totalSpellsPerDay = useTotalSpellsPerDay();
  const bonusSpellsPerDay = useSelector(
    state => state.sheet.character.spellcasting.bonusSpellsPerDay
  );
  const abilityBonus = useCastingStatBonus();

  return (
    <div className="Section SpellsPerDay">
      <p className="SectionTitle">Spells per Day</p>
      <div>
        {!spells_per_day && (
          <CenteredPlaceholder type="frown">
            Non-spellcasting class selected
          </CenteredPlaceholder>
        )}
        {spells_per_day && (
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Total</th>
                <th>Class</th>
                <th>Ability</th>
                <th>Other</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(spells_per_day)
                .filter(spellLevel => parseInt(spells_per_day[spellLevel]) > 0)
                .map(spellLevel => (
                  <tr>
                    <td className="Title Left">{spellLevel}</td>
                    <td className="Emphasis">
                      {totalSpellsPerDay[spellLevel]}
                    </td>
                    <td>{spells_per_day[spellLevel]}</td>
                    <td>
                      {calculateAbilityScoreBonusSpells({
                        abilityScoreBonus: abilityBonus,
                        spellLevel: parseInt(spellLevel)
                      })}
                    </td>
                    <td>
                      <ContentEditable
                        html={'' + bonusSpellsPerDay[spellLevel]}
                        disabled={false}
                        onChange={e =>
                          dispatch(
                            updateBonusSpellsPerDayInteger(
                              spellLevel,
                              e.target.value
                            )
                          )
                        }
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SpellsPerDay;
