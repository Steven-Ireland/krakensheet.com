import './Footer.scss';

import { Popover } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const ComingSoon = ({ children }) => {
  return (
    <Popover content="Coming Soon!" placement="right">
      {children}
    </Popover>
  );
};

const Footer = () => {
  return (
    <div className="Footer">
      <div className="Footer-container">
        <section>
          <h1>Krakensheet</h1>
          <p>Shipwreck Software © 2020</p>
          <p>Made with ♥</p>
        </section>
        <section>
          <h2>About</h2>
          <ul>
            <li>
              <HashLink to="/about#WhoWeAre">Who we are</HashLink>
            </li>
            <li>
              <HashLink to="/about#WhyWeBuiltThis">Why we built this</HashLink>
            </li>
          </ul>
        </section>
        <section>
          <h2>Licensing</h2>
          <ul>
            <li>
              <Link to="/license">Open Game License</Link>
            </li>
          </ul>
        </section>
        <section>
          <h2>Pricing</h2>
          <ul>
            <li>
              <Link to="gitlab.com/krakensheet">It's free software :)</Link>
            </li>
          </ul>
        </section>
        <section>
          <h2>Contact Us</h2>
          <ul>
            <li>
              <a href="mailto:contact@krakensheet.com">
                contact@krakensheet.com
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Footer;
