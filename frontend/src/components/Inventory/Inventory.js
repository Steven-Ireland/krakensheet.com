import './Inventory.scss';

import React, { useReducer } from 'react';
import { loadSheet } from 'actions/sheetActions';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateCharacter } from 'actions/characterActions';
import InventoryContent from './InventoryContent';


class Inventory extends React.Component {
  async componentDidMount() {
    const { dispatch } = this.props;
    const { sheetId } = this.props.match.params;

    // Don't re-load sheet on page switch
    if (!this.props.sheet._id && !this.props.demo) {
      const sheet = await axios.get(`/api/sheet/load/${sheetId}`);
      dispatch(loadSheet(sheet.data));
    }
  }

  render() {

    if (!this.props.sheet.character) {
      return <div />;
    }

    if (!this.props.sheet.character.inventory) {
      this.props.dispatch(updateCharacter('inventory', {sections: []}));
      return <div/>
    }

    return (
      <InventoryContent />
    )
  }
}

export default withRouter(
  connect(state => ({ sheet: state.sheet }))(Inventory)
);
