import './Skills.scss';

import {
  addSkill,
  removeSkill,
  reorderCharacterProperty,
  toggleClassSkillOverride,
  updateCharacterInteger,
  updateSkill,
  updateSkillInteger
} from 'actions/characterActions';
import { CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import classNames from 'classnames';
import AuxButtons from 'components/AuxButtons';
import {
  useBonusSkillPoints,
  useClassSkills,
  useNumSkillPoints,
  useSkills,
  useStatBonuses
} from 'hooks/statistics';
import React, { useState } from 'react';
import ContentEditable from 'react-contenteditable';
import { useDispatch } from 'react-redux';
import { fmtModifier } from 'util/formatter';
import { calculateTotalSkill } from 'util/statcalc';

const SkillsInfoMenu = () => (
  <div className="InfoMenu">
    <p>
      A skill check is made by rolling a d20 and adding your total skill
      modifier
    </p>
    <ul>
      <li>
        A skill's ability score can be changed by clicking the ability score
        stat
      </li>
      <li>
        Clicking on the left side of the skills section will override a class
        skill selection
      </li>
      <li>
        New skills can be added with the plus icon, and existing skills removed
        with the minus icon
      </li>
      <li>
        The arrows allow you to drag and reorder skills; though they are ordered
        correctly by default.
      </li>
    </ul>
  </div>
);

const isClassSkill = (classSkills, skill) => {
  return classSkills[skill.name] || false;
};

const SkillsSettings = () => {
  const dispatch = useDispatch();
  const bonusSkillPoints = useBonusSkillPoints();

  return (
    <div className="SkillsSettings">
      <table className="SkillsSettings-breakout">
        <thead>
          <tr>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="Left">Bonus Skill Points: </td>
            <td>
              <ContentEditable
                html={'' + bonusSkillPoints}
                onChange={e =>
                  dispatch(
                    updateCharacterInteger('bonusSkillPoints', e.target.value)
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

function Skills(props) {
  const dispatch = useDispatch();
  const statBonuses = useStatBonuses();
  const skills = useSkills();
  const classSkills = useClassSkills();
  const numSkillPoints = useNumSkillPoints();

  const usedPoints = skills
    .map(skill => skill.ranks)
    .reduce((prev, curr) => prev + curr, 0);

  const [draggedOverIndex, setDraggedOverIndex] = useState(null);
  const [dragMode, setDragMode] = useState(false);
  const [removeMode, setRemoveMode] = useState(false);

  const onDragStart = (skill, idx) => {
    skill.dataTransfer.effectAllowed = 'move';
    skill.dataTransfer.dropEffect = 'move';
    skill.dataTransfer.setData('text/html', skill.target);
    skill.dataTransfer.setDragImage(skill.target, 80, 0);
  };

  const onDragOver = (e, idx) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDraggedOverIndex(idx);
  };

  const onDragEnd = idx => {
    dispatch(reorderCharacterProperty('skills', idx, draggedOverIndex));
    setDraggedOverIndex(null);
  };

  const handleClassSkillClick = (name, idx) => {
    if (removeMode) {
      dispatch(removeSkill(idx));
    } else {
      dispatch(toggleClassSkillOverride(name));
    }
  };

  const handleClick = (e, idx) => {
    if (removeMode && idx != null && idx >= 0) {
      dispatch(removeSkill(idx));
    } else if (dragMode) {
      e.preventDefault();
    }
  };

  return (
    <div className="Skills Section">
      <p className="SectionTitle">Skills</p>
      {usedPoints < numSkillPoints && (
        <p className="Skills-counter">{`${usedPoints} / ${numSkillPoints}`}</p>
      )}
      <table className="">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th>Total</th>
            <th>Ranks</th>
            <th>Ability</th>
            <th>Other</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((skill, idx) => {
            const thisIsClassSkill = isClassSkill(classSkills, skill);
            return (
              <tr
                key={idx}
                className={classNames('Skill', {
                  'Skill--draggedOver': dragMode && draggedOverIndex === idx
                })}
                onClick={e => handleClick(e, idx)}
                onDragOver={e => onDragOver(e, idx)}
                onDragStart={e => onDragStart(e, idx)}
                onDragEnd={() => onDragEnd(idx)}
                draggable={dragMode}>
                <td
                  className="Left Interactable"
                  onClick={() => handleClassSkillClick(skill.name, idx)}>
                  {removeMode && <DeleteOutlined />}
                  {!removeMode && thisIsClassSkill && (
                    <CloseOutlined />
                  )}
                </td>
                <td className="Left">
                  <Select
                    dropdownMatchSelectWidth={false}
                    showSearch
                    value={skill.stat}
                    onChange={e =>
                      dispatch(updateSkill(idx, 'stat', e))
                    }
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    disabled={dragMode}>
                    {Object.keys(statBonuses).map(stat => {
                      return (
                        <Select.Option key={stat} value={stat}>
                          {stat}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </td>
                <td className="Title Left">
                  <ContentEditable
                    html={'' + skill.name}
                    onChange={e =>
                      dispatch(updateSkill(idx, 'name', e.target.value))
                    }
                    disabled={dragMode}
                  />
                </td>
                <td className="Emphasis">
                  {fmtModifier(
                    calculateTotalSkill({
                      isClassSkill: thisIsClassSkill,
                      skill,
                      statBonus: statBonuses[skill.stat]
                    })
                  )}
                </td>
                <td>
                  <ContentEditable
                    html={'' + skill.ranks}
                    onChange={e =>
                      dispatch(updateSkillInteger(idx, 'ranks', e.target.value))
                    }
                    disabled={dragMode}
                  />
                </td>
                <td>{fmtModifier(statBonuses[skill.stat])}</td>
                <td>
                  <ContentEditable
                    html={'' + skill.bonus}
                    onChange={e =>
                      dispatch(updateSkillInteger(idx, 'bonus', e.target.value))
                    }
                    disabled={dragMode}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <AuxButtons
        onPlus={() => dispatch(addSkill())}
        onMinus={() => {
          setRemoveMode(!removeMode);
          setDragMode(false);
        }}
        onSwap={() => {
          setDragMode(!dragMode);
          setRemoveMode(false);
        }}
        infoMenu={<SkillsInfoMenu />}
        infoMenuTitle="Skills"
        minusActive={removeMode}
        swapActive={dragMode}
        settingsMenu={<SkillsSettings />}
        settingsMenuTitle="Configure: Skills"
      />
    </div>
  );
}

export default Skills;
