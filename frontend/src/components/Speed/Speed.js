import './Speed.scss';

import { updateSpeed } from 'actions/characterActions';
import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable';
import { connect } from 'react-redux';

class Speed extends Component {
  render() {
    let speed = this.props.character.speed || {};

    return (
      <div className="Speed Section">
        <p className="SectionTitle">Movement</p>
        <table className="CrossThatch">
          <thead>
            <tr>
              <th className="Flat">Base</th>
              <th className="Flat">Swim</th>
              <th className="Flat">Fly</th>
              <th className="Flat">Climb</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="Title">
                <ContentEditable
                  html={'' + speed.base}
                  onChange={e => this.onSpeedChange('base', e.target.value)}
                />
              </td>
              <td>
                <ContentEditable
                  html={'' + speed.swim}
                  onChange={e => this.onSpeedChange('swim', e.target.value)}
                />
              </td>
              <td>
                <ContentEditable
                  html={'' + speed.fly}
                  onChange={e => this.onSpeedChange('fly', e.target.value)}
                />
              </td>
              <td>
                <ContentEditable
                  html={'' + speed.climb}
                  onChange={e => this.onSpeedChange('climb', e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  onSpeedChange = (type, value) => {
    const { dispatch } = this.props;

    dispatch(updateSpeed(type, value));
  };
}

export default connect(state => ({ character: state.sheet.character }))(Speed);
