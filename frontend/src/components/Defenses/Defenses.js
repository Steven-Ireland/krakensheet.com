import './Defenses.scss';

import { updateDefenseInteger } from 'actions/characterActions';
import { Popover, Slider } from 'antd';
import { useDefenses, useStatBonus } from 'hooks/statistics';
import React from 'react';
import ContentEditable from 'react-contenteditable';
import { useDispatch } from 'react-redux';

const cappedDex = (dex, maximum_dex) => {
  return Math.min(dex, maximum_dex);
};

const Defenses = props => {
  const dispatch = useDispatch();
  const defenses = useDefenses();
  const dex = useStatBonus('DEX');

  return (
    <div className="Defenses Section Floaty">
      <p className="SectionTitle">Armor Class</p>

      <div className="DefenseGrid">
        <div className="MultiDefense">
          <div className="Block">
            <span className="BigText Emphasis">
              {10 +
                parseInt(defenses.armor) +
                parseInt(defenses.shield) +
                cappedDex(dex, defenses.maximum_dex) +
                parseInt(defenses.natural) +
                parseInt(defenses.dodge) +
                parseInt(defenses.deflect) +
                parseInt(defenses.size)}
            </span>
            <p className="BlockLabel">Armored</p>
          </div>
          <div className="Block">
            <span className="BigText Emphasis">
              {10 +
                parseInt(defenses.dodge) +
                cappedDex(dex, defenses.maximum_dex) +
                parseInt(defenses.deflect) +
                parseInt(defenses.size)}
            </span>
            <p className="BlockLabel">Touch</p>
          </div>
          <div className="Block">
            <span className="BigText Emphasis">
              {10 +
                parseInt(defenses.armor) +
                parseInt(defenses.shield) +
                parseInt(defenses.natural) +
                parseInt(defenses.deflect) +
                parseInt(defenses.size)}
            </span>
            <p className="BlockLabel">Flat Footed</p>
          </div>
        </div>

        <div className="Block">
          <table className="DefensesBreakout">
            <thead>
              <tr>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="Left">Armor</td>
                <td>
                  <ContentEditable
                    html={'' + defenses.armor}
                    onChange={e =>
                      dispatch(updateDefenseInteger('armor', e.target.value))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className="Left">Shield</td>
                <td>
                  <ContentEditable
                    html={'' + defenses.shield}
                    onChange={e =>
                      dispatch(updateDefenseInteger('shield', e.target.value))
                    }
                  />
                </td>
              </tr>
              <Popover
                placement="right"
                trigger="click"
                title="Maximum Dex"
                overlayClassName="Defenses"
                content={
                  <Slider
                    defaultValue={defenses.maximum_dex}
                    min={0}
                    max={8}
                    onChange={e =>
                      dispatch(updateDefenseInteger('maximum_dex', '' + e))
                    }
                  />
                }>
                <tr>
                  <td className="Left">Dex (max {defenses.maximum_dex})</td>
                  <td>{cappedDex(dex, defenses.maximum_dex)}</td>
                </tr>
              </Popover>
              <tr>
                <td className="Left">Natural</td>
                <td>
                  <ContentEditable
                    html={'' + defenses.natural}
                    onChange={e =>
                      dispatch(updateDefenseInteger('natural', e.target.value))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className="Left">Dodge</td>
                <td>
                  <ContentEditable
                    html={'' + defenses.dodge}
                    onChange={e =>
                      dispatch(updateDefenseInteger('dodge', e.target.value))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className="Left">Deflect</td>
                <td>
                  <ContentEditable
                    html={'' + defenses.deflect}
                    onChange={e =>
                      dispatch(updateDefenseInteger('deflect', e.target.value))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className="Left">Size</td>
                <td>
                  <ContentEditable
                    html={'' + defenses.size}
                    onChange={e =>
                      dispatch(updateDefenseInteger('size', e.target.value))
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

export default Defenses;
