import './CombatManeuvers.scss';

import { updateManeuverInteger } from 'actions/characterActions';
import {
  useBaseAttackBonusInteger,
  useDefenses,
  useManeuvers,
  useStatBonus
} from 'hooks/statistics';
import React from 'react';
import ContentEditable from 'react-contenteditable';
import { useDispatch } from 'react-redux';

const CombatManeuvers = () => {
  const dispatch = useDispatch();
  const maneuvers = useManeuvers();
  const baseAttackBonus = useBaseAttackBonusInteger();
  const strBonus = useStatBonus('STR');
  const dexBonus = useStatBonus('DEX');
  const defenses = useDefenses();
  const sizeBonus = 0; // TODO

  return (
    <div className="CombatManeuvers Section Floaty">
      <p className="SectionTitle">Combat Maneuvers</p>
      <div className="CombatManeuvers-container">
        <div className="CombatManeuvers-topGrid">
          <div className="Block">
            <span className="BigText Emphasis">
              {baseAttackBonus +
                strBonus +
                sizeBonus +
                maneuvers.cmb.feat +
                maneuvers.cmb.other}
            </span>
            <p className="BlockLabel">CMB</p>
          </div>
          <div className="Block">
            <span className="BigText Emphasis">
              {10 +
                baseAttackBonus +
                strBonus +
                dexBonus +
                sizeBonus +
                defenses.dodge +
                defenses.deflect +
                maneuvers.cmd.feat +
                maneuvers.cmd.other}
            </span>
            <p className="BlockLabel">CMD</p>
          </div>
        </div>
        <div className="CombatManeuvers-additions">
          <div className="Block">
            <table className="CombatManeuvers-breakout">
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="Left">Feat</td>
                  <td>
                    <ContentEditable
                      html={'' + maneuvers.cmb.feat}
                      onChange={e =>
                        dispatch(
                          updateManeuverInteger('cmb', 'feat', e.target.value)
                        )
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td className="Left">Other</td>
                  <td>
                    <ContentEditable
                      html={'' + maneuvers.cmb.other}
                      onChange={e =>
                        dispatch(
                          updateManeuverInteger('cmb', 'other', e.target.value)
                        )
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="Block">
            <table className="CombatManeuvers-breakout">
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="Left">Feat</td>
                  <td>
                    <ContentEditable
                      html={'' + maneuvers.cmd.feat}
                      onChange={e =>
                        dispatch(
                          updateManeuverInteger('cmd', 'feat', e.target.value)
                        )
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td className="Left">Other</td>
                  <td>
                    <ContentEditable
                      html={'' + maneuvers.cmd.other}
                      onChange={e =>
                        dispatch(
                          updateManeuverInteger('cmd', 'other', e.target.value)
                        )
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombatManeuvers;
