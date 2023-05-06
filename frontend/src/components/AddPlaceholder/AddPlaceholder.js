import './AddPlaceholder.css';

import { PlusOutlined } from '@ant-design/icons';
import React, { Component } from 'react';

import { fmtModifier } from '../../util/formatter';

export default class AddPlaceholder extends Component {
  render() {
    const { onClick } = this.props;
    return (
      <div className="AddPlaceholder" onClick={onClick}>
        <PlusOutlined />
      </div>
    );
  }
}
