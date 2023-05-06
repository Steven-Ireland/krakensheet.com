import './SpellSaveDC.scss';

import { updateSpellSavesInteger } from 'actions/spellcastingActions';
import AuxButtons from 'components/AuxButtons/AuxButtons';
import { useCastingStatBonus, useSpellSaves } from 'hooks/statistics';
import React from 'react';
import ContentEditable from 'react-contenteditable';
import { useDispatch } from 'react-redux';

const SpellSaveInfoMenu = () => (
  <div className="InfoMenu">
    <p>
      To calculate a given spell's DC, add your base save DC to the spell's
      level. For example, a 3rd level spell like fireball would add 3 to your
      base spell DC.
    </p>
  </div>
);

const SpellSaveDC = () => {
  const dispatch = useDispatch();
  const castingStatBonus = useCastingStatBonus();
  const spellSaves = useSpellSaves();

  return (
    <div className="SpellSaveDC Section">
      <p className="SectionTitle">Spell DC</p>

      <div className="SpellSaveDC-container">
        <div className="Divided">
          <div className="Block Left">
            <div className="BigText">
              <span className="Emphasis">
                {castingStatBonus + 10 + spellSaves.feat}
              </span>
            </div>
            <p className="BlockLabel">Base Save</p>
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
                      html={'' + spellSaves.feat}
                      disabled={false}
                      onChange={e =>
                        dispatch(
                          updateSpellSavesInteger('feat', e.target.value)
                        )
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <th className="Flat">Other</th>
                  <td>
                    <ContentEditable
                      html={'' + spellSaves.other}
                      disabled={false}
                      onChange={e =>
                        dispatch(
                          updateSpellSavesInteger('other', e.target.value)
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
        infoMenuTitle="Save information"
        infoMenu={<SpellSaveInfoMenu />}
      />
    </div>
  );
};

export default SpellSaveDC;
