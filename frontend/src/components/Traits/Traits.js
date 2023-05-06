import './Traits.css';

import React, { Component } from 'react';

import DSList from '../DSList';

class Traits extends Component {
  render() {
    return (
      <div className="Traits Section">
        <DSList
          api="/api/trait/search/"
          title="Traits"
          singular="Trait"
          characterProperty="traits"
        />
      </div>
    );
  }
}

export default Traits;
