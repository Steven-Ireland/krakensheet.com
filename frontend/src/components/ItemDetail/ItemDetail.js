import './ItemDetail.scss';

import React from 'react';

import { Modal } from 'antd';
import ContentEditable from 'react-contenteditable';

const ItemDetail = ({ isVisible, item, onChange, onClose }) => {
  if (!item) return false;

  return (
    <Modal
      className="ItemDetail"
      title={<h1><ContentEditable html={'' + item.name} onChange={(e) => onChange({name: e.target.value})}/></h1>}
      visible={isVisible}
      closable={false}
      onCancel={onClose}
      onOk={onClose}
      width={720}>
      <section>        
      </section>
      <section>
        <p><ContentEditable html={'' + item.description} onChange={(e) => onChange({description: e.target.value})}/></p>
      </section>
      <section>
        <p className="Copyright">{item.copyright}</p>
      </section>
    </Modal>
  );
};

export default ItemDetail;