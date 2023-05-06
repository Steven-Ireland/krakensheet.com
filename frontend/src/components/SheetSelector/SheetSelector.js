import './SheetSelector.scss';

import { Button, Empty, List } from 'antd';
import axios from 'axios';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class SheetSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetched: false,
      data: []
    };
  }

  componentDidMount() {
    this.loadSheets();
  }

  render() {
    return (
      <div className="SheetSelector Section">
        <p className="SectionTitle">Select Character</p>

        {this.state.fetched && this.state.data.length === 0 && (
          <Empty description="No Sheets" />
        )}

        <List size="large" className="SheetSelectorList">
          {this.state.data.map(sheet => {
            return (
              <List.Item
                className="SheetSelectorResult"
                key={sheet._id}
                onClick={() =>
                  this.props.history.push(`/app/character/${sheet._id}`)
                }>
                {sheet.character.name}
              </List.Item>
            );
          })}
        </List>
        <div className="NewSheetButtonHolder">
          <Button type="primary" onClick={this.createSheet}>
            Create New
          </Button>
        </div>
      </div>
    );
  }

  loadSheets = async () => {
    try {
      const results = await axios.get('/api/sheet', { withCredentials: true });

      this.setState({
        data: results.data,
        fetched: true
      });
    } catch (e) {
      console.error(e);
    }
  };

  createSheet = async () => {
    const results = await axios.get('/api/sheet/new', {
      withCredentials: true
    });
    this.props.history.push(`/app/character/${results.data._id}`);
  };
}

export default withRouter(SheetSelector);
