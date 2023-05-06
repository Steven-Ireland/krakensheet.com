import './Attacks.scss';

import {
  addAttack,
  removeAttack,
  updateAttack
} from 'actions/characterActions';
import { DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import { Checkbox, Popover } from 'antd';
import AuxButtons from 'components/AuxButtons';
import { useBaseAttackBonus, useStatBonuses } from 'hooks/statistics';
import React, { Fragment } from 'react';
import { useState } from 'react';
import ContentEditable from 'react-contenteditable';
import { useDispatch, useSelector } from 'react-redux';
import { calculateDamageBonus, calculateHit } from 'util/statcalc';

const AttackInfoMenu = () => (
  <div class="InfoMenu">
    <p>
      Your bonus to hit takes into account most factors you'll see in a typical
      adventure:
    </p>
    <ul>
      <li>
        Weapon enhancements can be typed into the weapon name. "+5 Longsword"
        will add 5 to your bonus to hit and damage, "Masterwork Longsword" will
        add only a +1 to hit
      </li>
      <li>An attack's damage die can be modified</li>
      <li>
        To use two-weapon fighting, open the settings menu for each attack. You
        can designate a weapon as main hand only, off hand only, or both{' '}
      </li>
      <li>
        Effects toggled in the "Effects" section will affect your bonuses to hit
        and damage
      </li>
      <li>Power attack can be found in attack settings</li>
    </ul>
  </div>
);

const AttackOption = ({ attack, field, idx, name, dispatch, disabled }) => {
  return (
    <Checkbox
      disabled={disabled}
      checked={attack[field]}
      onChange={e => dispatch(updateAttack(idx, field, e.target.checked))}>
      {name}
    </Checkbox>
  );
};

const AttackOptions = props => {
  const { attack } = props;
  return (
    <Fragment>
      <AttackOption field="twf" name="Two Weapon Fighting" {...props} />

      <AttackOption
        field="itwf"
        name="Improved TWF"
        disabled={!attack.twf}
        {...props}
      />
      <AttackOption
        field="gtwf"
        name="Greater TWF"
        disabled={!(attack.twf && attack.itwf)}
        {...props}
      />
      <AttackOption
        field="extraAttack"
        name="Extra Attack"
        disabled={!attack.twf}
        {...props}
      />
      <AttackOption
        field="mainHand"
        name="Main Hand"
        disabled={!attack.twf}
        {...props}
      />
      <AttackOption
        field="offHand"
        name="Off Hand"
        disabled={!attack.twf}
        {...props}
      />
      <AttackOption
        field="light"
        name="Off Hand Light"
        disabled={!attack.twf}
        {...props}
      />
      <AttackOption field="powerAttack" name="Power Attack" {...props} />
      <AttackOption
        field="throwAnything"
        name="Throw Anything"
        {...props}
      />
      <AttackOption field="weaponSpecialization" name="Weapon Specialization" {...props} />
      <AttackOption field="greaterWeaponSpecialization" name="G. Weapon Specialization" {...props} />
    </Fragment>
  );
};

const Attacks = props => {
  const dispatch = useDispatch();
  const statBonuses = useStatBonuses();
  const attacks = useSelector(state => state.sheet.character.attacks);
  const effects = useSelector(state => state.sheet.character.effects);
  const character = useSelector(state => state.sheet.character);
  const baseAttackBonus = useBaseAttackBonus();

  const [isRemoveMode, setRemoveMode] = useState(false);

  return (
    <div className="Attacks Section Expand">
      <p className="SectionTitle">Attacks</p>
      <table>
        <thead>
          <tr>
            <th>Ability</th>
            <th>Name</th>
            <th>Hit</th>
            <th>Damage</th>
            <th>Threat</th>
            <th>Critical</th>
            <th className="BigScreenOnly">Type</th>
            <th className="BigScreenOnly">Range</th>
          </tr>
        </thead>
        <tbody>
          {attacks.map((attack, idx) => {
            return (
              <tr key={idx} className="AttackRow">
                <td>
                  <ContentEditable
                    html={'' + attack.stat}
                    spellCheck={false}
                    onChange={e =>
                      dispatch(
                        updateAttack(idx, 'stat', e.target.value.toUpperCase())
                      )
                    }
                  />
                </td>
                <td className="Title">
                  <ContentEditable
                    html={'' + attack.name}
                    spellCheck={false}
                    onChange={e =>
                      dispatch(updateAttack(idx, 'name', e.target.value))
                    }
                  />
                </td>
                <td>
                  {calculateHit({
                    baseAttackBonus,
                    statBonuses,
                    attack,
                    character,
                    effects
                  })}
                </td>
                <td className="Inline">
                  <ContentEditable
                    className="Shrink"
                    html={'' + attack.damage}
                    spellCheck={false}
                    onChange={e =>
                      dispatch(updateAttack(idx, 'damage', e.target.value))
                    }
                  />
                  <span>
                    {calculateDamageBonus({
                      statBonuses,
                      attack,
                      baseAttackBonus
                    })}
                  </span>
                </td>
                <td>
                  <ContentEditable
                    html={'' + attack.threat}
                    spellCheck={false}
                    onChange={e =>
                      dispatch(updateAttack(idx, 'threat', e.target.value))
                    }
                  />
                </td>
                <td>
                  <ContentEditable
                    html={'' + attack.crit}
                    spellCheck={false}
                    onChange={e =>
                      dispatch(updateAttack(idx, 'crit', e.target.value))
                    }
                  />
                </td>
                <td className="BigScreenOnly">
                  <ContentEditable
                    html={'' + attack.type}
                    spellCheck={false}
                    onChange={e =>
                      dispatch(updateAttack(idx, 'type', e.target.value))
                    }
                  />
                </td>
                <td className="BigScreenOnly">
                  <ContentEditable
                    html={'' + attack.range}
                    spellCheck={false}
                    onChange={e =>
                      dispatch(updateAttack(idx, 'range', e.target.value))
                    }
                  />
                </td>
                <td>
                  {isRemoveMode && (
                    <DeleteOutlined
                      style={{ color: 'lightgrey' }}
                      onClick={() => dispatch(removeAttack(idx))} />
                  )}
                  {!isRemoveMode && (
                    <Popover
                      trigger="click"
                      placement="topRight"
                      overlayClassName="Attacks"
                      title={`Configure: ${attack.name}`}
                      content={
                        <div className="AttackToggles">
                          <AttackOptions
                            attack={attack}
                            idx={idx}
                            dispatch={dispatch}
                          />
                        </div>
                      }>
                      <SettingOutlined style={{ color: 'lightgrey' }} />
                    </Popover>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <AuxButtons
        onPlus={() => dispatch(addAttack())}
        onMinus={() => setRemoveMode(!isRemoveMode)}
        infoMenu={<AttackInfoMenu />}
        infoMenuTitle="Attack Details"
        minusActive={isRemoveMode}
      />
    </div>
  );
};

export default Attacks;
