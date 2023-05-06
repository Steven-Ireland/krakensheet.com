import './Health.scss';

import {
  resetHealth,
  updateHealth,
  updateHealthInteger
} from 'actions/characterActions';
import { FrownOutlined } from '@ant-design/icons';
import { Radio } from 'antd';
import AuxButtons from 'components/AuxButtons/AuxButtons';
import { useHealth, useMaxHealth, useStatTotal } from 'hooks/statistics';
import React from 'react';
import ContentEditable from 'react-contenteditable';
import { useDispatch } from 'react-redux';

export const HEALTH_HALF_ROUND_UP = 'halfRoundUp';
export const HEALTH_MANUAL = 'manual';

// TODO: Double popovers for damage (-1,-5,-10 | +1 +5 +10)

const HealthSettings = () => {
  const dispatch = useDispatch();
  const health = useHealth();
  return (
    <div className="HealthSettings">
      <Radio.Group
        value={health.calculation}
        onChange={e => dispatch(updateHealth('calculation', e.target.value))}>
        <Radio value={HEALTH_HALF_ROUND_UP}>Half Rounded Up</Radio>
        <Radio value={HEALTH_MANUAL}>Manual</Radio>
      </Radio.Group>
      <table className="HealthSettings-breakout">
        <thead>
          <tr>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="Left">Bonus Maximum HP</td>
            <td>
              <ContentEditable
                html={'' + health.bonus}
                onChange={e =>
                  dispatch(updateHealthInteger('bonus', e.target.value))
                }
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const MaxHealth = () => {
  const dispatch = useDispatch();
  const { calculation } = useHealth();
  const maximumHealth = useMaxHealth();

  if (calculation === HEALTH_MANUAL) {
    return (
      <ContentEditable
        html={'' + maximumHealth}
        onChange={e => dispatch(updateHealthInteger('maximum', e.target.value))}
      />
    );
  } else {
    return <div>{maximumHealth}</div>;
  }
};

const Health = () => {
  const dispatch = useDispatch();
  const health = useHealth();
  const maximumHealth = useMaxHealth();
  const conTotal = useStatTotal('CON');

  const currentHealth = maximumHealth - health.lethal_damage;
  const deathHealth = -1 * conTotal;

  return (
    <div className="Health Section Floaty">
      <p className="SectionTitle">Health</p>

      <div className="Divided">
        <div className="Block Left">
          <div className="BigText">
            <span className="Emphasis">
              {currentHealth > deathHealth ? (
                currentHealth
              ) : (
                <FrownOutlined />
              )}
            </span>
          </div>
          <p className="BlockLabel">Current HP</p>
        </div>

        <div className="Block Right">
          <table className="Vertical AutoMargin">
            <tbody>
              <tr>
                <th className="Flat Red">Damage</th>
                <td>
                  <ContentEditable
                    html={'' + health.lethal_damage}
                    disabled={false}
                    onChange={e =>
                      dispatch(
                        updateHealthInteger('lethal_damage', e.target.value)
                      )
                    }
                  />
                </td>
              </tr>
              <tr>
                <th className="Flat">Nonlethal</th>
                <td>
                  <ContentEditable
                    html={'' + health.nonlethal_damage}
                    disabled={false}
                    onChange={e =>
                      dispatch(
                        updateHealthInteger('nonlethal_damage', e.target.value)
                      )
                    }
                  />
                </td>
              </tr>
              <tr>
                <th className="Flat">Maximum</th>
                <td>
                  <MaxHealth />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <AuxButtons
        onReset={() => dispatch(resetHealth())}
        settingsMenu={<HealthSettings />}
        settingsMenuTitle="Configure: Health"
      />
    </div>
  );
};

export default Health;
