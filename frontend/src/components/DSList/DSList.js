import './DSList.scss';

import {
  removeFromCharacter,
  reorderCharacterProperty
} from 'actions/characterActions';
import { DeleteOutlined } from '@ant-design/icons';
import { Empty, Popover } from 'antd';
import classNames from 'classnames';
import AuxButtons from 'components/AuxButtons';
import SearchAdder from 'components/SearchAdder';
import React, { Component } from 'react';
import { connect } from 'react-redux';

const DSInfoMenu = ({ title }) => (
  <div className="InfoMenu">
    <p>{title}, once selected, can be clicked to show additional information</p>
  </div>
);

class DSList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSelector: false,
      removeMode: false,
      dragMode: false,
      draggedOverIndex: null
    };
  }

  render() {
    const { characterProperty } = this.props;
    const propertyList = this.props.character[characterProperty];

    return <>
      <p className="SectionTitle">{this.props.title}</p>

      {propertyList.length === 0 && (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={'No ' + this.props.title.toLowerCase()}
        />
      )}

      <table className="DSList">
        <thead>
          <tr>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {propertyList.map((property, idx) => {
            return (
              <tr
                key={property.name}
                className={classNames('Property', {
                  'Property--draggedOver':
                    this.state.dragMode && this.state.draggedOverIndex === idx
                })}
                onClick={e => this.handleClick(e, idx)}
                onDragOver={e => this.onDragOver(e, idx)}
                onDragStart={e => this.onDragStart(e, idx)}
                onDragEnd={e => this.onDragEnd(idx)}
                draggable={this.state.dragMode}>
                {this.state.removeMode && (
                  <td
                    className="Interactable"
                    onClick={() => this.removeProperty(idx)}>
                    <DeleteOutlined />
                  </td>
                )}
                <Popover
                  title={
                    <a
                      href={property.href}
                      target="_blank"
                      rel="noopener noreferrer">
                      {property.name}
                    </a>
                  }
                  placement="right"
                  content={formatProperty(property)}
                  trigger="click">
                  <td className="Title Left">{property.name}</td>
                </Popover>
              </tr>
            );
          })}
        </tbody>
      </table>

      <SearchAdder
        showAttr="name"
        searchUrl={this.props.api}
        visible={this.state.showSelector}
        done={this.closeSelector}
        onSelect={this.selectProperty}
        placeholder={'Enter a ' + this.props.singular.toLowerCase()}
      />

      <AuxButtons
        showPlus
        onPlus={this.openSelector}
        showMinus
        onMinus={this.toggleRemoveMode}
        minusActive={this.state.removeMode}
        infoMenu={<DSInfoMenu title={this.props.title} />}
        infoMenuTitle={this.props.singular + ' information'}
        showSwap
        onSwap={this.toggleDragMode}
        swapActive={this.state.dragMode}
      />
    </>;
  }

  handleClick = (e, idx) => {
    if (this.state.dragMode) {
      e.preventDefault();
    }
  };

  selectProperty = property => {
    const { dispatch } = this.props;

    dispatch({
      type: 'ADD_TO_CHARACTER',
      insertInto: this.props.characterProperty,
      value: property
    });
    this.closeSelector();
  };

  openSelector = () => {
    this.setState({
      showSelector: true
    });
  };

  closeSelector = () => {
    this.setState({
      showSelector: false
    });
  };

  toggleRemoveMode = () => {
    this.setState({
      removeMode: !this.state.removeMode,
      dragMode: false
    });
  };

  toggleDragMode = () => {
    this.setState({
      dragMode: !this.state.dragMode,
      removeMode: false
    });
  };

  removeProperty = idx => {
    const { dispatch } = this.props;

    dispatch(removeFromCharacter(this.props.characterProperty, idx));
  };

  onDragStart = (e, idx) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target);
    e.dataTransfer.setDragImage(e.target, 80, 0);
  };

  onDragOver = (e, idx) => {
    e.preventDefault();
    this.setState({
      draggedOverIndex: idx
    });
    e.dataTransfer.dropEffect = 'move';
  };

  onDragEnd = idx => {
    const { dispatch } = this.props;
    dispatch(
      reorderCharacterProperty(
        this.props.characterProperty,
        idx,
        this.state.draggedOverIndex
      )
    );

    this.setState({
      draggedOverIndex: null
    });
  };
}

const formatProperty = property => {
  const { name, href, copyright, ...details } = property;

  return (
    <div className="PopoverContent">
      {Object.keys(details)
        .filter(detail => details[detail].length > 0 && !detail.startsWith('_'))
        .map(detail => {
          return (
            <div key={detail}>
              <p>
                <span className="Detail">{detail}: </span>
                {details[detail]}
              </p>
            </div>
          );
        })}
      <p className="Copyright">
        <span className="Detail">Copyright: </span>
        {copyright}
      </p>
    </div>
  );
};

export default connect(state => ({
  character: state.sheet.character
}))(DSList);
