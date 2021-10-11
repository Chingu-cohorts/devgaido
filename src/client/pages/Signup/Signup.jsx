import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import PageHero from '../shared/PageHero';
import Auth0LockWidget from '../shared/Auth0LockWidget';

const handleStartNowClick = (e, auth0) => {
  e.preventDefault();
  const lock = Auth0LockWidget(auth0);
  lock.show({ initialScreen: 'signUp' });
};

const Signup = ({ auth0 }) => (
  <div>
    <Helmet title="Sign up" />
    <PageHero
      bgColorClass="bg-accent"
      bgImageClass="bg-img__dashboard"
      title="Sign up"
      full
    />
    <div className="container flex-column bg-white padding-big border-round margin-vertical-small page-hero__offset items-center">
      devGaido is developed by the Chingu Cohorts. A global collaboration
      platform and coding-cohort generator. We connect motivated learners with
      shared goals to learn, help and build together.
      <p>
        Over time we've noticed although there’s a large amount of learning
        resources available on the Internet, but it’s difficult for those new to
        web development, and especially the Javascript ecosystem, to determine
        both what subjects to learn and their order. On the other side of the
        spectrum experienced web developers know what topics they need to learn
        to fill knowledge gaps, but sometimes have difficulty finding the right
        learning resources.
      </p>
      <p>
        devGaido was created to address both of these needs by organizing
        learning material found on the Internet into learning Paths and Courses
        designed to help new web dens achieve larger scope goals like becoming a
        front end developer as well as experienced web devs acquire specific
        knowledge to fill a gap.
      </p>
      <h2 className="margin-top-big">Code of Conduct</h2>
      <p>
        Thank you for using devGaido! We hope you find that it is helping you on
        your path to become a better web developer. We operate on the principle
        of keeping our efforts and intentions transparent to our users. With
        this in mind please review the following points.
      </p>
      <p>
        1. Your feedback and contributions to the Comments section on Paths,
        Courses, and Lessons is important to both us and your fellow learners.
      </p>
      <p>
        a. Be professional in your comments and nice to one another. We respect
        and and are tolerant of differences of opinion, but be nice to one
        another. Personal attacks on other users, spamming, marketing, and other
        types of inappropriate behavior can result in your account being
        suspended or terminated.
      </p>
      <p>
        b. Your account name and any comments you post are public. Don’t reveal
        any personal identifying information and report any attempts made to
        solicit this information from you.
      </p>
      <p>
        2. We provide the learning path, but it’s up to you to supply the
        dedication and diligence to increasing your knowledge. The results you
        get with devGaido depend on the amount of work you devote to the process
        of learning.
      </p>
      <p>
        3. devGaido operates on a honor system. We provide learning
        opportunities but rely on you to indicate when you have completed a
        lesson. It’s in your own best interest to be honest when indicating that
        you have completed lessons.
      </p>
      <Link
        className="button button--primary margin-top-big margin-right-small uppercase"
        to="/signup"
        onClick={e => handleStartNowClick(e, auth0)}
      >
        <i />
        Sign Up Now
      </Link>
    </div>
  </div>
);

export default connect(store => ({
  auth0: store.backendData.auth0,
}))(Signup);
