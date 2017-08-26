import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import PageHero from '../shared/PageHero';
import Contributors from './Contributors';

const About = ({ contributors }) => (
  <div>
    <Helmet title="About" />
    <PageHero bgColorClass="bg-accent--dark" bgUrl="/img/dashboard.jpg" title="About" full />
    <div className="container">
      <div className="flex-column bg-white padding-big border-round margin-vertical-small page-hero__offset">
        <h2>Background</h2>
        <p>devGaido is developed by the Chingu Cohorts. A global collaboration
          platform and coding-cohort generator. We connect motivated learners
          with shared goals to learn, help and build together.</p>
        <p>Over time we have noticed although there’s a large amount of learning
          resources available on the Internet, but it’s difficult for those new
          to web development, and especially the Javascript ecosystem, to
          determine both what subjects to learn and their order. On the other
          side of the spectrum experienced web developers know what topics they
          need to learn to fill knowledge gaps, but sometimes have difficulty
          finding the right learning resources.</p>
        <p>devGaido was created to address both of these needs by organizing
          learning material found on the Internet into learning Paths and Courses
          designed to help new web dens achieve larger scope goals like becoming
          a front end developer as well as experienced web devs acquire specific
          knowledge to fill a gap.</p>
      </div>
    </div>
    <div className="container">
      <div className="flex-column bg-white padding-big border-round margin-vertical-small">
        <h2>Contributors</h2>
        <Contributors contributors={contributors} />
      </div>
    </div>
  </div>
);

About.propTypes = {
  contributors: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default connect(store => ({
  contributors: store.contributors,
}))(About);
