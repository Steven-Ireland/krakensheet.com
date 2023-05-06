import './Initiative.css';

import { updateInitiativeSafely } from 'actions/characterActions';
import { useStatBonus } from 'hooks/statistics';
import React from 'react';
import ContentEditable from 'react-contenteditable';
import { useDispatch, useSelector } from 'react-redux';

import { fmtModifier } from '../../util/formatter';

const Initiative = props => {
  const dispatch = useDispatch();
  const dexMod = useStatBonus('DEX');
  const initiative = useSelector(state => state.sheet.character.initiative);

  return (
    <div className="Initiative Section Floaty">
      <p className="SectionTitle">Initiative</p>
      <div className="Divided">
        <div className="Block Left">
          <div className="BigText">
            {fmtModifier(dexMod + parseInt(initiative.other))}
          </div>
          <p className="BlockLabel">Total</p>
        </div>
        <div className="Block Right">
          <table className="Vertical AutoMargin">
            <tbody>
              <tr>
                <th className="Flat">Ability</th>
                <td>{fmtModifier(dexMod)}</td>
              </tr>
              <tr>
                <th className="Flat">Other</th>
                <td>
                  <ContentEditable
                    html={'' + initiative.other}
                    disabled={false}
                    onChange={e =>
                      dispatch(updateInitiativeSafely('other', e.target.value))
                    }
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Initiative;
