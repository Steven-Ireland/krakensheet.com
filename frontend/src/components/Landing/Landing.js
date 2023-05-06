import './Landing.scss';

import { Button } from 'antd';
import MiniBrowser from 'components/MiniBrowser/MiniBrowser';
import React from 'react';

const Landing = () => {
  return (
    <div className="Landing">
      <div className="Jumbo">
        <div>
          <div className="AutoMargin">
            <h1>The Character Sheet for the Digital Era</h1>
          </div>
        </div>
        <div>
          <div className="AutoMargin">
            <MiniBrowser imageUrl="/heroscreenshot.png" />
          </div>
        </div>
      </div>

      <section>
        <div>
          <h2>Built for PF1e</h2>
          <p>
            Krakensheet is built to make managing your PF1e characters a breeze.
            Feats, classes, races, and traits are all built right in.
          </p>
        </div>
        <div className="dots">
          <img src="/test5.png" />
        </div>
      </section>

      <section>
        <div>
          <h2>Auto calculation where you want it</h2>
          <p>
            Krakensheet manages your stats, skills, saves, attacks, and more;
            letting you slay monsters without sweating the details
          </p>
        </div>
        <div className="dots">
          <img src="/test1.png" />
        </div>
      </section>

      <section>
        <div>
          <h2>Customization where you need it</h2>
          <p>
            Krakensheet doesn't do everything - but it gives you the power to do
            it yourself. No build is off limits.
          </p>
        </div>
        <div className="dots">
          <img src="/test4.png" />
        </div>
      </section>

      <section>
        <div>
          <h2>Getting better every day</h2>
          <p>
            Krakensheet is constantly updated with new features and content; and
            it's driven by you. We have big plans, and we hope you'll join us on
            this adventure.
          </p>
        </div>
        <div className="dots">
          <img src="/test6.png" />
        </div>
      </section>

      <section>
        <div>
          <h2>Here's what we support:</h2>
          <ul>
            <li>Class info</li>
            <li>Stats</li>
            <li>Skills</li>
            <li>Attacks</li>
            <li>Armor Class</li>
            <li>CMD & CMB</li>
            <li>Saves</li>
            <li>Feats</li>
            <li>Traits</li>
            <li>Race info</li>
            <li>Health</li>
            <li>Initiative</li>
            <li>Speed</li>
            <li>Auto-saving</li>
            <li>Buffs</li>
            <li>Alignment</li>
            <li>Notes</li>
            <li>Character Bio</li>
          </ul>
        </div>

        <div className="TryIt">
          <div>
            <h2>Try it now!</h2>
            <p>Welcome to the digital age of tabletop gaming!</p>
            <p>
              Give the demo a try to see if Krakensheet is the best fit for your
              adventuring needs. If you like it, you can sign up afterwards and
              keep all the work you've done on the demo.
            </p>
            <Button size="large" block type="primary" href="/demo">
              Try the Demo!
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
