import './StatBlock.css';

import { updateStat } from 'actions/characterActions';
import { FrownOutlined } from '@ant-design/icons';
import { useStat, useStatBonus, useStatTotal } from 'hooks/statistics';
import React from 'react';
import ContentEditable from 'react-contenteditable';
import { useDispatch } from 'react-redux';

import { fmtModifier } from '../../util/formatter';

const StatBlock = props => {
  const statDetails = useStat(props.attribute);
  const statTotal = useStatTotal(props.attribute);
  const statBonus = useStatBonus(props.attribute);

  const dispatch = useDispatch();

  const isCon = props.attribute === 'CON';

  return (
    <tr className="StatBlock">
      <td className="Title Left">{props.attribute}</td>
      <td className="Emphasis">
        {isCon && statTotal < 1 ? (
          <FrownOutlined />
        ) : (
          fmtModifier(statBonus)
        )}
      </td>
      <td>
        <ContentEditable
          html={'' + statDetails.base}
          disabled={false}
          onChange={e =>
            dispatch(updateStat(props.attribute, 'base', e.target.value))
          }
        />
      </td>
      <td>
        <ContentEditable
          html={'' + statDetails.racial}
          disabled={false}
          onChange={e =>
            dispatch(updateStat(props.attribute, 'racial', e.target.value))
          }
        />
      </td>
      <td>
        <ContentEditable
          html={'' + statDetails.enhancement}
          disabled={false}
          onChange={e =>
            dispatch(updateStat(props.attribute, 'enhancement', e.target.value))
          }
        />
      </td>
      <td>
        <ContentEditable
          html={'' + statDetails.other}
          disabled={false}
          onChange={e =>
            dispatch(updateStat(props.attribute, 'other', e.target.value))
          }
        />
      </td>
    </tr>
  );
};
export default StatBlock;
