import './SpellDetail.scss';

import { Modal } from 'antd';
import React from 'react';

const SpellDetail = ({ isVisible, spell, onClose }) => {
  if (!spell) return false;

  return (
    <Modal
      className="SpellDetail"
      title={<h1>{`${spell.name}`}</h1>}
      visible={isVisible}
      closable={false}
      onCancel={onClose}
      onOk={onClose}
      width={720}>
      <section>
        <h2>Casting Info</h2>
        <div className="CastingInfo">
          {Object.keys(spell.castingInfo).map(castingInfoKey => (
            <div key={castingInfoKey}>
              <p>
                <span className="InfoKey">
                  {castingInfoKey.replace(/_/g, ' ')}:{' '}
                </span>
                {spell.castingInfo[castingInfoKey]}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2>Description</h2>
        <p>{spell.description}</p>
      </section>
      <section>
        <p className="Copyright">{spell.copyright}</p>
      </section>
    </Modal>
  );
};

export default SpellDetail;
