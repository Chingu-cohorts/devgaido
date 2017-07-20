import React from 'react';
import Helmet from 'react-helmet';

import { InfoCard } from '../shared/Cards';

import PageHero from '../shared/PageHero';
import PageDivider from '../shared/PageDivider';

const Contact = () => (
  <div>
    <Helmet title="Contact" />
    <PageHero bgColorClass="bg-secondary" bgImageClass="bg-img__dashboard" title="Contact" />
    <PageDivider />
    <div className="container margin-vertical-big">
      <InfoCard item={{ name: 'How to Contact Us' }} bgColorClass="bg-primary">
        <p>Our goal is to continue enhancing devGaido so it evolves with the
          needs of our users and to the ever changing Web Development universe.
          To report a bug, to ask a question, or to request a new feature please
          open an issue on our
          <a href="https://github.com/Chingu-cohorts/devgaido/issues" target="_blank" rel="noopener noreferrer"> GitHub </a>
          site. For information about how to open an issue refer to our
          <a href="https://github.com/Chingu-cohorts/devgaido/wiki/How-to-Report-an-Issue" target="_blank" rel="noopener noreferrer"> Wiki</a> for guidelines.</p>
      </InfoCard>
    </div>
  </div>
);


export default Contact;
