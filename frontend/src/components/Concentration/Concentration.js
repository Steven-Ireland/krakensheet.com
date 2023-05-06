import './Concentration.scss';

import { updateConcentrationInteger } from 'actions/spellcastingActions';
import AuxButtons from 'components/AuxButtons/AuxButtons';
import {
  useCastingStatBonus,
  useConcentration,
  useLevel
} from 'hooks/statistics';
import React from 'react';
import ContentEditable from 'react-contenteditable';
import { useDispatch } from 'react-redux';

const ConcentrationInfoMenu = () => (
  <div className="InfoMenu">
    <p>
      To make a concentration check, roll a d20 and add your concentration check
      bonus.
    </p>
    <p>
      To cast defensively (casting without provoking an attack of opportunity)
      you must pass a concentration check equal to 15 + 2 x (spell level). If
      you fail, you lose the spell.
    </p>
  </div>
);

const Concentration = () => {
  const dispatch = useDispatch();
  const castingStatBonus = useCastingStatBonus();
  const concentration = useConcentration();
  const level = useLevel();

  return (
    <div className="Concentration Section">
      <p className="SectionTitle">Concentration</p>

      <div className="Concentration-container">
        <div className="Divided">
          <div className="Block Left">
            <div className="BigText">
              <span className="Emphasis">{castingStatBonus + level}</span>
            </div>
            <p className="BlockLabel">Check Bonus</p>
          </div>

          <div className="Block Right">
            <table className="Vertical AutoMargin">
              <tbody>
                <tr>
                  <th className="Flat">Ability</th>
                  <td>{castingStatBonus}</td>
                </tr>
                <tr>
                  <th className="Flat">Feat</th>
                  <td>
                    <ContentEditable
                      html={'' + concentration.feat}
                      disabled={false}
                      onChange={e =>
                        dispatch(
                          updateConcentrationInteger('feat', e.target.value)
                        )
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <th className="Flat">Other</th>
                  <td>
                    <ContentEditable
                      html={'' + concentration.other}
                      disabled={false}
                      onChange={e =>
                        dispatch(
                          updateConcentrationInteger('other', e.target.value)
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

      <AuxButtons
        infoMenuTitle="Concentration Checks"
        infoMenu={<ConcentrationInfoMenu />}
      />
    </div>
  );
};

export default Concentration;
