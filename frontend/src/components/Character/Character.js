import './Character.css';

import { selectRace, updateCharacter } from 'actions/characterActions';
import { selectClass, updateLevel } from 'actions/classActions';
import { updateSpellcastingStat } from 'actions/spellcastingActions';
import { Input, Select } from 'antd';
import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Alignment from '../Alignment';

class Character extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classData: [],
      raceData: []
    };
  }

  componentDidMount() {
    this.loadClasses();
    this.loadRaces();
    this.updateTitle();
  }

  componentDidUpdate() {
    this.updateTitle();
  }

  updateTitle() {
    document.title = 'Krakensheet - ' + this.props.character.name;
  }

  render() {
    const myClass = this.props.character.classes[0];
    const sizes = ['Small', 'Medium', 'Large'];

    return (
      <div className="Character Section">
        <p className="SectionTitle">Character Info</p>
        <div className="InfoHolder">
          <div className="BasicInfo">
            <Input
              className="Fixed"
              addonBefore="Name"
              placeholder="Enter your name"
              value={this.props.character.name}
              onChange={e => this.updateName(e.target.value)}
            />

            <Alignment />
            <Select
              showSearch
              className="Fixed"
              defaultValue={
                this.props.character.race
                  ? this.props.character.race.name
                  : undefined
              }
              placeholder="Select Race"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              onChange={value => this.selectRace(this.state.raceData[value])}
              addonBefore="Class">
              {this.state.raceData.map((thisRace, idx) => {
                return (
                  <Select.Option key={idx} value={idx}>
                    {thisRace.name}
                  </Select.Option>
                );
              })}
            </Select>
            <Select
              showSearch
              className="Fixed"
              defaultValue={
                this.props.character.size
                  ? this.props.character.size
                  : undefined
              }
              placeholder="Select Size"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              onChange={value => this.setSize(sizes[value])}
              addonBefore="Class">
              {sizes.map((thisSize, idx) => {
                return (
                  <Select.Option key={idx} value={idx}>
                    {thisSize}
                  </Select.Option>
                );
              })}
            </Select>
          </div>
          <div className="BasicInfo">
            <Select
              showSearch
              className="Fixed"
              defaultValue={
                myClass.classDef ? myClass.classDef.name : undefined
              }
              placeholder="Select Class"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              onChange={value => this.selectClass(this.state.classData[value])}
              addonBefore="Class">
              {this.state.classData.map((thisClass, idx) => {
                return (
                  <Select.Option key={idx} value={idx}>
                    {thisClass.name}
                  </Select.Option>
                );
              })}
            </Select>
            <Input
              addonBefore="Level"
              placeholder="Class level"
              value={myClass.level}
              onChange={e => this.updateLevel(e.target.value)}
            />
            <Input
              className="BaseAttack"
              addonBefore="BAB"
              placeholder="Select a class"
              value={
                myClass.classDef
                  ? formatBAB(
                      myClass.classDef.progression[myClass.level]
                        .base_attack_bonus
                    )
                  : ''
              }
              disabled
            />
            <Select
              placeholder="Spells"
              defaultValue={this.props.character.spellcasting.stat}
              value={this.props.character.spellcasting.stat}
              onChange={value => this.updateSpellStat(value)}>
              {Object.keys(this.props.character.stats).map(stat => (
                <Select.Option value={stat}>{stat}</Select.Option>
              ))}
            </Select>
          </div>
        </div>

        {!this.props.noText && (
          <div className="TextBlocks">
            <Input.TextArea
              rows={4}
              value={this.props.character.bio}
              placeholder="Character Biography"
              onChange={e => this.updateBio(e.target.value)}
            />
            <Input.TextArea
              rows={4}
              value={this.props.character.notes}
              placeholder="Notes"
              onChange={e => this.updateNotes(e.target.value)}
            />
          </div>
        )}
      </div>
    );
  }

  updateSpellStat(stat) {
    const { dispatch } = this.props;

    dispatch(updateSpellcastingStat(stat));
  }

  updateName(name) {
    const { dispatch } = this.props;

    dispatch(updateCharacter('name', name));
  }

  updateBio(bio) {
    const { dispatch } = this.props;

    dispatch(updateCharacter('bio', bio));
  }

  updateNotes(notes) {
    const { dispatch } = this.props;

    dispatch(updateCharacter('notes', notes));
  }

  updateLevel(level) {
    const { dispatch } = this.props;
    level = parseInt(level);
    if (isNaN(level)) {
      level = 1;
    } else if (level > 20) {
      level = 20;
    }

    dispatch(updateLevel(level));
  }

  loadClasses = async () => {
    try {
      const results = await axios.get('/api/class/', { withCredentials: true });

      this.setState({
        classData: results.data
      });
    } catch (e) {
      console.error(e);
    }
  };

  loadRaces = async () => {
    try {
      const results = await axios.get('/api/race/', { withCredentials: true });

      this.setState({
        raceData: results.data
      });
    } catch (e) {
      console.error(e);
    }
  };

  selectClass = classData => {
    const { dispatch } = this.props;

    dispatch(selectClass(classData));
  };

  selectRace = raceData => {
    const { dispatch } = this.props;

    dispatch(selectRace(raceData));
  };

  setSize = size => {
    const {dispatch} = this.props;

    dispatch(updateCharacter('size', size));
  };
}

const formatBAB = bab => {
  return bab
    .split('/')
    .map(b => '+' + b)
    .join('/');
};

export default connect(state => ({ character: state.sheet.character }))(
  Character
);
