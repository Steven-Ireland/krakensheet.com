import './Charges.scss';

import {
  addCharge,
  removeCharge,
  resetCharges,
  updateCharge,
  updateChargeInteger
} from 'actions/characterActions';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import AuxButtons from 'components/AuxButtons/AuxButtons';
import { useCharges } from 'hooks/statistics';
import React, { useState } from 'react';
import ContentEditable from 'react-contenteditable';
import { useDispatch } from 'react-redux';

const Charges = () => {
  const dispatch = useDispatch();
  const charges = useCharges();

  const [removeMode, setRemoveMode] = useState(false);

  return (
    <div className="Charges Section">
      <p className="SectionTitle">Charges</p>
      <div className="Charges-container">
        {charges.map((charge, idx) => (
          <div className="Charge" key={idx}>
            <div className="Charge-main">
              <Button.Group>
                <Button
                  size="small"
                  onClick={() =>
                    dispatch(updateCharge(idx, 'current', charge.current - 1))
                  }>
                  <MinusOutlined style={{ fontSize: '0.5em', verticalAlign: 'middle' }} />
                </Button>
                <Button
                  size="small"
                  onClick={() =>
                    dispatch(updateCharge(idx, 'current', charge.current + 1))
                  }>
                  <PlusOutlined style={{ fontSize: '0.5em', verticalAlign: 'middle' }} />
                </Button>
              </Button.Group>
              <div className="Charge-current">
                <div>{charge.current}</div>
                <div>/</div>
                <div>
                  <ContentEditable
                    html={'' + charge.maximum}
                    onChange={e =>
                      dispatch(
                        updateChargeInteger(idx, 'maximum', e.target.value)
                      )
                    }
                  />
                </div>
              </div>
            </div>
            <div className="Charge-details">
              <ContentEditable
                html={'' + charge.name}
                onChange={e =>
                  dispatch(updateCharge(idx, 'name', e.target.value))
                }
              />
            </div>
            {removeMode && (
              <DeleteOutlined onClick={() => dispatch(removeCharge(idx))} />
            )}
          </div>
        ))}
      </div>

      <AuxButtons
        onPlus={() => dispatch(addCharge())}
        onMinus={() => setRemoveMode(!removeMode)}
        minusActive={removeMode}
        onReset={() => dispatch(resetCharges())}
      />
    </div>
  );
};

export default Charges;
