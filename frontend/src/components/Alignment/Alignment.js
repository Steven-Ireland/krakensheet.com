import './Alignment.css';

import { Input, Popover } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Alignment extends Component {
  render() {
    return (
      <Popover
        content={
          <AlignmentSelector {...this.props} setAlignment={this.setAlignment} />
        }
        title="Alignment"
        overlayClassName="Alignment"
        placement="right"
        trigger="focus">
        <Input
          addonBefore="Alignment"
          value={this.props.character.alignment}
          className="Alignment"
          onChange={e => this.setAlignment(e.target.value)}
        />
      </Popover>
    );
  }

  setAlignment(alignment) {
    const { dispatch } = this.props;

    dispatch({
      type: 'UPDATE_CHARACTER',
      update: 'alignment',
      value: alignment
    });
  }
}

class AlignmentSelector extends Component {
  constructor(props) {
    super(props);

    this.setAlignment = this.props.setAlignment;
  }

  render() {
    return (
      <div className="AlignmentSelector">
        <div className="AlignmentRow">
          <div onClick={() => this.setAlignment('CG')}>CG</div>
          <div onClick={() => this.setAlignment('NG')}>NG</div>
          <div onClick={() => this.setAlignment('LG')}>LG</div>
        </div>
        <div className="AlignmentRow">
          <div onClick={() => this.setAlignment('CN')}>CN</div>
          <div onClick={() => this.setAlignment('N')}>N</div>
          <div onClick={() => this.setAlignment('LN')}>LN</div>
        </div>
        <div className="AlignmentRow">
          <div onClick={() => this.setAlignment('CE')}>CE</div>
          <div onClick={() => this.setAlignment('NE')}>NE</div>
          <div onClick={() => this.setAlignment('LE')}>LE</div>
        </div>
      </div>
    );
  }
}

export default connect(state => ({ character: state.sheet.character }))(
  Alignment
);
