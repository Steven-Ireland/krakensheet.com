import './SpellBook.scss';

import { loadSheet } from 'actions/sheetActions';
import { ReconciliationOutlined } from '@ant-design/icons';
import axios from 'axios';
import Character from 'components/Character/Character';
import Concentration from 'components/Concentration/Concentration';
import SpellSaveDC from 'components/SpellSaveDC';
import SpellsKnown from 'components/SpellsKnown/SpellsKnown';
import SpellsPerDay from 'components/SpellsPerDay';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class SpellBook extends React.Component {
  async componentDidMount() {
    const { dispatch } = this.props;
    const { sheetId } = this.props.match.params;

    // Don't re-load sheet on page switch
    if (!this.props.sheet._id && !this.props.demo) {
      const sheet = await axios.get(`/api/sheet/load/${sheetId}`);
      dispatch(loadSheet(sheet.data));
    }
  }

  getClass() {
    return this.props.sheet.character.classes[0].classDef;
  }

  render() {
    if (!this.props.sheet.character) {
      return <div />;
    }

    const hasClass = !!this.getClass();

    return (
      <div className="SpellBook">
        <Character noText />
        <div className="SpellBook-container">
          <div className="Sidebar">{hasClass && <SpellsPerDay />}</div>
          {!hasClass && (
            <div className="Centered">
              <ReconciliationOutlined style={{ fontSize: '3em' }} />
              <p>Select a class first!</p>
            </div>
          )}
          {hasClass && (
            <div className="SpellBook-content">
              <div className="Grid">
                <SpellSaveDC />
                <Concentration />
              </div>

              <SpellsKnown />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(state => ({ sheet: state.sheet }))(SpellBook)
);
