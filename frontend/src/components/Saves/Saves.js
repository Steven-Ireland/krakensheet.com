import './Saves.css';

import { updateSaveSafely } from 'actions/characterActions';
import {
  useCurrentCharacterProgression,
  useSaves,
  useStatBonus
} from 'hooks/statistics';
import React from 'react';
import ContentEditable from 'react-contenteditable';
import { useDispatch } from 'react-redux';

import { fmtModifier } from '../../util/formatter';
import { calcTotalStat } from '../../util/statcalc';

const Saves = () => {
  const dispatch = useDispatch();
  const saves = useSaves();
  const progression = useCurrentCharacterProgression({
    fort_save: '0',
    will_save: '0',
    ref_save: '0'
  });
  const dexBonus = useStatBonus('DEX');
  const conBonus = useStatBonus('CON');
  const wisBonus = useStatBonus('WIS');

  return (
    <div className="Saves Section Expand">
      <p className="SectionTitle">Saves</p>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Save</th>
            <th>Class</th>
            <th>Ability</th>
            <th>Other</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="Title Left">Fort.</td>
            <td className="Emphasis">
              {fmtModifier(
                calcTotalStat(saves.fort_save) +
                  conBonus +
                  parseInt(progression.fort_save)
              )}
            </td>
            <td>{parseInt(progression.fort_save)}</td>
            <td>{fmtModifier(conBonus)}</td>
            <td>
              <ContentEditable
                html={'' + saves.fort_save.other}
                disabled={false}
                onChange={e =>
                  dispatch(
                    updateSaveSafely('fort_save', 'other', e.target.value)
                  )
                }
              />
            </td>
          </tr>
          <tr>
            <td className="Title Left">Reflex</td>
            <td className="Emphasis">
              {fmtModifier(
                calcTotalStat(saves.ref_save) +
                  dexBonus +
                  parseInt(progression.ref_save)
              )}
            </td>
            <td>{parseInt(progression.ref_save)}</td>
            <td>{fmtModifier(dexBonus)}</td>
            <td>
              <ContentEditable
                html={'' + saves.ref_save.other}
                disabled={false}
                onChange={e =>
                  dispatch(
                    updateSaveSafely('ref_save', 'other', e.target.value)
                  )
                }
              />
            </td>
          </tr>
          <tr>
            <td className="Title Left">Will</td>
            <td className="Emphasis">
              {fmtModifier(
                calcTotalStat(saves.will_save) +
                  wisBonus +
                  parseInt(progression.will_save)
              )}
            </td>
            <td>{parseInt(progression.will_save)}</td>
            <td>{fmtModifier(wisBonus)}</td>
            <td>
              <ContentEditable
                html={'' + saves.will_save.other}
                disabled={false}
                onChange={e =>
                  dispatch(
                    updateSaveSafely('will_save', 'other', e.target.value)
                  )
                }
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Saves;
