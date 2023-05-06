import './CenteredPlaceholder.scss';

import { Icon as LegacyIcon } from '@ant-design/compatible';
import React from 'react';

const CenteredPlaceholder = ({ type, children }) => {
  return (
    <div className="CenteredPlaceholder">
      <div className="CenteredPlaceholder-container">
        <LegacyIcon type={type} />
        <p>{children}</p>
      </div>
    </div>
  );
};

export default CenteredPlaceholder;
