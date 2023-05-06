import './Sheet.scss';

import { loadSheet } from 'actions/sheetActions';
import { Col, Row } from 'antd';
import axios from 'axios';
import Attacks from 'components/Attacks';
import Character from 'components/Character';
import Charges from 'components/Charges';
import ClassInfo from 'components/ClassInfo';
import CombatManeuvers from 'components/CombatManeuvers';
import Defenses from 'components/Defenses';
import Feats from 'components/Feats';
import Health from 'components/Health';
import Initiative from 'components/Initiative';
import MagicalEffects from 'components/MagicalEffects';
import RaceInfo from 'components/RaceInfo';
import Saves from 'components/Saves';
import Skills from 'components/Skills';
import Speed from 'components/Speed';
import Stats from 'components/Stats';
import Traits from 'components/Traits';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Sheet extends Component {
  async componentDidMount() {
    // don't reload on page switch
    if (!this.props.sheet._id) {
      if (this.props.demo && !this.props.sheet.character) {
        const sheet = await axios.get(`/api/sheet/demo`);
        this.loadSheet({ character: sheet.data });
      } else if (!this.props.demo) {
        const { sheetId } = this.props.match.params;
        const sheet = await axios.get(`/api/sheet/load/${sheetId}`);
        this.loadSheet(sheet.data);
      }
    }
  }

  render() {
    if (!this.props.sheet.character) {
      return <div />;
    }
    return (
      <div className="Sheet">
        <div>
          <Character />
        </div>
        <div className="Divided">
          <div className="Left Expand">
            <div className="GridLayout">
              <div>
                <Stats />
              </div>
              <div className="Divided Vertical">
                <Saves />
                <Speed />
              </div>
              <div className="Divided Vertical">
                <Health />
                <Initiative />
              </div>
              <div>
                <Defenses />
              </div>

              <Feats />

              <div>
                <MagicalEffects />
              </div>
              <div>
                <Charges />
              </div>
              <div>
                <CombatManeuvers />
              </div>
              <div className="SpanThree">
                <Attacks />
              </div>
              <div>
                <Traits />
              </div>
            </div>
            <div>
              <ClassInfo />
            </div>
          </div>
          <div className="Right SkillContainer">
            <Skills />
            <RaceInfo />
          </div>
        </div>
      </div>
    );
  }

  loadSheet = sheet => {
    const { dispatch } = this.props;
    dispatch(loadSheet(sheet));
  };
}

export default withRouter(
  connect(state => ({
    sheet: state.sheet
  }))(Sheet)
);
