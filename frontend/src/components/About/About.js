import './About.scss';

import React from 'react';

const About = () => {
  return (
    <div className="About">
      <div className="About-container">
        <section>
          <h1 id="WhoWeAre">Who We Are</h1>
          <p>
            <b>
              Our mission is to bring tabletop gaming into the 21st century.
            </b>{' '}
            Founded by Steven Ireland (a software engineer and 9th level brawler
            raiding the high seas), we've dedicated thousands of hours into
            making Krakensheet fulfill this dream. Your character sheet should
            have everything you need to immerse yourself in the game. When your
            DM asks: <em>"What's your flat footed AC?"</em>, your answer should
            only be a glance away.
          </p>
          <p>
            <b>
              Our team is laser focused on usability without compromising good
              design.
            </b>{' '}
            We believe that your character sheet should <em>look good</em> while
            still giving you the information you need. We strive to make the
            look and feel of Krakensheet unrivaled by other character building
            software — you should never want to touch a pen and paper again.
          </p>
        </section>
        <section>
          <h1 id="WhyWeBuiltThis">Why We Built Krakensheet</h1>
          <p>
            We've tried every automatic character sheet out there: excel
            spreadsheets, google docs, fillable PDFs, online forms, premium
            offerings; you name it. We had the same problem with each of them:{' '}
            <b>other products were hard to learn, and annoying to use.</b> With
            our expertise in software, we knew we could do better.
          </p>
          <p>
            We wanted to build a character sheet that didn't stop at usability —
            when you open your character sheet on game night,{' '}
            <b>your whole party should be impressed.</b> Krakensheet is the
            character sheet of the 21st century: auto-saving, auto-calculating,
            and an absolute joy to use.
          </p>
          <p></p>
        </section>
      </div>
    </div>
  );
};

export default About;
