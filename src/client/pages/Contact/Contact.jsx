import React from 'react';
import Helmet from 'react-helmet';

import PageHero from '../shared/PageHero';

const Contact = () => (
  <div>
    <Helmet title="Contact" />
    <PageHero bgColorClass="bg-secondary" bgImageClass="bg-img__dashboard" title="Contact" full />
    <div className="container flex-column bg-white padding-big border-round margin-vertical-small page-hero__offset">
      <h2>How To Contact Us</h2>
      <p>
        Our goal is to continue enhancing devGaido so it evolves with the
        needs of our users and to the ever changing Web Development universe.
      </p>
      <p className="margin-top-big">
        To report a bug, to ask a question, or to request a new feature please
        open an issue on our
        <a href="https://github.com/Chingu-cohorts/devgaido/issues" target="_blank" rel="noopener noreferrer"> GitHub </a>
        site.
      </p>
      <p>For information about how to open an issue refer to our
        <a href="https://github.com/Chingu-cohorts/devgaido/wiki/How-to-Report-an-Issue" target="_blank" rel="noopener noreferrer"> Wiki</a> for guidelines.
      </p>
      <p className="margin-top-big">
        Additionally, feel free to check out our social media and help spread the word by giving us a star, following us and / or subscribing to us:
      </p>
      <div className="flex h0 justify-center margin-top-big">
        <a href="https://github.com/Chingu-cohorts/devgaido" target="_blank" rel="noopener noreferrer" className="uppercase margin-right-small"><i className="fa icon-github" /></a>
        <a href="https://twitter.com/devgaido" target="_blank" rel="noopener noreferrer" className="uppercase margin-right-small"><i className="fa icon-twitter" /></a>
        <a href="https://www.youtube.com/channel/UC3goUqdIGkmFYzi9mC9bSYQ" target="_blank" rel="noopener noreferrer" className="uppercase margin-right-small"><i className="fa icon-youtube" /></a>
      </div>
    </div>
  </div>
);


export default Contact;
