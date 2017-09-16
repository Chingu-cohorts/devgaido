import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import LazyLoad from 'react-lazyload';

import AnimateVisibleChildrenDiv from '../shared/AnimateVisibleChildrenDiv';
import Redirect from '../shared/Redirect';

const LoadingPlaceholder = () => (
  <div className="loading__placeholder home-img__loading-spinner loading-spinner border-round" />
);

const Home = () => (
  <div>
    <Helmet title="Home" />
    <div className="home-hero flex items-center justify-center bg-cover relative" style={{ backgroundImage: "url('/img/compass.jpg')" }}>
      <div className="flex items-center justify-center bg-primary-25 width-100 height-100">
        <AnimateVisibleChildrenDiv speed={0.7} stagger={0.1} className="flex flex-wrap width-60 width-70-d1 width-90-t">
          <h1 className="h2-d1 h3-t c-white width-100 wider">LEARN WEB DEVELOPMENT</h1>
          <h1 className="h2-d1 h3-t c-white wider margin-bottom-big width-100">THE DEVGAIDO WAY</h1>
          <p className="c-white h4 h5-d1">Whether you&#039;re just starting out or want to brush up a certain skill:</p>
          <p className="c-white h4 h5-d1"><span className="c-accent bold">devGaido</span> provides easy to follow learning paths that help you reach your goal without the hassle.</p>
          <p className="c-white h4 h5-d1">Never worry about learning the wrong stuff from subpar resources ever again!</p>
          <div className="margin-top-small width-100">
            <Link className="button button--primary margin-right-small uppercase" to="/signup">
              <div className="flex items-center">
                <i className="fa icon-sign-in margin-right-tiny" />
                Sign Up Now
              </div>
            </Link>
            <Link className="button button--white-clear uppercase bg-black-50" to="/library">
              <div className="flex items-center">
                <i className="fa icon-search margin-right-tiny" />
                Explore Library
              </div>
            </Link>
          </div>
        </AnimateVisibleChildrenDiv>
      </div>
    </div>
    <AnimateVisibleChildrenDiv speed={0.7} stagger={0.2} alternate className="container">
      <section className="flex margin-top-huge">
        <LazyLoad height={350} once placeholder={<LoadingPlaceholder />}>
          <img className="border-round" src="/img/discover.jpg" alt="" />
        </LazyLoad>
        <div className="flex-1 margin-left-small margin-top-small">
          <h1 className="c-accent wider">Discover</h1>
          <p className="width-50">Whether you are a new Web Developer seeking to gain broader skills or an experienced developer who wants to fill a specific gap - let devGaido help you discover what you need to know.</p>
        </div>
      </section>
      <section className="flex margin-top-huge">
        <div className="flex-1 margin-right-small margin-top-small right">
          <h1 className="c-primary wider right">Learn</h1>
          <p className="width-50 margin-left-auto">Follow a learning path that is geared to what you want and need to know to become a better Web Developer. We&#039;ve done the work of plotting a course to your goals so you can focus on learning.</p>
        </div>
        <LazyLoad height={350} once placeholder={<LoadingPlaceholder />}>
          <img className="border-round" src="/img/learn.jpg" alt="" />
        </LazyLoad>
      </section>
      <section className="flex margin-top-huge">
        <LazyLoad height={350} once placeholder={<LoadingPlaceholder />}>
          <img className="border-round" src="/img/practise.jpg" alt="" />
        </LazyLoad>
        <div className="flex-1 margin-left-small margin-top-small">
          <h1 className="c-accent wider">Practice</h1>
          <p className="width-50">Practice makes perfect! devGaido&#039;s learning paths include strategically placed exercises and quizzes so you can reinforce your newfound knowledge and understanding.</p>
        </div>
      </section>
      <section className="flex margin-top-huge margin-bottom-huge">
        <div className="flex-1 margin-right-small margin-top-small right">
          <h1 className="c-primary wider right">Build</h1>
          <p className="width-50 margin-left-auto">Challenges and projects are included to help you achieve a deep and comprehensive understanding of how to use the languages, libraries, tools, and techniques necessary to be a Web Developer.</p>
        </div>
        <LazyLoad height={350} once placeholder={<LoadingPlaceholder />}>
          <img className="border-round" src="/img/build.jpg" alt="" />
        </LazyLoad>
      </section>
    </AnimateVisibleChildrenDiv>
  </div>
);

export default Redirect(Home, true, '/dashboard');
