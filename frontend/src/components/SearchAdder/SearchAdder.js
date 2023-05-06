import './SearchAdder.scss';

import { Input, List, Modal } from 'antd';
import debounce from 'debounce';
import React, { Component } from 'react';

export default class SearchAdder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      fetching: false,
      value: ''
    };

    this.fetchData = debounce(this.fetchData, 75);
  }

  render() {
    return (
      <Modal
        className="BigOmniModal"
        title={
          <Input
            ref={input => input && input.focus()}
            placeholder={this.props.placeholder}
            size="large"
            onChange={this.handleChange}
            value={this.state.value}
          />
        }
        visible={this.props.visible}
        closable={false}
        onCancel={this.props.done}
        onOk={this.props.done}>
        <List size="large">
          {this.state.data.map((item, idx) => {
            return (
              <List.Item
                className="SearchAdderResult"
                key={idx}
                onClick={() => this.handleSelect(item)}>
                {item[this.props.showAttr]}
              </List.Item>
            );
          })}
        </List>
      </Modal>
    );
  }

  handleChange = event => {
    const value = event.target.value;
    this.setState({
      value
    });

    this.fetchData(value);
  };

  handleSelect = item => {
    this.setState({
      value: ''
    });

    this.props.onSelect(item);
  };

  fetchData = async value => {
    if (value.length < 1) {
      this.setState({
        data: [],
        fetching: false
      });

      return;
    }

    try {
      this.setState({
        fetching: true
      });
      const response = await fetch(this.props.searchUrl + value);
      const json = await response.json();

      this.setState({
        data: json,
        fetching: false
      });
    } catch (e) {
      console.error(e);
    }
  };
}
